
import React from 'react';

interface HeroProps {
  onOpenSimulator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSimulator }) => {
  return (
    <div className="relative min-h-screen w-full flex items-center overflow-hidden py-24 md:py-32">
      {/* High-quality background image with professional color grade */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover brightness-[0.4]"
          alt="AK Performance Engine Detail"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000";
          }}
        />
        <div className="absolute inset-0 bg-black/40 hero-gradient"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass-effect border-white/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D31E24] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D31E24]"></span>
            </span>
            <span className="text-zinc-100 font-orbitron font-bold tracking-[0.2em] text-[10px] uppercase">
              Laboratório e Engenharia de Mapa para ECU
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] font-black mb-10 leading-[0.95] md:leading-[0.9] font-orbitron text-gradient uppercase tracking-tighter py-2 block overflow-visible">
            ENGENHARIA<br />
            <span className="text-[#D31E24]">SEM LIMITES</span>
          </h1>
          
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-14 leading-relaxed font-light text-justify">
            Desenvolvemos o potencial oculto do seu veículo através de software proprietário e hardware de alta precisão. 
            <span className="text-white font-medium"> Desempenho profissional para quem não aceita o comum.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 relative z-20">
            <button 
              onClick={onOpenSimulator}
              className="group bg-[#D31E24] hover:bg-[#A3161B] text-white px-10 py-5 rounded-sm font-orbitron font-bold text-sm tracking-widest shadow-2xl shadow-[#D31E24]/20 transition-all flex items-center justify-center gap-3 min-w-[260px]"
            >
              SIMULAR DESEMPENHO
              <i className="fa-solid fa-gauge-high group-hover:rotate-45 transition-transform duration-500"></i>
            </button>
            <a 
              href="https://wa.me/5569993975787" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-transparent hover:bg-white/5 text-white px-10 py-5 rounded-sm font-orbitron font-bold text-sm tracking-widest border border-zinc-700 transition-all flex items-center justify-center gap-3 min-w-[260px]"
            >
              SERVIÇOS ELITE
            </a>
          </div>
        </div>
      </div>

      {/* Trust stats row */}
      <div className="absolute bottom-12 left-0 w-full z-20 hidden lg:block pointer-events-none">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 max-w-3xl gap-12 border-l border-[#D31E24] pl-8">
            <div>
              <span className="block text-4xl font-orbitron font-black text-white">15+</span>
              <span className="text-zinc-500 text-xs font-bold tracking-widest uppercase">Anos de Pista</span>
            </div>
            <div>
              <span className="block text-4xl font-orbitron font-black text-white">100%</span>
              <span className="text-zinc-500 text-xs font-bold tracking-widest uppercase">Garantia Software</span>
            </div>
            <div>
              <span className="block text-4xl font-orbitron font-black text-white">5K+</span>
              <span className="text-zinc-500 text-xs font-bold tracking-widest uppercase">Carros Entregues</span>
            </div>
          </div>
        </div>
      </div>

      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-[40%] h-full pointer-events-none overflow-hidden opacity-20">
         <div className="absolute top-[-10%] right-[-10%] w-full h-full border border-zinc-800 rotate-12 rounded-[100px]"></div>
         <div className="absolute top-[-5%] right-[-5%] w-full h-full border border-zinc-800 rotate-12 rounded-[100px]"></div>
      </div>
    </div>
  );
};
