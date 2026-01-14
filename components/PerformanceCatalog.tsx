
import React from 'react';
import { Project } from '../types';

interface PerformanceCatalogProps {
  projects: Project[];
}

export const PerformanceCatalog: React.FC<PerformanceCatalogProps> = ({ projects }) => {
  // Triplicamos a lista para garantir que o carrossel cubra telas grandes sem "buracos" durante a animação
  // e criar o efeito de loop infinito perfeito.
  const carouselProjects = [...projects, ...projects, ...projects];

  return (
    <div className="py-10 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#D31E24]"></div>
              <span className="text-[#D31E24] font-orbitron font-bold tracking-[0.4em] text-[10px] uppercase">Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-orbitron font-black text-white uppercase leading-none">
              NOVOS <span className="text-gradient">PROJETOS</span>
            </h2>
          </div>
          <button className="group border-b border-zinc-800 hover:border-[#D31E24] text-zinc-400 hover:text-white font-orbitron font-bold text-[10px] uppercase tracking-[0.3em] pb-2 transition-all flex items-center gap-4">
            VER TODOS OS PROJETOS
            <i className="fa-solid fa-arrow-right-long group-hover:translate-x-2 transition-transform"></i>
          </button>
        </div>
      </div>

      {/* Container do Carrossel */}
      <div className="relative w-full border-y border-zinc-900 bg-zinc-900/10">
        {/* Sombras laterais para suavizar a entrada/saída */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none"></div>

        {/* Faixa de rolagem animada */}
        <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused]">
          {carouselProjects.map((proj, index) => (
            <div 
              key={`${proj.id}-${index}`} 
              className="relative w-[300px] md:w-[400px] aspect-[3/4] group overflow-hidden border-r border-zinc-900 bg-black"
            >
              <img 
                src={proj.img} 
                alt={proj.title} 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110 ease-out" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="absolute top-6 right-6 z-20">
                 <span className="bg-[#D31E24] text-white text-[9px] font-black font-orbitron px-3 py-1.5 tracking-widest uppercase shadow-lg shadow-red-900/20">
                   {proj.type}
                 </span>
              </div>

              <div className="absolute bottom-0 left-0 p-8 w-full z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h4 className="text-2xl font-orbitron font-black text-white mb-2 uppercase tracking-tighter drop-shadow-lg">
                  {proj.title}
                </h4>
                <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-500">
                  Engenharia de Precisão AK
                </p>
                <div className="mt-4 h-0.5 w-0 bg-[#D31E24] group-hover:w-16 transition-all duration-500 delay-100"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); } /* Move 1/3 do total (já que triplicamos a lista) */
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite; /* 40s para um movimento lento e majestoso */
        }
      `}</style>
    </div>
  );
};
