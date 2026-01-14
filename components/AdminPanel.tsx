
import React, { useState } from 'react';
import { MapUnit, Project, Vehicle, Product } from '../types';

interface AdminPanelProps {
  onAddUnit: (unit: MapUnit) => void;
  units: MapUnit[];
  onRemoveUnit: (city: string) => void;
  onAddProject: (project: Project) => void;
  onAddVehicle: (vehicle: Vehicle) => void;
  onAddProduct: (product: Product) => void;
}

type AdminView = 'login' | 'menu' | 'network' | 'projects' | 'vehicles' | 'store';

export const AdminPanel: React.FC<AdminPanelProps> = ({ onAddUnit, units, onRemoveUnit, onAddProject, onAddVehicle, onAddProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<AdminView>('login');
  
  // Login State
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  // Unit State
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  // Project State
  const [projTitle, setProjTitle] = useState('');
  const [projType, setProjType] = useState('');
  const [projImg, setProjImg] = useState('');

  // Vehicle State
  const [vehBrand, setVehBrand] = useState('');
  const [vehModel, setVehModel] = useState('');
  const [vehEngine, setVehEngine] = useState('');
  const [vehStockHP, setVehStockHP] = useState('');
  const [vehStockTQ, setVehStockTQ] = useState('');
  const [vehCategory, setVehCategory] = useState<'turbo' | 'aspirado' | 'diesel'>('turbo');
  const [vehImg, setVehImg] = useState('');

  // Product State
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodImg, setProdImg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === 'kles' && pass === '230025') {
      setView('menu');
      setError('');
    } else {
      setError('Credenciais Inválidas');
    }
  };

  const handleAddNetwork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city || !state) return;

    if (units.some(u => u.city.toLowerCase() === city.toLowerCase())) {
      alert('Esta unidade já existe no script interno.');
      return;
    }
    
    onAddUnit({
      city,
      state: state.toUpperCase(),
      type: 'partner'
    });
    
    setCity('');
    setState('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle || !projType || !projImg) {
      alert('Preencha todos os campos e selecione uma imagem.');
      return;
    }

    onAddProject({
      id: Date.now(),
      title: projTitle,
      type: projType,
      img: projImg
    });

    setProjTitle('');
    setProjType('');
    setProjImg('');
    alert('Projeto adicionado com sucesso!');
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehBrand || !vehModel || !vehEngine || !vehStockHP || !vehStockTQ || !vehImg) {
      alert('Preencha todos os campos do veículo.');
      return;
    }

    onAddVehicle({
      brand: vehBrand,
      model: vehModel,
      engine: vehEngine,
      stockHP: Number(vehStockHP),
      stockTQ: Number(vehStockTQ),
      engineCategory: vehCategory,
      imageUrl: vehImg
    });

    setVehBrand('');
    setVehModel('');
    setVehEngine('');
    setVehStockHP('');
    setVehStockTQ('');
    setVehImg('');
    alert('Veículo adicionado ao Simulador!');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodPrice || !prodDesc || !prodImg) {
      alert('Preencha todos os campos do produto.');
      return;
    }

    onAddProduct({
      id: Date.now(),
      name: prodName,
      price: parseFloat(prodPrice),
      description: prodDesc,
      image: prodImg
    });

    setProdName('');
    setProdPrice('');
    setProdDesc('');
    setProdImg('');
    alert('Produto adicionado à loja!');
  };

  const closePortal = () => {
    setIsOpen(false);
    setView('login');
    setUser('');
    setPass('');
    setError('');
    // Reset all forms
    setCity(''); setState('');
    setProjTitle(''); setProjType(''); setProjImg('');
    setVehBrand(''); setVehModel(''); setVehEngine(''); setVehStockHP(''); setVehStockTQ(''); setVehImg('');
    setProdName(''); setProdPrice(''); setProdDesc(''); setProdImg('');
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="text-[9px] font-orbitron font-black uppercase tracking-[0.2em] border border-zinc-800 px-4 py-2 hover:bg-[#D31E24] hover:border-transparent transition-all"
      >
        ADMIN
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-2xl p-8 relative shadow-2xl animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button onClick={closePortal} className="absolute top-4 right-4 text-zinc-500 hover:text-white z-10">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>

            {/* VIEW: LOGIN */}
            {view === 'login' && (
              <form onSubmit={handleLogin} className="space-y-6 max-w-md mx-auto py-10">
                <div className="text-center mb-8">
                  <h3 className="text-white font-orbitron font-black text-xl uppercase">SISTEMA INTERNO</h3>
                  <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">Controle de Expansão AK</p>
                </div>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="USUÁRIO"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="w-full bg-black border border-zinc-800 p-4 text-white outline-none focus:border-[#D31E24] transition-all text-xs font-bold"
                  />
                  <input 
                    type="password" 
                    placeholder="SENHA"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    className="w-full bg-black border border-zinc-800 p-4 text-white outline-none focus:border-[#D31E24] transition-all text-xs font-bold"
                  />
                </div>
                {error && <p className="text-[#D31E24] text-[10px] font-bold text-center uppercase">{error}</p>}
                <button type="submit" className="w-full bg-[#D31E24] text-white py-4 font-orbitron font-black text-xs tracking-widest uppercase">
                  ÁREA DE ADMINISTRADOR
                </button>
              </form>
            )}

            {/* VIEW: MENU SELECTION */}
            {view === 'menu' && (
              <div className="py-10 text-center">
                <h3 className="text-white font-orbitron font-black text-xl uppercase mb-12">SELECIONE UMA OPERAÇÃO</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button 
                    onClick={() => setView('network')}
                    className="group bg-zinc-900 border border-zinc-800 p-4 hover:border-[#D31E24] transition-all flex flex-col items-center justify-center gap-4 aspect-square"
                  >
                    <i className="fa-solid fa-network-wired text-white text-xl group-hover:text-[#D31E24]"></i>
                    <span className="text-white font-orbitron font-bold text-[8px] uppercase tracking-widest">REDE</span>
                  </button>

                  <button 
                    onClick={() => setView('projects')}
                    className="group bg-zinc-900 border border-zinc-800 p-4 hover:border-[#D31E24] transition-all flex flex-col items-center justify-center gap-4 aspect-square"
                  >
                    <i className="fa-solid fa-camera text-white text-xl group-hover:text-[#D31E24]"></i>
                    <span className="text-white font-orbitron font-bold text-[8px] uppercase tracking-widest">PROJETOS</span>
                  </button>

                  <button 
                    onClick={() => setView('vehicles')}
                    className="group bg-zinc-900 border border-zinc-800 p-4 hover:border-[#D31E24] transition-all flex flex-col items-center justify-center gap-4 aspect-square"
                  >
                    <i className="fa-solid fa-car text-white text-xl group-hover:text-[#D31E24]"></i>
                    <span className="text-white font-orbitron font-bold text-[8px] uppercase tracking-widest">VEÍCULOS</span>
                  </button>

                  <button 
                    onClick={() => setView('store')}
                    className="group bg-zinc-900 border border-zinc-800 p-4 hover:border-[#D31E24] transition-all flex flex-col items-center justify-center gap-4 aspect-square"
                  >
                    <i className="fa-solid fa-shop text-white text-xl group-hover:text-[#D31E24]"></i>
                    <span className="text-white font-orbitron font-bold text-[8px] uppercase tracking-widest">LOJA / VENDAS</span>
                  </button>
                </div>
                <button onClick={() => setView('login')} className="mt-12 text-zinc-500 hover:text-white text-[9px] uppercase font-bold tracking-widest">
                  SAIR DO SISTEMA
                </button>
              </div>
            )}

            {/* VIEW: VEHICLE MANAGEMENT */}
            {view === 'vehicles' && (
              <div className="grid md:grid-cols-2 gap-12">
                <form onSubmit={handleAddVehicle} className="space-y-6">
                  <div className="mb-8">
                    <button type="button" onClick={() => setView('menu')} className="text-zinc-500 hover:text-white mb-4 text-xs">
                      <i className="fa-solid fa-arrow-left mr-2"></i> VOLTAR
                    </button>
                    <h3 className="text-[#D31E24] font-orbitron font-black text-xl uppercase">CADASTRO DE<br/>VEÍCULO</h3>
                    <p className="text-zinc-500 text-[8px] uppercase tracking-[0.4em] mt-2">ALIMENTAR SIMULADOR</p>
                  </div>

                  <div className="space-y-3">
                     <div className="grid grid-cols-2 gap-3">
                        <input 
                          type="text" 
                          value={vehBrand}
                          onChange={(e) => setVehBrand(e.target.value)}
                          placeholder="MARCA (EX: BMW)"
                          className="w-full bg-black border border-zinc-800 p-3 text-white outline-none focus:border-[#D31E24] text-[10px] font-bold uppercase"
                          required
                        />
                        <input 
                          type="text" 
                          value={vehModel}
                          onChange={(e) => setVehModel(e.target.value)}
                          placeholder="MODELO (EX: 320i)"
                          className="w-full bg-black border border-zinc-800 p-3 text-white outline-none focus:border-[#D31E24] text-[10px] font-bold uppercase"
                          required
                        />
                     </div>
                     <input 
                        type="text" 
                        value={vehEngine}
                        onChange={(e) => setVehEngine(e.target.value)}
                        placeholder="MOTOR (EX: 2.0 B48 TURBO)"
                        className="w-full bg-black border border-zinc-800 p-3 text-white outline-none focus:border-[#D31E24] text-[10px] font-bold uppercase"
                        required
                     />
                     <div className="grid grid-cols-2 gap-3">
                        <input 
                          type="number" 
                          value={vehStockHP}
                          onChange={(e) => setVehStockHP(e.target.value)}
                          placeholder="POTÊNCIA (CV)"
                          className="w-full bg-black border border-zinc-800 p-3 text-white outline-none focus:border-[#D31E24] text-[10px] font-bold uppercase"
                          required
                        />
                        <input 
                          type="number" 
                          step="0.1"
                          value={vehStockTQ}
                          onChange={(e) => setVehStockTQ(e.target.value)}
                          placeholder="TORQUE (KGFM)"
                          className="w-full bg-black border border-zinc-800 p-3 text-white outline-none focus:border-[#D31E24] text-[10px] font-bold uppercase"
                          required
                        />
                     </div>
                     <div className="group">
                        <label className="text-[9px] text-zinc-500 font-bold uppercase block mb-2">Categoria Motor</label>
                        <select 
                          value={vehCategory} 
                          onChange={(e) => setVehCategory(e.target.value as any)}
                          className="w-full bg-black border border-zinc-800 p-3 text-white outline-none focus:border-[#D31E24] text-[10px] font-bold uppercase"
                        >
                           <option value="turbo">TURBO GASOLINA/FLEX</option>
                           <option value="diesel">TURBO DIESEL</option>
                           <option value="aspirado">ASPIRADO</option>
                        </select>
                     </div>
                     
                     <label className="flex items-center justify-center w-full h-20 border border-zinc-800 border-dashed bg-black cursor-pointer hover:border-[#D31E24] hover:bg-zinc-900 transition-all">
                        <div className="text-center">
                           <i className="fa-solid fa-camera text-zinc-600 mb-1"></i>
                           <p className="text-[8px] text-zinc-500 uppercase">FOTO DO VEÍCULO</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setVehImg)} />
                     </label>
                  </div>

                  <button type="submit" className="w-full bg-[#D31E24] text-white py-4 font-orbitron font-black text-xs uppercase shadow-lg shadow-[#D31E24]/20">
                    ADICIONAR AO SIMULADOR
                  </button>
                </form>

                <div className="flex flex-col justify-center items-center">
                   <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-4">PREVIEW SIMULADOR</p>
                   <div className="w-full aspect-[16/10] bg-zinc-900 border border-zinc-800 rounded-sm relative overflow-hidden group">
                      {vehImg ? (
                        <>
                           <img src={vehImg} alt="Preview" className="w-full h-full object-cover brightness-75" />
                           <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
                           <div className="absolute top-0 right-0 p-4">
                             <div className="flex flex-col items-end">
                                <span className="text-[#D31E24] font-orbitron font-bold text-sm uppercase">
                                  {vehCategory} Stage 1
                                </span>
                             </div>
                           </div>
                           <div className="absolute bottom-0 left-0 p-4">
                              <h4 className="text-xl font-orbitron font-black text-white uppercase">{vehBrand || 'MARCA'}</h4>
                              <p className="text-[#D31E24] font-orbitron font-bold tracking-[0.2em] text-[10px]">{vehModel || 'MODELO'}</p>
                           </div>
                        </>
                      ) : (
                         <div className="flex items-center justify-center h-full text-zinc-700">
                            <i className="fa-solid fa-car-side text-4xl"></i>
                         </div>
                      )}
                   </div>
                   <div className="mt-4 w-full grid grid-cols-2 gap-4">
                      <div className="bg-zinc-900 p-3 border border-zinc-800 text-center">
                         <span className="block text-[9px] text-zinc-500 font-bold uppercase">GANHO EST.</span>
                         <span className="block text-[#D31E24] font-orbitron font-black text-lg">
                            {vehStockHP ? `+${Math.round(Number(vehStockHP) * (vehCategory === 'turbo' ? 0.2 : vehCategory === 'diesel' ? 0.3 : 0.1))} CV` : '--'}
                         </span>
                      </div>
                      <div className="bg-zinc-900 p-3 border border-zinc-800 text-center">
                         <span className="block text-[9px] text-zinc-500 font-bold uppercase">TORQUE EST.</span>
                         <span className="block text-[#D31E24] font-orbitron font-black text-lg">
                            {vehStockTQ ? `+${(Number(vehStockTQ) * (vehCategory === 'turbo' ? 0.2 : vehCategory === 'diesel' ? 0.3 : 0.1)).toFixed(1)}` : '--'}
                         </span>
                      </div>
                   </div>
                </div>
              </div>
            )}

            {/* VIEW: STORE MANAGEMENT */}
            {view === 'store' && (
              <div className="grid md:grid-cols-2 gap-12">
                <form onSubmit={handleAddProduct} className="space-y-6">
                   <div className="mb-8">
                     <button type="button" onClick={() => setView('menu')} className="text-zinc-500 hover:text-white mb-4 text-xs">
                       <i className="fa-solid fa-arrow-left mr-2"></i> VOLTAR
                     </button>
                     <h3 className="text-[#D31E24] font-orbitron font-black text-xl uppercase">CADASTRAR<br/>PRODUTO</h3>
                     <p className="text-zinc-500 text-[8px] uppercase tracking-[0.4em] mt-2">VENDA ON-LINE</p>
                   </div>

                   <div className="space-y-4">
                     <input 
                       type="text" 
                       value={prodName}
                       onChange={(e) => setProdName(e.target.value)}
                       placeholder="NOME DO PRODUTO (EX: BONÉ AK)"
                       className="w-full bg-black border border-zinc-800 p-3 text-white outline-none focus:border-[#D31E24] text-[10px] font-bold uppercase"
                       required
                     />
                     <input 
                       type="number" 
                       step="0.01"
                       value={prodPrice}
                       onChange={(e) => setProdPrice(e.target.value)}
                       placeholder="PREÇO (R$)"
                       className="w-full bg-black border border-zinc-800 p-3 text-white outline-none focus:border-[#D31E24] text-[10px] font-bold uppercase"
                       required
                     />
                     <textarea 
                       value={prodDesc}
                       onChange={(e) => setProdDesc(e.target.value)}
                       placeholder="DESCRIÇÃO CURTA DO PRODUTO"
                       className="w-full bg-black border border-zinc-800 p-3 text-white outline-none focus:border-[#D31E24] text-[10px] font-bold uppercase min-h-[80px]"
                       required
                     />
                     
                     <label className="flex items-center justify-center w-full h-20 border border-zinc-800 border-dashed bg-black cursor-pointer hover:border-[#D31E24] hover:bg-zinc-900 transition-all">
                        <div className="text-center">
                           <i className="fa-solid fa-image text-zinc-600 mb-1"></i>
                           <p className="text-[8px] text-zinc-500 uppercase">FOTO DO PRODUTO</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setProdImg)} />
                     </label>
                   </div>

                   <button type="submit" className="w-full bg-[#D31E24] text-white py-4 font-orbitron font-black text-xs uppercase shadow-lg shadow-[#D31E24]/20">
                     ADICIONAR À LOJA
                   </button>
                </form>

                <div className="flex flex-col justify-center items-center">
                   <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-4">PREVIEW CARTÃO</p>
                   <div className="w-full max-w-[280px] bg-zinc-900 border border-zinc-800 group overflow-hidden">
                      <div className="aspect-square relative overflow-hidden bg-black">
                         {prodImg ? (
                           <img src={prodImg} alt="Preview" className="w-full h-full object-cover" />
                         ) : (
                           <div className="flex items-center justify-center h-full text-zinc-700">
                             <i className="fa-solid fa-box text-3xl"></i>
                           </div>
                         )}
                      </div>
                      <div className="p-4">
                         <h4 className="text-white font-bold text-sm uppercase mb-1">{prodName || 'NOME PRODUTO'}</h4>
                         <span className="text-[#D31E24] font-orbitron font-black text-lg">
                           R$ {prodPrice ? parseFloat(prodPrice).toFixed(2) : '0.00'}
                         </span>
                      </div>
                   </div>
                </div>
              </div>
            )}

            {/* VIEW: NETWORK MANAGEMENT */}
            {view === 'network' && (
              <div className="grid md:grid-cols-2 gap-12">
                <form onSubmit={handleAddNetwork} className="space-y-6">
                  <div className="mb-8">
                    <button type="button" onClick={() => setView('menu')} className="text-zinc-500 hover:text-white mb-4 text-xs">
                      <i className="fa-solid fa-arrow-left mr-2"></i> VOLTAR
                    </button>
                    <h3 className="text-[#D31E24] font-orbitron font-black text-xl uppercase">GERENCIAR<br/>REDE</h3>
                    <p className="text-zinc-500 text-[8px] uppercase tracking-[0.4em] mt-2">DADOS PERSISTENTES LOCAIS</p>
                  </div>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="CIDADE"
                      className="w-full bg-black border border-zinc-800 p-3 text-white outline-none focus:border-[#D31E24] text-xs font-bold uppercase"
                      required
                    />
                    <input 
                      type="text" 
                      maxLength={2}
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="UF (ESTADO)"
                      className="w-full bg-black border border-zinc-800 p-3 text-white outline-none focus:border-[#D31E24] text-xs font-bold uppercase"
                      required
                    />
                  </div>
                  <button type="submit" className="w-full bg-[#D31E24] text-white py-4 font-orbitron font-black text-xs uppercase shadow-lg shadow-[#D31E24]/20">
                    ADICIONAR À REDE
                  </button>
                </form>

                <div className="bg-black/50 border border-zinc-900 p-6 rounded-sm">
                   <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] text-white font-orbitron font-black uppercase">UNIDADES ATIVAS</span>
                      <span className="text-[10px] text-[#D31E24] font-black">{units.length}</span>
                   </div>
                   <div className="space-y-2 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                      {units.map((unit, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border border-zinc-800 bg-zinc-950/50">
                           <div>
                              <p className="text-[11px] font-orbitron font-black text-white uppercase">{unit.city}</p>
                              <p className="text-[8px] text-zinc-600 font-bold uppercase">{unit.state} // {unit.type === 'hq' ? 'MATRIZ' : 'PARCEIRO'}</p>
                           </div>
                           {unit.type !== 'hq' && (
                             <button onClick={() => onRemoveUnit(unit.city)} className="text-zinc-700 hover:text-[#D31E24] transition-colors p-2">
                                <i className="fa-solid fa-trash-can text-[10px]"></i>
                             </button>
                           )}
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            )}

            {/* VIEW: PROJECT MANAGEMENT */}
            {view === 'projects' && (
              <div className="grid md:grid-cols-2 gap-12">
                 <form onSubmit={handleAddProject} className="space-y-6">
                    <div className="mb-8">
                      <button type="button" onClick={() => setView('menu')} className="text-zinc-500 hover:text-white mb-4 text-xs">
                        <i className="fa-solid fa-arrow-left mr-2"></i> VOLTAR
                      </button>
                      <h3 className="text-[#D31E24] font-orbitron font-black text-xl uppercase">NOVO<br/>PROJETO</h3>
                      <p className="text-zinc-500 text-[8px] uppercase tracking-[0.4em] mt-2">ATUALIZAR PORTFÓLIO</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-[9px] text-zinc-500 font-bold uppercase block mb-2">NOME DO PROJETO</label>
                        <input 
                          type="text" 
                          value={projTitle}
                          onChange={(e) => setProjTitle(e.target.value)}
                          placeholder="EX: TRACK READY BMW"
                          className="w-full bg-black border border-zinc-800 p-3 text-white outline-none focus:border-[#D31E24] text-xs font-bold uppercase"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="text-[9px] text-zinc-500 font-bold uppercase block mb-2">STAGE / TIPO</label>
                        <input 
                          type="text" 
                          value={projType}
                          onChange={(e) => setProjType(e.target.value)}
                          placeholder="EX: STAGE 2 ELITE"
                          className="w-full bg-black border border-zinc-800 p-3 text-white outline-none focus:border-[#D31E24] text-xs font-bold uppercase"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-[9px] text-zinc-500 font-bold uppercase block mb-2">FOTO DO PROJETO</label>
                        <label className="flex items-center justify-center w-full h-24 border border-zinc-800 border-dashed bg-black cursor-pointer hover:border-[#D31E24] hover:bg-zinc-900 transition-all">
                           <div className="text-center">
                              <i className="fa-solid fa-upload text-zinc-600 mb-2"></i>
                              <p className="text-[8px] text-zinc-500 uppercase">CLIQUE PARA CARREGAR</p>
                           </div>
                           <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setProjImg)} />
                        </label>
                      </div>
                    </div>

                    <button type="submit" className="w-full bg-[#D31E24] text-white py-4 font-orbitron font-black text-xs uppercase shadow-lg shadow-[#D31E24]/20">
                      PUBLICAR NO SITE
                    </button>
                 </form>

                 <div className="flex flex-col justify-center items-center">
                    <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-4">PRÉ-VISUALIZAÇÃO</p>
                    <div className="w-full aspect-[3/4] bg-zinc-900 border border-zinc-800 rounded-sm relative overflow-hidden group">
                       {projImg ? (
                          <>
                            <img src={projImg} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-100"></div>
                            <div className="absolute top-6 right-6">
                              <span className="bg-[#D31E24] text-white text-[9px] font-black font-orbitron px-2 py-1 tracking-widest uppercase">
                                {projType || 'STAGE'}
                              </span>
                            </div>
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                              <h4 className="text-2xl font-orbitron font-black text-white mb-2 uppercase tracking-tighter">
                                {projTitle || 'NOME PROJETO'}
                              </h4>
                              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                                Engenharia de Precisão AK
                              </p>
                              <div className="mt-4 h-0.5 w-12 bg-[#D31E24]"></div>
                            </div>
                          </>
                       ) : (
                          <div className="flex items-center justify-center h-full text-zinc-700">
                             <i className="fa-solid fa-image text-4xl"></i>
                          </div>
                       )}
                    </div>
                 </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
