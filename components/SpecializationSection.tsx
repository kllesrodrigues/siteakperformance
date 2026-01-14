
import React from 'react';

export const SpecializationSection: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-[#D31E24]"></div>
          <span className="text-[#D31E24] font-orbitron font-bold tracking-[0.4em] text-[10px] uppercase">
            Engenharia Diesel
          </span>
          <div className="h-px w-12 bg-[#D31E24]"></div>
        </div>
        <h2 className="text-4xl md:text-6xl font-orbitron font-black text-white uppercase leading-none mb-6">
          AUTORIDADE EM <br className="hidden md:block" />
          <span className="text-gradient">HILUX & AMAROK</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto font-light text-lg">
          Desenvolvemos mapas proprietários testados em dinamômetro e pista para as plataformas diesel mais exigentes do mercado. 
          Potência, torque e confiabilidade extrema.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Card Hilux */}
        <div className="relative group overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950">
          <div className="aspect-[16/10] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1594247942702-8a9ee07936a2?auto=format&fit=crop&q=80&w=1200" 
              alt="Toyota Hilux SRX AK Performance" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-50 group-hover:brightness-100"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
          
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
            <div className="flex items-center gap-4 mb-4">
              <img src="https://cdn.simpleicons.org/toyota/D31E24" className="h-8 w-8" alt="Toyota Logo" />
              <span className="bg-[#D31E24] text-white text-[9px] font-black font-orbitron px-3 py-1 tracking-widest uppercase">
                D-4D MASTER
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-orbitron font-black text-white uppercase mb-2">
              TOYOTA HILUX
            </h3>
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-6">
              Soluções para DPF/EGR & Ganho de Torque
            </p>
            <ul className="space-y-2 text-zinc-300 text-sm font-light mb-6">
              <li className="flex items-center gap-2"><i className="fa-solid fa-check text-[#D31E24]"></i> Eliminação de Delay do Acelerador</li>
              <li className="flex items-center gap-2"><i className="fa-solid fa-check text-[#D31E24]"></i> Mapas de Câmbio TCU</li>
              <li className="flex items-center gap-2"><i className="fa-solid fa-check text-[#D31E24]"></i> Stage 2 com Downpipe Inox</li>
            </ul>
            <a href="https://wa.me/5569993975787" target="_blank" className="inline-flex items-center gap-2 text-[#D31E24] font-orbitron font-bold text-xs uppercase tracking-widest border-b border-[#D31E24] pb-1 hover:text-white hover:border-white transition-all">
              Consultar Projeto <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>

        {/* Card Amarok */}
        <div className="relative group overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950">
          <div className="aspect-[16/10] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1609388344583-b9b3296c6a85?auto=format&fit=crop&q=80&w=1200" 
              alt="VW Amarok V6 AK Performance" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-50 group-hover:brightness-100"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
          
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
            <div className="flex items-center gap-4 mb-4">
              <img src="https://cdn.simpleicons.org/volkswagen/D31E24" className="h-8 w-8" alt="VW Logo" />
              <span className="bg-[#D31E24] text-white text-[9px] font-black font-orbitron px-3 py-1 tracking-widest uppercase">
                V6 TDI EXPERT
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-orbitron font-black text-white uppercase mb-2">
              VW AMAROK V6
            </h3>
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-6">
              Desbloqueio de Velocidade & Performance Pura
            </p>
            <ul className="space-y-2 text-zinc-300 text-sm font-light mb-6">
              <li className="flex items-center gap-2"><i className="fa-solid fa-check text-[#D31E24]"></i> Mais de 300cv (Stage 2)</li>
              <li className="flex items-center gap-2"><i className="fa-solid fa-check text-[#D31E24]"></i> Proteção Ativa do Motor</li>
              <li className="flex items-center gap-2"><i className="fa-solid fa-check text-[#D31E24]"></i> Solução Definitiva EGR/DPF</li>
            </ul>
            <a href="https://wa.me/5569993975787" target="_blank" className="inline-flex items-center gap-2 text-[#D31E24] font-orbitron font-bold text-xs uppercase tracking-widest border-b border-[#D31E24] pb-1 hover:text-white hover:border-white transition-all">
              Consultar Projeto <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
