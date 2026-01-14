
import { Vehicle, Service, Brand, MapUnit, Project, Product } from './types';

export const BRANDS: Brand[] = [
  { name: 'Volkswagen', logo: 'https://cdn.simpleicons.org/volkswagen/ffffff' },
  { name: 'BMW', logo: 'https://cdn.simpleicons.org/bmw/ffffff' },
  { name: 'Toyota', logo: 'https://cdn.simpleicons.org/toyota/ffffff' },
  { name: 'Ford', logo: 'https://cdn.simpleicons.org/ford/ffffff' },
  { name: 'Audi', logo: 'https://cdn.simpleicons.org/audi/ffffff' },
  { name: 'Mercedes', logo: 'https://cdn.simpleicons.org/mercedes/ffffff' },
  { name: 'Chevrolet', logo: 'https://cdn.simpleicons.org/chevrolet/ffffff' },
  { name: 'Mitsubishi', logo: 'https://cdn.simpleicons.org/mitsubishi/ffffff' }
];

export const INITIAL_UNITS: MapUnit[] = [
  { city: 'Vilhena', state: 'RO', type: 'hq' },
  { city: 'São Paulo', state: 'SP', type: 'partner' },
  { city: 'Curitiba', state: 'PR', type: 'partner' },
  { city: 'Brasília', state: 'DF', type: 'partner' },
  { city: 'Cuiabá', state: 'MT', type: 'partner' },
];

export const INITIAL_PROJECTS: Project[] = [
  { id: 1, title: 'Sport Performance', type: 'Stage 2+', img: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Luxury Comfort', type: 'Custom Remap', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Track Ready', type: 'Full Build', img: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Off-Road 4x4', type: 'Torque Plus', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800' }
];

export const INITIAL_PRODUCTS: Product[] = [];

export const VEHICLES: Vehicle[] = [
  // VOLKSWAGEN
  {
    brand: 'Volkswagen',
    model: 'Amarok V6',
    engine: '3.0 TDI V6',
    stockHP: 258,
    stockTQ: 59.1,
    engineCategory: 'diesel',
    imageUrl: 'https://images.unsplash.com/photo-1621252327266-963098f98a39?auto=format&fit=crop&q=80&w=1200'
  },
  {
    brand: 'Volkswagen',
    model: 'Golf GTI MK7.5',
    engine: '2.0 TSI',
    stockHP: 230,
    stockTQ: 35.7,
    engineCategory: 'turbo',
    imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c15d?auto=format&fit=crop&q=80&w=1200'
  },
  {
    brand: 'Volkswagen',
    model: 'Polo GTS',
    engine: '1.4 250 TSI',
    stockHP: 150,
    stockTQ: 25.5,
    engineCategory: 'turbo',
    imageUrl: 'https://images.unsplash.com/photo-1517524008436-bbdb53c57d59?auto=format&fit=crop&q=80&w=1200'
  },
  
  // BMW
  {
    brand: 'BMW',
    model: '320i G20',
    engine: '2.0 B48 Turbo',
    stockHP: 184,
    stockTQ: 30.6,
    engineCategory: 'turbo',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200'
  },
  {
    brand: 'BMW',
    model: 'M3 Competition',
    engine: '3.0 S58 Bi-Turbo',
    stockHP: 510,
    stockTQ: 66.3,
    engineCategory: 'turbo',
    imageUrl: 'https://images.unsplash.com/photo-1619362224246-3848ff4b4b4d?auto=format&fit=crop&q=80&w=1200'
  },

  // TOYOTA
  {
    brand: 'Toyota',
    model: 'Hilux SRX',
    engine: '2.8 Turbo Diesel',
    stockHP: 204,
    stockTQ: 50.9,
    engineCategory: 'diesel',
    imageUrl: 'https://images.unsplash.com/photo-1618335829737-2228ad3088bc?auto=format&fit=crop&q=80&w=1200'
  },
  {
    brand: 'Toyota',
    model: 'Corolla GR',
    engine: '1.6 Turbo',
    stockHP: 304,
    stockTQ: 37.7,
    engineCategory: 'turbo',
    imageUrl: 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?auto=format&fit=crop&q=80&w=1200'
  },

  // FORD
  {
    brand: 'Ford',
    model: 'Ranger V6',
    engine: '3.0 V6 Diesel',
    stockHP: 250,
    stockTQ: 61.2,
    engineCategory: 'diesel',
    imageUrl: 'https://images.unsplash.com/photo-1616422285623-13ff0167c95c?auto=format&fit=crop&q=80&w=1200'
  },

  // AUDI
  {
    brand: 'Audi',
    model: 'RS3 Sedan',
    engine: '2.5 TFSI 5cil',
    stockHP: 400,
    stockTQ: 51.0,
    engineCategory: 'turbo',
    imageUrl: 'https://images.unsplash.com/photo-1606152424101-dd29bc144ed8?auto=format&fit=crop&q=80&w=1200'
  },

  // CHEVROLET
  {
    brand: 'Chevrolet',
    model: 'S10 High Country',
    engine: '2.8 CTDI Diesel',
    stockHP: 200,
    stockTQ: 51.0,
    engineCategory: 'diesel',
    imageUrl: 'https://images.unsplash.com/photo-1620311394340-979927b87827?auto=format&fit=crop&q=80&w=1200'
  },

  // MITSUBISHI
  {
    brand: 'Mitsubishi',
    model: 'L200 Triton Sport',
    engine: '2.4 Diesel',
    stockHP: 190,
    stockTQ: 43.9,
    engineCategory: 'diesel',
    imageUrl: 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?auto=format&fit=crop&q=80&w=1200'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'remap',
    title: 'Remapeamento ECU',
    description: 'Otimização de software para ganho de potência, torque e eficiência de combustível sem comprometer a vida útil do motor.',
    icon: 'fa-microchip'
  },
  {
    id: 'stage',
    title: 'Preparação Stages',
    description: 'Projetos completos do Stage 1 ao Stage 4, incluindo upgrades de hardware como turbinas, intercoolers e intake.',
    icon: 'fa-gauge-high'
  },
  {
    id: 'mecanica',
    title: 'Mecânica Premium',
    description: 'Manutenção preventiva e corretiva especializada para veículos nacionais e importados de alta performance.',
    icon: 'fa-wrench'
  },
  {
    id: 'escapamento',
    title: 'Downpipe & Escape',
    description: 'Fabricação de sistemas de escapamento em Inox 304 com solda TIG para melhor fluxo e ronco esportivo.',
    icon: 'fa-wind'
  }
];
