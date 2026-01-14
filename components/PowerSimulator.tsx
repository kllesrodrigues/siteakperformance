
import React, { useState, useMemo, useEffect } from 'react';
import { Vehicle } from '../types';

interface PowerSimulatorProps {
  onClose: () => void;
  vehicles: Vehicle[];
}

export const PowerSimulator: React.FC<PowerSimulatorProps> = ({ onClose, vehicles }) => {
  // Extrai marcas únicas da lista de veículos atual
  const availableBrands = useMemo(() => {
    return Array.from(new Set(vehicles.map(v => v.brand))).sort();
  }, [vehicles]);

  const [selectedBrand, setSelectedBrand] = useState(availableBrands[0] || '');
  const [selectedKey, setSelectedKey] = useState('');
  const [imgOpacity, setImgOpacity] = useState(0);

  // Inicializa a seleção quando as marcas mudam ou carregam
  useEffect(() => {
    if (availableBrands.length > 0 && !availableBrands.includes(selectedBrand)) {
      setSelectedBrand(availableBrands[0]);
    }
  }, [availableBrands]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => v.brand === selectedBrand);
  }, [selectedBrand, vehicles]);

  // Gerencia o veículo selecionado
  const selectedVehicle = useMemo(() => {
    if (filteredVehicles.length === 0) return null;
    const found = filteredVehicles.find(v => `${v.model}-${v.engine}` === selectedKey);
    return found || filteredVehicles[0];
  }, [selectedKey, filteredVehicles]);

  // Atualiza a chave quando a marca muda
  useEffect(() => {
    if (filteredVehicles.length > 0) {
      setSelectedKey(`${filteredVehicles[0].model}-${filteredVehicles[0].engine}`);
      setImgOpacity(0);
    }
  }, [selectedBrand, filteredVehicles]);

  useEffect(() => {
    setImgOpacity(0);
  }, [selectedVehicle?.imageUrl]);

  // Se não houver veículos, não renderiza nada ou mostra loading
  if (!selectedVehicle) return null;

  const calculateStage1 = (stock: number, category: string) => {
    const factor = category === 'aspirado' ? 1.10 : category === 'turbo' ? 1.20 : 1.30;
    return Math.round(stock * factor * 10) / 10;
  };

  const stage1HP = calculateStage1(selectedVehicle.stockHP, selectedVehicle.engineCategory);
  const stage1TQ = calculateStage1(selectedVehicle.stockTQ, selectedVehicle.engineCategory);
  
  const hpDiff = Math.round(stage1HP - selectedVehicle.stockHP);
  const tqDiff = (stage1TQ - selectedVehicle.stockTQ).toFixed(1);

  // Fecha ao clicar fora do conteúdo
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-6xl relative animate-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 md:-right-8 text-zinc-400 hover:text-[#D31E24] transition-colors p-2"
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest">Fechar</span>
            <i className="fa-solid fa-xmark text-2xl"></i>
          </div>
        </button>

        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-12">
          {/* Painel de Controle */}
          <div className="lg:w-2/5 flex flex-col justify-between bg-zinc-900 border border-zinc-800 p-8 md:p-10 rounded-sm carbon-bg shadow-2xl">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#D31E24]"></div>
                <span className="text-[#D31E24] font-orbitron font-bold tracking-[0.4em] text-[10px] uppercase">Telemetry Control</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-orbitron font-black mb-8 text-white uppercase leading-none">Configurador<br/><span className="text-[#D31E24]">De Ganho</span></h2>
              
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-3 group-focus-within:text-[#D31E24] transition-colors">1. Selecionar Marca</label>
                  <div className="relative">
                    <select 
                      value={selectedBrand}
                      className="w-full bg-black border-b border-zinc-800 p-4 text-white appearance-none outline-none focus:border-[#D31E24] transition-all font-orbitron font-bold text-sm tracking-widest"
                      onChange={(e) => setSelectedBrand(e.target.value)}
                    >
                      {availableBrands.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                      <i className="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-3 group-focus-within:text-[#D31E24] transition-colors">2. Selecionar Modelo / Motor</label>
                  <div className="relative">
                    <select 
                      value={selectedKey}
                      className="w-full bg-black border-b border-zinc-800 p-4 text-white appearance-none outline-none focus:border-[#D31E24] transition-all font-orbitron font-bold text-sm tracking-widest"
                      onChange={(e) => setSelectedKey(e.target.value)}
                    >
                      {filteredVehicles.map(v => (
                        <option key={`${v.model}-${v.engine}`} value={`${v.model}-${v.engine}`}>
                          {v.model} - {v.engine}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                      <i className="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-4">
                  <div className="flex justify-between items-end pb-4 border-b border-zinc-800/50">
                     <span className="text-zinc-500 text-xs font-bold uppercase">Tipo de Preparação</span>
                     <span className="text-[#D31E24] font-orbitron font-bold text-sm uppercase">Stage 1 Elite</span>
                  </div>
                  <div className="flex justify-between items-end pb-4 border-b border-zinc-800/50">
                     <span className="text-zinc-500 text-xs font-bold uppercase">Categoria Motor</span>
                     <span className="text-white font-orbitron font-bold text-sm uppercase">{selectedVehicle.engineCategory}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
               <a href="https://wa.me/5569993975787" target="_blank" className="w-full group bg-[#D31E24] text-white font-orbitron font-black p-5 text-xs tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 uppercase flex items-center justify-center gap-4">
                  Solicitar Este Setup
                  <i className="fa-solid fa-paper-plane group-hover:translate-x-2 transition-transform"></i>
               </a>
               <p className="text-center text-zinc-600 text-[9px] uppercase tracking-widest mt-4">Ganhos Estimados: Software AK</p>
            </div>
          </div>

          {/* Visualização de Dados */}
          <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-sm relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest block mb-1">Potência (Horsepower)</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-orbitron font-black text-white">{Math.round(stage1HP)}</span>
                  <span className="text-[#D31E24] font-orbitron font-bold text-lg">CV</span>
                </div>
                <div className="mt-6 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#D31E24] transition-all duration-1000 ease-out" 
                    style={{ width: `${Math.min((stage1HP / 600) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2">
                   <span className="text-zinc-600 text-[10px] uppercase font-bold">Original: {selectedVehicle.stockHP} cv</span>
                   <span className="text-[#D31E24] text-[10px] uppercase font-black">+{hpDiff} cv ganho</span>
                </div>
              </div>
              <i className="fa-solid fa-bolt absolute -bottom-4 -right-4 text-zinc-800/30 text-8xl group-hover:text-[#D31E24]/10 transition-colors"></i>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-sm relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest block mb-1">Torque (kgfm)</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-orbitron font-black text-white">{stage1TQ.toFixed(1)}</span>
                  <span className="text-[#D31E24] font-orbitron font-bold text-lg">KGFM</span>
                </div>
                <div className="mt-6 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#D31E24] transition-all duration-1000 ease-out" 
                    style={{ width: `${Math.min((stage1TQ / 80) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2">
                   <span className="text-zinc-600 text-[10px] uppercase font-bold">Original: {selectedVehicle.stockTQ.toFixed(1)} kgfm</span>
                   <span className="text-[#D31E24] text-[10px] uppercase font-black">+{tqDiff} kgfm ganho</span>
                </div>
              </div>
              <i className="fa-solid fa-gear absolute -bottom-4 -right-4 text-zinc-800/30 text-8xl group-hover:text-[#D31E24]/10 transition-colors"></i>
            </div>

            <div className="md:col-span-2 relative group overflow-hidden rounded-sm border border-zinc-800 bg-black h-80">
               <img 
                 key={selectedVehicle.imageUrl}
                 src={selectedVehicle.imageUrl} 
                 alt={`${selectedVehicle.brand} ${selectedVehicle.model}`} 
                 className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                 onLoad={() => setImgOpacity(1)}
                 style={{ opacity: imgOpacity, transition: 'opacity 0.8s ease-in' }}
               />
               <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
               <div className="absolute top-0 right-0 p-8">
                 <div className="flex flex-col items-end">
                    <span className="text-[#D31E24] font-orbitron font-bold text-2xl uppercase">
                      {selectedVehicle.engineCategory} Stage 1
                    </span>
                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">AK Performance Software</span>
                 </div>
               </div>
               <div className="absolute bottom-0 left-0 p-8">
                  <h4 className="text-3xl font-orbitron font-black text-white uppercase">{selectedVehicle.brand}</h4>
                  <p className="text-[#D31E24] font-orbitron font-bold tracking-[0.2em] text-sm">{selectedVehicle.model}</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
