
export interface Vehicle {
  brand: string;
  model: string;
  engine: string;
  stockHP: number;
  stockTQ: number;
  engineCategory: 'aspirado' | 'turbo' | 'diesel';
  imageUrl: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Brand {
  name: string;
  logo: string;
}

export interface MapUnit {
  city: string;
  state: string;
  type: 'hq' | 'partner';
}

export interface Project {
  id: number;
  title: string;
  type: string;
  img: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}
