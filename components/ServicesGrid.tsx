
import React, { useState } from 'react';
import { SERVICES } from '../constants';
import { MapUnit } from '../types';

interface ModalContent {
  title: string;
  fullDescription: React.ReactNode;
}

interface ServicesGridProps {
  units: MapUnit[];
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ units }) => {
  const [activeService, setActiveService] = useState<string | null>(null);

  const modalData: Record<string, ModalContent> = {
    remap: {
      title: 'Remapeamento ECU (Software)',
      fullDescription: (
        <div className="space-y-4">
          <p className="text-justify">O Remapeamento de ECU é o ajuste fino do software que controla o motor do seu veículo. Nós acessamos o mapa original e otimizamos parâmetros críticos.</p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-400">
            <li className="text-justify"><strong className="text-white">Para que serve:</strong> Aumentar a potência (CV) e o torque (kgfm), remover limitadores de velocidade e melhorar a resposta do pedal do acelerador.</li>
            <li className="text-justify"><strong className="text-white">Segurança:</strong> Mantemos todas as proteções térmicas e de segurança do motor originais.</li>
          </ul>
        </div>
      )
    },
    stage: {
      title: 'Preparação por Stages',
      fullDescription: (
        <div className="space-y-6">
          <div className="border-l-2 border-[#D31E24] pl-4">
            <h5 className="text-white font-bold uppercase text-sm mb-2">Stage 1 - Eficiência Pura</h5>
            <p className="text-xs text-zinc-400 text-justify">Apenas otimização de software. Não requer trocas de peças físicas.</p>
          </div>
          <div className="border-l-2 border-[#D31E24] pl-4">
            <h5 className="text-white font-bold uppercase text-sm mb-2">Stage 2 - Fluxo e Potência</h5>
            <p className="text-xs text-zinc-400 text-justify">Software + Downpipe + Filtro de Ar esportivo (Intake).</p>
          </div>
        </div>
      )
    },
    mecanica: {
      title: 'Mecânica Premium & Geral',
      fullDescription: (
        <div className="space-y-4">
          <p className="text-justify">Oficina especializada em veículos de alta performance com diagnóstico avançado.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
              <span className="text-[#D31E24] block font-black text-[10px] uppercase mb-1">Preventiva</span>
              <p className="text-[11px] text-zinc-400 text-justify">Troca de óleo (Motor e Câmbio), filtros e fluidos.</p>
            </div>
            <div className="bg-zinc-900 p-3 rounded border border-zinc-800">
              <span className="text-[#D31E24] block font-black text-[10px] uppercase mb-1">Diagnóstico</span>
              <p className="text-[11px] text-zinc-400 text-justify">Scanner avançado para veículos importados.</p>
            </div>
          </div>
        </div>
      )
    },
    escapamento: {
      title: 'Sistemas de Exaustão Elite',
      fullDescription: (
        <div className="space-y-4">
          <p className="text-justify">Fabricação em Inox 304 com solda TIG para garantir durabilidade e performance.</p>
        </div>
      )
    }
  };

  const closeByBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setActiveService(null);
  };

  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#D31E24]"></div>
            <span className="text-[#D31E24] font-orbitron font-bold tracking-[0.4em] text-[10px] uppercase">Services Suite</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-orbitron font-black text-white uppercase leading-none mb-6">
            NOSSO<br/><span className="text-gradient">ECOSSISTEMA</span>
          </h2>
        </div>
        
        <div className="hidden md:block relative group">
           <div className="p-5 border border-zinc-800 rounded-sm glass-effect flex items-center gap-6 cursor-pointer hover:border-[#D31E24] transition-all duration-300 group shadow-2xl">
              <div className="text-right">
                 <span className="block text-white font-bold text-sm uppercase group-hover:text-[#D31E24]">REDE DE</span>
                 <span className="text-[#D31E24] text-[10px] uppercase font-black tracking-[0.3em] group-hover:text-white">FRANQUEADOS</span>
              </div>
              <div className="w-14 h-14 bg-[#D31E24] flex items-center justify-center shadow-xl shadow-[#D31E24]/30 rounded-sm">
                 <i className="fa-solid fa-network-wired text-white text-2xl"></i>
              </div>
           </div>

           <div className="absolute bottom-full right-0 mb-8 w-[600px] bg-zinc-950 border border-zinc-800 rounded-sm shadow-2xl opacity-0 invisible translate-y-8 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-500 z-50 overflow-hidden">
              <div className="px-8 py-6 border-b border-zinc-900 bg-black/60 flex items-center justify-between">
                 <div>
                    <h5 className="text-white font-orbitron font-black text-[14px] uppercase tracking-[0.25em]">REDE DE FRANQUEADOS</h5>
                    <p className="text-[8px] text-[#D31E24] font-black uppercase mt-1">UNIDADES HOMOLOGADAS AK PERFORMANCE</p>
                 </div>
                 <div className="text-right">
                    <span className="block text-[10px] text-white font-black uppercase">Ativas</span>
                    <span className="text-[12px] text-[#D31E24] font-black">{units.length} UNIDADES</span>
                 </div>
              </div>
              
              <div className="p-6 bg-[#030303] overflow-y-auto max-h-[350px]">
                 <div className="grid grid-cols-2 gap-3">
                    {units.map((unit, idx) => (
                      <div key={idx} className={`p-4 border rounded-sm flex flex-col justify-between h-24 ${unit.type === 'hq' ? 'border-[#D31E24] bg-zinc-900/50' : 'border-zinc-800 bg-black'}`}>
                         <span className="text-[10px] font-orbitron font-black text-white uppercase">{unit.city}</span>
                         <div className="flex items-center justify-between mt-auto">
                            <span className="text-[8px] font-mono text-zinc-500 uppercase">{unit.state} // BR</span>
                            <span className={`text-[7px] font-bold uppercase px-1.5 py-0.5 border ${unit.type === 'hq' ? 'text-[#D31E24] border-[#D31E24]/30' : 'text-zinc-600 border-zinc-800'}`}>
                               {unit.type === 'hq' ? 'MATRIZ' : 'PARCEIRO'}
                            </span>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Botão Flutuante de Conversão */}
              <div className="p-4 bg-zinc-900 border-t border-zinc-800">
                <a 
                  href="https://wa.me/5569993975787?text=Olá,%20tenho%20interesse%20em%20saber%20mais%20sobre%20o%20modelo%20de%20franquia%20AK%20Performance." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#D31E24] hover:bg-white hover:text-black text-white py-3 font-orbitron font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 shadow-lg"
                >
                  Seja um Franqueado
                  <i className="fa-brands fa-whatsapp ml-2 text-sm"></i>
                </a>
              </div>
           </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-0.5 bg-zinc-800 border border-zinc-800">
        {SERVICES.map((service) => (
          <div key={service.id} onClick={() => setActiveService(service.id)} className="group bg-[#09090b] p-12 md:p-16 hover:bg-zinc-900 transition-all cursor-pointer relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-12 h-12 border border-[#D31E24]/30 flex items-center justify-center mb-8 group-hover:bg-[#D31E24] transition-all">
                <i className={`fa-solid ${service.icon} text-xl text-[#D31E24] group-hover:text-white`}></i>
              </div>
              <h4 className="text-2xl font-orbitron font-black text-white mb-6 uppercase group-hover:text-[#D31E24] transition-colors">{service.title}</h4>
              <p className="text-zinc-400 font-light leading-relaxed mb-10 text-justify">{service.description}</p>
              <button className="text-white font-orbitron font-bold text-[10px] uppercase tracking-[0.3em] group-hover:text-[#D31E24]">
                DETALHES <i className="fa-solid fa-arrow-right-long ml-2"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeService && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={closeByBackdrop}>
          <div className="bg-zinc-950 border border-zinc-800 max-w-xl w-full p-10 relative shadow-2xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setActiveService(null)} className="absolute top-6 right-6 text-zinc-500 hover:text-white">
              <i className="fa-solid fa-xmark text-2xl"></i>
            </button>
            <h3 className="text-2xl font-orbitron font-black text-white uppercase mb-6">{modalData[activeService].title}</h3>
            <div className="text-zinc-400 text-sm leading-relaxed">{modalData[activeService].fullDescription}</div>
            <a href="https://wa.me/5569993975787" target="_blank" className="block w-full bg-[#D31E24] text-white py-4 mt-10 font-orbitron font-black text-center text-xs uppercase">AGENDAR CONSULTORIA</a>
          </div>
        </div>
      )}
    </div>
  );
};
