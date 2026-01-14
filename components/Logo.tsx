
import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12" }) => {
  return (
    <div className={`flex flex-col items-start ${className} group cursor-pointer`}>
      {/* Top Part: AK in Red */}
      <div className="bg-[#D31E24] px-4 py-1.5 rounded-t-sm rounded-br-[24px] flex items-center justify-center -mb-1 relative z-10 group-hover:brightness-110 transition-all shadow-lg">
        <svg viewBox="0 0 100 45" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision">
          {/* Stylized A */}
          <path d="M15 40L35 5L55 40" stroke="#F5F5DC" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          {/* Stylized K */}
          <path d="M75 5V40" stroke="#F5F5DC" strokeWidth="12" strokeLinecap="round" />
          <path d="M75 22.5L95 5" stroke="#F5F5DC" strokeWidth="12" strokeLinecap="round" />
          <path d="M75 22.5L95 40" stroke="#F5F5DC" strokeWidth="12" strokeLinecap="round" />
        </svg>
      </div>
      
      {/* Bottom Part: PERFORMANCE in Black */}
      <div className="bg-[#121212] px-6 py-2 rounded-b-sm rounded-tr-sm border border-zinc-800/80 shadow-xl">
        <span className="font-orbitron text-[9px] md:text-[11px] font-black tracking-[0.35em] text-[#F5F5DC] uppercase antialiased">
          PERFORMANCE
        </span>
      </div>
    </div>
  );
};
