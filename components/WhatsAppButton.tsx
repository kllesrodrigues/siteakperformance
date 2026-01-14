
import React from 'react';

export const WhatsAppButton: React.FC = () => {
  return (
    <a 
      href="https://wa.me/5569993975787" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/20 transition-all hover:scale-110 active:scale-95 group"
    >
      <i className="fa-brands fa-whatsapp text-3xl"></i>
      <span className="absolute right-full mr-4 bg-white text-black text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Fale com um Especialista
      </span>
    </a>
  );
};
