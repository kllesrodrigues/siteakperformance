
import React, { useState } from 'react';
import { Logo } from './Logo';
import { AdminPanel } from './AdminPanel';
import { MapUnit, Project, Vehicle, Product } from '../types';

interface NavbarProps {
  scrolled: boolean;
  onAddUnit: (unit: MapUnit) => void;
  units: MapUnit[];
  onRemoveUnit: (city: string) => void;
  onAddProject: (project: Project) => void;
  onAddVehicle: (vehicle: Vehicle) => void;
  onAddProduct: (product: Product) => void;
  onOpenSimulator: () => void;
  onOpenShop: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled, onAddUnit, units, onRemoveUnit, onAddProject, onAddVehicle, onAddProduct, onOpenSimulator, onOpenShop }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'glass-effect py-1' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center transition-transform hover:scale-[1.02]">
          <Logo className="h-9 md:h-11" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-[10px] font-orbitron font-bold uppercase tracking-[0.25em]">
          <a href="#home" className="hover:text-[#D31E24] transition-colors relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D31E24] transition-all group-hover:w-full"></span>
          </a>
          <button onClick={onOpenSimulator} className="hover:text-[#D31E24] transition-colors relative group uppercase">
            Simulador
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D31E24] transition-all group-hover:w-full"></span>
          </button>
          <a href="#servicos" className="hover:text-[#D31E24] transition-colors relative group">
            Serviços
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D31E24] transition-all group-hover:w-full"></span>
          </a>
          <a href="#catalogo" className="hover:text-[#D31E24] transition-colors relative group">
            Projetos
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D31E24] transition-all group-hover:w-full"></span>
          </a>
          
          <div className="flex items-center gap-4 ml-4">
            <AdminPanel 
              onAddUnit={onAddUnit} 
              units={units} 
              onRemoveUnit={onRemoveUnit} 
              onAddProject={onAddProject}
              onAddVehicle={onAddVehicle}
              onAddProduct={onAddProduct}
            />
            <button 
              onClick={onOpenShop}
              className="bg-[#D31E24] hover:bg-white hover:text-black text-white px-8 py-3 rounded-sm shadow-xl shadow-[#D31E24]/20 transition-all duration-300 flex items-center gap-2"
            >
              <i className="fa-solid fa-cart-shopping"></i>
              COMPRA ON-LINE
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          <div className="w-6 h-5 flex flex-col justify-between items-end">
             <span className={`h-0.5 bg-white transition-all ${isOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}></span>
             <span className={`h-0.5 bg-[#D31E24] transition-all ${isOpen ? 'opacity-0' : 'w-4'}`}></span>
             <span className={`h-0.5 bg-white transition-all ${isOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 glass-effect transition-all duration-500 z-[-1] flex items-center justify-center ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col items-center space-y-8 text-xl font-orbitron font-black uppercase tracking-widest">
          <a href="#home" onClick={() => setIsOpen(false)} className="hover:text-[#D31E24]">Home</a>
          <button onClick={() => { onOpenSimulator(); setIsOpen(false); }} className="hover:text-[#D31E24] uppercase">Simulador</button>
          <a href="#servicos" onClick={() => setIsOpen(false)} className="hover:text-[#D31E24]">Serviços</a>
          <a href="#catalogo" onClick={() => setIsOpen(false)} className="hover:text-[#D31E24]">Projetos</a>
          
          <div className="pt-8 flex flex-col items-center gap-6">
            <AdminPanel 
              onAddUnit={onAddUnit} 
              units={units} 
              onRemoveUnit={onRemoveUnit} 
              onAddProject={onAddProject}
              onAddVehicle={onAddVehicle}
              onAddProduct={onAddProduct}
            />
            <button onClick={() => { onOpenShop(); setIsOpen(false); }} className="bg-[#D31E24] px-12 py-5 rounded-sm">COMPRA ON-LINE</button>
          </div>
        </div>
      </div>
    </nav>
  );
};
