
import React, { useState } from 'react';
import { Product } from '../types';

interface ShopModalProps {
  onClose: () => void;
  products: Product[];
}

type ShopView = 'grid' | 'checkout' | 'payment';

// Função auxiliar para calcular o CRC16 para o padrão PIX
const calculateCRC16 = (payload: string): string => {
  let crc = 0xFFFF;
  const polynomial = 0x1021;
  
  for (let i = 0; i < payload.length; i++) {
    crc ^= (payload.charCodeAt(i) << 8);
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ polynomial);
      } else {
        crc = (crc << 1);
      }
    }
  }
  
  crc &= 0xFFFF;
  return crc.toString(16).toUpperCase().padStart(4, '0');
};

const generatePixPayload = (key: string, name: string, city: string, amount: string, txId: string = '***'): string => {
  // Funções auxiliares para formatar os campos
  const formatField = (id: string, value: string) => {
    const len = value.length.toString().padStart(2, '0');
    return `${id}${len}${value}`;
  };

  // Montagem do Payload PIX (Padrão BR Code)
  // 00 - Payload Format Indicator (01)
  // 26 - Merchant Account Information (GUI, Key, etc)
  // 52 - Merchant Category Code (0000 - General)
  // 53 - Transaction Currency (986 - BRL)
  // 54 - Transaction Amount
  // 58 - Country Code (BR)
  // 59 - Merchant Name
  // 60 - Merchant City
  // 62 - Additional Data Field Template (TxID)
  // 63 - CRC16

  const merchantAccount = formatField('00', 'br.gov.bcb.pix') + formatField('01', key);
  
  let payload = 
    formatField('00', '01') +
    formatField('26', merchantAccount) +
    formatField('52', '0000') +
    formatField('53', '986') +
    formatField('54', amount) +
    formatField('58', 'BR') +
    formatField('59', name.substring(0, 25)) + // Max 25 chars
    formatField('60', city.substring(0, 15)) + // Max 15 chars
    formatField('62', formatField('05', txId));

  payload += '6304'; // Adiciona o ID do CRC16 e o tamanho

  const crc = calculateCRC16(payload);
  return payload + crc;
};

export const ShopModal: React.FC<ShopModalProps> = ({ onClose, products }) => {
  const [view, setView] = useState<ShopView>('grid');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Checkout Form State
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');

  // Payment State
  const [pixPayload, setPixPayload] = useState('');

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setView('checkout');
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !name || !cpf || !address || !zip) return;

    // Gerar Payload PIX
    // Chave fixa conforme solicitado: 77886771249
    // Valor baseado no produto
    const amountStr = selectedProduct.price.toFixed(2);
    const payload = generatePixPayload(
      '77886771249', 
      'AK PERFORMANCE', 
      'VILHENA', 
      amountStr, 
      `AK${Date.now().toString().slice(-6)}` // TxId simples
    );

    setPixPayload(payload);
    setView('payment');
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixPayload);
    alert('Código PIX copiado!');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-5xl relative animate-in zoom-in duration-300">
        
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 md:-right-8 text-zinc-400 hover:text-[#D31E24] transition-colors p-2"
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest">Fechar</span>
            <i className="fa-solid fa-xmark text-2xl"></i>
          </div>
        </button>

        <div className="bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden rounded-sm min-h-[600px] flex flex-col">
          {/* Header */}
          <div className="p-8 border-b border-zinc-900 flex justify-between items-center bg-black/50">
             <div>
                <h2 className="text-3xl font-orbitron font-black text-white uppercase">AK SHOP <span className="text-[#D31E24]">ONLINE</span></h2>
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">Produtos Oficiais & Performance Parts</p>
             </div>
             {view !== 'grid' && (
               <button onClick={() => setView('grid')} className="text-zinc-500 hover:text-white text-xs font-bold uppercase">
                 <i className="fa-solid fa-arrow-left mr-2"></i> Voltar à Loja
               </button>
             )}
          </div>

          <div className="p-8 flex-grow overflow-y-auto custom-scrollbar">
            
            {/* VIEW 1: PRODUCT GRID */}
            {view === 'grid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {products.map(product => (
                   <div key={product.id} className="group bg-black border border-zinc-800 hover:border-[#D31E24] transition-all flex flex-col">
                      <div className="aspect-[4/3] overflow-hidden relative">
                         <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-100" />
                         <div className="absolute top-4 right-4 bg-[#D31E24] text-white font-orbitron font-bold text-xs px-2 py-1 shadow-lg">
                           R$ {product.price.toFixed(2)}
                         </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                         <h3 className="text-white font-bold uppercase text-sm mb-2">{product.name}</h3>
                         <p className="text-zinc-500 text-xs mb-6 flex-grow">{product.description}</p>
                         <button 
                           onClick={() => handleSelectProduct(product)}
                           className="w-full bg-white text-black hover:bg-[#D31E24] hover:text-white py-3 font-orbitron font-black text-[10px] uppercase tracking-widest transition-all"
                         >
                           COMPRAR AGORA
                         </button>
                      </div>
                   </div>
                 ))}
                 
                 {products.length === 0 && (
                   <div className="col-span-full text-center py-20">
                     <i className="fa-solid fa-box-open text-zinc-700 text-6xl mb-4"></i>
                     <p className="text-zinc-500 uppercase font-bold">Nenhum produto disponível no momento.</p>
                   </div>
                 )}
              </div>
            )}

            {/* VIEW 2: CHECKOUT FORM */}
            {view === 'checkout' && selectedProduct && (
               <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
                  <div>
                     <h3 className="text-[#D31E24] font-orbitron font-bold uppercase text-lg mb-6">Resumo do Pedido</h3>
                     <div className="bg-zinc-900 border border-zinc-800 p-6 flex gap-4 items-start">
                        <img src={selectedProduct.image} alt={selectedProduct.name} className="w-24 h-24 object-cover border border-zinc-700" />
                        <div>
                           <h4 className="text-white font-bold uppercase text-sm">{selectedProduct.name}</h4>
                           <p className="text-zinc-500 text-xs mt-1 mb-2">{selectedProduct.description}</p>
                           <span className="text-[#D31E24] font-orbitron font-black text-xl">R$ {selectedProduct.price.toFixed(2)}</span>
                        </div>
                     </div>
                     <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-sm">
                        <p className="text-yellow-500 text-xs flex gap-2">
                           <i className="fa-solid fa-circle-info mt-0.5"></i>
                           Pagamento exclusivo via PIX. O QR Code será gerado na próxima etapa.
                        </p>
                     </div>
                  </div>

                  <form onSubmit={handleCheckout} className="space-y-4">
                     <h3 className="text-white font-orbitron font-bold uppercase text-lg mb-6">Seus Dados</h3>
                     
                     <div className="space-y-4">
                        <div>
                           <label className="text-[10px] text-zinc-500 font-bold uppercase block mb-2">Nome Completo</label>
                           <input 
                             required
                             type="text" 
                             value={name}
                             onChange={e => setName(e.target.value)}
                             className="w-full bg-black border border-zinc-800 p-3 text-white outline-none focus:border-[#D31E24] text-xs font-bold uppercase"
                           />
                        </div>
                        <div>
                           <label className="text-[10px] text-zinc-500 font-bold uppercase block mb-2">CPF</label>
                           <input 
                             required
                             type="text" 
                             value={cpf}
                             onChange={e => setCpf(e.target.value)}
                             placeholder="000.000.000-00"
                             className="w-full bg-black border border-zinc-800 p-3 text-white outline-none focus:border-[#D31E24] text-xs font-bold uppercase"
                           />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <label className="text-[10px] text-zinc-500 font-bold uppercase block mb-2">CEP</label>
                              <input 
                                required
                                type="text" 
                                value={zip}
                                onChange={e => setZip(e.target.value)}
                                placeholder="00000-000"
                                className="w-full bg-black border border-zinc-800 p-3 text-white outline-none focus:border-[#D31E24] text-xs font-bold uppercase"
                              />
                           </div>
                           <div className="flex items-end">
                              <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank" className="text-[10px] text-zinc-500 hover:text-[#D31E24] underline mb-4 ml-2">Não sei meu CEP</a>
                           </div>
                        </div>
                        <div>
                           <label className="text-[10px] text-zinc-500 font-bold uppercase block mb-2">Endereço Completo</label>
                           <input 
                             required
                             type="text" 
                             value={address}
                             onChange={e => setAddress(e.target.value)}
                             placeholder="Rua, Número, Bairro, Cidade - UF"
                             className="w-full bg-black border border-zinc-800 p-3 text-white outline-none focus:border-[#D31E24] text-xs font-bold uppercase"
                           />
                        </div>
                     </div>

                     <button type="submit" className="w-full bg-[#D31E24] text-white py-4 mt-4 font-orbitron font-black text-sm uppercase shadow-lg shadow-[#D31E24]/20 hover:bg-white hover:text-black transition-all">
                       GERAR PIX PARA PAGAMENTO
                     </button>
                  </form>
               </div>
            )}

            {/* VIEW 3: PAYMENT QR CODE */}
            {view === 'payment' && selectedProduct && (
               <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-500">
                  <div className="w-20 h-20 bg-[#D31E24] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(211,30,36,0.4)]">
                     <i className="fa-brands fa-pix text-white text-4xl"></i>
                  </div>
                  
                  <h3 className="text-3xl font-orbitron font-black text-white uppercase mb-2">Pagamento Gerado</h3>
                  <p className="text-zinc-500 uppercase font-bold text-xs tracking-widest mb-8">Escaneie o QR Code abaixo para finalizar</p>

                  <div className="bg-white p-4 rounded-sm mb-8">
                     {/* Usando uma API pública para gerar a imagem do QR Code baseada no payload PIX */}
                     <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixPayload)}`} 
                        alt="QR Code PIX" 
                        className="w-64 h-64"
                     />
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-sm max-w-md w-full mb-8">
                     <p className="text-zinc-500 text-[10px] uppercase font-bold mb-2">Código Copia e Cola</p>
                     <div className="flex gap-2">
                        <input 
                          readOnly 
                          value={pixPayload} 
                          className="bg-black border border-zinc-800 text-zinc-400 text-[10px] w-full p-2 outline-none"
                        />
                        <button onClick={handleCopyPix} className="bg-[#D31E24] text-white px-4 py-2 font-bold text-xs hover:bg-white hover:text-black transition-all">
                           COPIAR
                        </button>
                     </div>
                  </div>

                  <div className="text-left max-w-md w-full border-t border-zinc-800 pt-6">
                     <div className="flex justify-between mb-2">
                        <span className="text-zinc-500 text-xs uppercase">Beneficiário</span>
                        <span className="text-white text-xs font-bold uppercase">AK PERFORMANCE</span>
                     </div>
                     <div className="flex justify-between mb-2">
                        <span className="text-zinc-500 text-xs uppercase">Chave PIX</span>
                        <span className="text-white text-xs font-bold">77886771249</span>
                     </div>
                     <div className="flex justify-between pt-2 border-t border-zinc-800 mt-2">
                        <span className="text-zinc-500 text-xs uppercase font-bold">Valor Total</span>
                        <span className="text-[#D31E24] text-xl font-orbitron font-black">R$ {selectedProduct.price.toFixed(2)}</span>
                     </div>
                  </div>

                  <button 
                     onClick={onClose} 
                     className="mt-12 text-zinc-500 hover:text-white text-xs uppercase font-bold tracking-widest"
                  >
                     Fechar Pedido
                  </button>
               </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
