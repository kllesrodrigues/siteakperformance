
import React from 'react';
import { BRANDS } from '../constants';

export const BrandCloud: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
      {BRANDS.map((brand) => (
        <img 
          key={brand.name}
          src={brand.logo} 
          alt={brand.name} 
          className="h-8 md:h-12 w-auto object-contain hover:scale-110 transition-transform cursor-pointer"
          title={brand.name}
          loading="lazy"
        />
      ))}
    </div>
  );
};
