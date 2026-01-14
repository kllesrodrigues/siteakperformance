
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandCloud } from './components/BrandCloud';
import { PowerSimulator } from './components/PowerSimulator';
import { ServicesGrid } from './components/ServicesGrid';
import { PerformanceCatalog } from './components/PerformanceCatalog';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { NotificationToast } from './components/NotificationToast';
import { SpecializationSection } from './components/SpecializationSection';
import { ShopModal } from './components/ShopModal';
import { INITIAL_UNITS, INITIAL_PROJECTS, VEHICLES as INITIAL_VEHICLES, INITIAL_PRODUCTS } from './constants';
import { MapUnit, Project, Vehicle, Product } from './types';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSimOpen, setIsSimOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  
  /** 
   * SCRIPT INTELIGENTE INTERNO: 
   * Gerencia a persistência de dados localmente.
   */
  const [units, setUnits] = useState<MapUnit[]>(() => {
    try {
      const saved = localStorage.getItem('ak_performance_units');
      return saved ? JSON.parse(saved) : INITIAL_UNITS;
    } catch (e) {
      return INITIAL_UNITS;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('ak_performance_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch (e) {
      return INITIAL_PROJECTS;
    }
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    try {
      const saved = localStorage.getItem('ak_performance_vehicles');
      return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
    } catch (e) {
      return INITIAL_VEHICLES;
    }
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ak_performance_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sincroniza dados com o armazenamento local
  useEffect(() => {
    localStorage.setItem('ak_performance_units', JSON.stringify(units));
  }, [units]);

  useEffect(() => {
    localStorage.setItem('ak_performance_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('ak_performance_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('ak_performance_products', JSON.stringify(products));
  }, [products]);

  const handleAddUnit = (newUnit: MapUnit) => {
    setUnits(prev => {
      if (prev.find(u => u.city.toLowerCase() === newUnit.city.toLowerCase())) {
        return prev;
      }
      return [...prev, newUnit];
    });
  };

  const handleRemoveUnit = (city: string) => {
    if (city === 'Vilhena') return;
    setUnits(prev => prev.filter(u => u.city !== city));
  };

  const handleAddProject = (newProject: Project) => {
    setProjects(prev => [newProject, ...prev]);
  };

  const handleAddVehicle = (newVehicle: Vehicle) => {
    setVehicles(prev => [...prev, newVehicle]);
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [...prev, newProduct]);
  };

  return (
    <div className="min-h-screen bg-[#09090b] overflow-x-hidden selection:bg-[#D31E24] selection:text-white">
      <Navbar 
        scrolled={scrolled} 
        onAddUnit={handleAddUnit} 
        units={units} 
        onRemoveUnit={handleRemoveUnit}
        onAddProject={handleAddProject}
        onAddVehicle={handleAddVehicle}
        onAddProduct={handleAddProduct}
        onOpenSimulator={() => setIsSimOpen(true)}
        onOpenShop={() => setIsShopOpen(true)}
      />
      
      <main>
        <section id="home">
          <Hero onOpenSimulator={() => setIsSimOpen(true)} />
        </section>
        
        <section id="marcas" className="py-24 border-y border-zinc-900 carbon-bg">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-4 mb-16 justify-center">
              <div className="h-px w-8 bg-zinc-800"></div>
              <h2 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.5em]">
                Marcas autorizadas e credenciadas
              </h2>
              <div className="h-px w-8 bg-zinc-800"></div>
            </div>
            <BrandCloud />
          </div>
        </section>

        {/* Seção Especialização Hilux/Amarok Substituindo o Simulador Fixo */}
        <section id="especializacao" className="py-32 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#D31E24]/5 blur-[160px] rounded-full pointer-events-none -z-10"></div>
          <SpecializationSection />
        </section>

        <section id="servicos" className="py-32 bg-zinc-950 border-y border-zinc-900">
          <ServicesGrid units={units} />
        </section>

        <section id="catalogo" className="py-32">
          <PerformanceCatalog projects={projects} />
        </section>

        <section className="pt-24 pb-0 relative overflow-hidden bg-zinc-950">
          <div className="container mx-auto px-6 text-center relative z-10 mb-20">
            <h2 className="text-4xl md:text-6xl font-orbitron font-black text-white mb-8 uppercase tracking-tighter">
              PRONTO PARA <span className="text-[#D31E24]">ELEVAR O NÍVEL?</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto mb-12 text-lg font-light text-center">
              Nossa equipe de engenheiros está pronta para transformar seu veículo. 
              Traga sua máquina para quem entende de performance real e descubra do que seu motor é realmente capaz.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-4">
              <a href="https://wa.me/5569993975787" target="_blank" className="bg-[#D31E24] hover:bg-white hover:text-black text-white px-12 py-5 font-orbitron font-black text-xs tracking-widest transition-all duration-500 shadow-2xl shadow-[#D31E24]/20 uppercase">
                Falar com Especialista
              </a>
              <div className="flex items-center justify-center gap-4 text-white font-orbitron font-bold text-lg">
                 <i className="fa-solid fa-phone text-[#D31E24]"></i>
                 (69) 99397-5787
              </div>
            </div>
          </div>

          <div className="w-full h-[450px] relative mt-12 border-t border-zinc-900 overflow-hidden group">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/ak-map-screenshot.png" 
                alt="Localização AK Performance" 
                className="w-full h-full object-cover grayscale invert contrast-[1.1] brightness-[0.7]"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000";
                }}
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950 pointer-events-none"></div>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="pointer-events-auto flex flex-col items-center">
                <div className="bg-zinc-950/90 backdrop-blur-md border border-zinc-800 p-6 rounded-sm shadow-2xl max-w-sm text-center">
                  <div className="w-16 h-16 bg-[#D31E24] mx-auto flex items-center justify-center rounded-full mb-4">
                    <i className="fa-solid fa-location-dot text-white text-2xl"></i>
                  </div>
                  <h4 className="text-white font-orbitron font-black text-lg mb-2 uppercase">Sede AK Performance</h4>
                  <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                    Av. Pres. Nasser, 1324 - Jardim das Oliveiras, Vilhena - RO, 76980-632
                  </p>
                  <a 
                    href="https://www.google.com/maps/place/AK+Performance+Centro+Automotivo+-+REMAP/@-12.7272012,-60.1384341,17z/data=!4m6!3m5!1s0x93b96bbe4ea27925:0x412df1e1b9b810af!8m2!3d-12.7272064!4d-60.1358592!16s%2Fg%2F11mt7sj8mh?entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoASAFQAw%3D%3D" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 font-orbitron font-black text-[10px] uppercase hover:bg-[#D31E24] hover:text-white transition-all"
                  >
                    COMO CHEGAR
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* MODAL DO SIMULADOR */}
      {isSimOpen && <PowerSimulator onClose={() => setIsSimOpen(false)} vehicles={vehicles} />}

      {/* MODAL DA LOJA */}
      {isShopOpen && <ShopModal onClose={() => setIsShopOpen(false)} products={products} />}

      <Footer />
      <WhatsAppButton />
      <NotificationToast />
    </div>
  );
};

export default App;
