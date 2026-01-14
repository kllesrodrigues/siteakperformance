
import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const whatsappLink = "https://wa.me/5569993975787";
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contato" className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-8">
              <Logo className="h-12 md:h-14" />
            </div>
            <p className="text-zinc-400 text-lg max-w-md leading-relaxed font-light text-justify">
              Líderes em engenharia eletrônica automotiva de Rondônia para o Brasil. 
              Tecnologia de ponta para quem exige o máximo desempenho.
            </p>
            <div className="flex space-x-4 mt-8">
              <a 
                href="https://www.instagram.com/akperformanceoficial/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 bg-black rounded-sm flex items-center justify-center hover:bg-[#D31E24] transition-all border border-zinc-800 hover:border-[#D31E24] hover:-translate-y-1"
              >
                <i className="fa-brands fa-instagram text-xl"></i>
              </a>
              <a 
                href="https://www.instagram.com/akperformanceoficial/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 bg-black rounded-sm flex items-center justify-center hover:bg-[#D31E24] transition-all border border-zinc-800 hover:border-[#D31E24] hover:-translate-y-1"
              >
                <i className="fa-brands fa-youtube text-xl"></i>
              </a>
              <a 
                href="https://www.instagram.com/akperformanceoficial/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 bg-black rounded-sm flex items-center justify-center hover:bg-[#D31E24] transition-all border border-zinc-800 hover:border-[#D31E24] hover:-translate-y-1"
              >
                <i className="fa-brands fa-facebook text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-orbitron font-bold text-xs mb-8 text-white uppercase tracking-[0.3em]">Navegação</h4>
            <ul className="space-y-4 text-zinc-500 font-bold text-[10px] uppercase tracking-widest">
              <li><a href="#home" className="hover:text-[#D31E24] transition-colors">Página Inicial</a></li>
              <li><a href="#simulador" className="hover:text-[#D31E24] transition-colors">Simulador</a></li>
              <li><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-[#D31E24] transition-colors">Serviços Elite</a></li>
              <li><a href="#catalogo" className="hover:text-[#D31E24] transition-colors">Galeria Projetos</a></li>
              <li><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-[#D31E24] transition-colors">Solicitar Orçamento</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-orbitron font-bold text-xs mb-8 text-white uppercase tracking-[0.3em]">Contato Direto</h4>
            <ul className="space-y-6 text-zinc-400">
              <li className="flex items-start gap-4">
                <i className="fa-solid fa-location-dot text-[#D31E24] mt-1"></i>
                <span className="text-sm font-light">Av. Pres. Nasser, 1324 - Jardim das Oliveiras<br/><span className="text-zinc-500">Vilhena - RO, 76980-632</span></span>
              </li>
              <li className="flex items-center gap-4">
                <i className="fa-solid fa-phone text-[#D31E24]"></i>
                <span className="text-sm font-bold">(69) 99397-5787</span>
              </li>
              <li className="flex items-center gap-4">
                <i className="fa-solid fa-envelope text-[#D31E24]"></i>
                <span className="text-sm font-light">contato@akperformanceoficial.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest">
            © 2017 - {currentYear} AK PERFORMANCE. ENGENHARIA AUTOMOTIVA DE ELITE.
          </p>
          <div className="flex gap-8 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacidade</a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Termos</a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
