
import React, { useState, useEffect } from 'react';

const CAR_MODELS = [
  "VW Gol 1.0 MPI", "Fiat Uno Way", "Chevrolet Onix Turbo", "Hyundai HB20 Platinum",
  "Toyota Hilux SRX", "Ford Ranger V6", "VW Amarok V6", "Chevrolet S10 High Country",
  "VW Jetta GLI", "Honda Civic Touring", "Fiat Toro Ranch", "Jeep Compass TD350",
  "VW Polo GTS", "Renault Sandero RS", "Mitsubishi L200 Triton", "Hyundai Creta Ultimate"
];

const INTERVALS = [300000, 600000, 900000]; // 5, 10 e 15 minutos em ms

// Ícone oficial AK Performance para o Toast
const AKSymbolLogo = () => (
  <div className="relative flex flex-col items-center">
    <div className="bg-[#D31E24] p-2 rounded-t-sm rounded-br-xl shadow-lg border border-[#D31E24]/20 group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 45" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision">
        {/* Stylized A */}
        <path d="M15 40L35 5L55 40" stroke="#F5F5DC" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
        {/* Stylized K */}
        <path d="M75 5V40" stroke="#F5F5DC" strokeWidth="14" strokeLinecap="round" />
        <path d="M75 22.5L95 5" stroke="#F5F5DC" strokeWidth="14" strokeLinecap="round" />
        <path d="M75 22.5L95 40" stroke="#F5F5DC" strokeWidth="14" strokeLinecap="round" />
      </svg>
    </div>
  </div>
);

export const NotificationToast: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentCar, setCurrentCar] = useState("");

  const showNotification = () => {
    const randomCar = CAR_MODELS[Math.floor(Math.random() * CAR_MODELS.length)];
    setCurrentCar(randomCar);
    setIsVisible(true);

    // Tempo de exibição de 10 segundos
    setTimeout(() => {
      setIsVisible(false);
      scheduleNext();
    }, 10000);
  };

  const scheduleNext = () => {
    const randomInterval = INTERVALS[Math.floor(Math.random() * INTERVALS.length)];
    setTimeout(showNotification, randomInterval);
  };

  useEffect(() => {
    // Primeira exibição aos 8 segundos para impacto imediato
    const firstTimer = setTimeout(showNotification, 8000);
    return () => clearTimeout(firstTimer);
  }, []);

  return (
    <div 
      className={`fixed bottom-8 left-8 z-[100] transition-all duration-700 transform ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-zinc-950/98 backdrop-blur-2xl border border-zinc-800 p-4 rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex items-center gap-5 min-w-[320px] border-l-4 border-l-[#D31E24] overflow-hidden group">
        {/* Container da Logo AK Oficial */}
        <div className="flex-shrink-0">
          <AKSymbolLogo />
        </div>
        
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D31E24] animate-pulse"></span>
            <p className="text-[#D31E24] font-orbitron font-black text-[8px] uppercase tracking-[0.3em]">
              AK PERFORMANCE FEED
            </p>
          </div>
          <p className="text-white font-black text-[14px] leading-tight mb-0.5 uppercase tracking-tighter">
            + Um Carro Remapeado
          </p>
          <p className="text-zinc-400 font-bold text-[11px] tracking-wide">
             {currentCar}
          </p>
        </div>

        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 text-zinc-600 hover:text-white transition-colors"
          aria-label="Fechar"
        >
          <i className="fa-solid fa-xmark text-[10px]"></i>
        </button>
      </div>
      
      {/* Barra de Progresso AK Red */}
      {isVisible && (
        <div className="absolute bottom-0 left-0 h-[3px] bg-[#D31E24] animate-shrink-width w-full shadow-[0_0_10px_rgba(211,30,36,0.5)]"></div>
      )}
      <style>{`
        @keyframes shrink-width {
          from { width: 100%; }
          to { width: 0%; }
        }
        .animate-shrink-width {
          animation: shrink-width 10s linear forwards;
        }
      `}</style>
    </div>
  );
};
