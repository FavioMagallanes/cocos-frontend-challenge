export interface Instruments {
  id: number;
  ticker: string;
  name: string;
  type: Type;
  last_price: number;
  close_price: number;
}

export enum Type {
  Acciones = "ACCIONES",
  Moneda = "MONEDA",
}

export interface Portfolio {
  instrument_id: number;
  ticker: string;
  quantity: number;
  last_price: number;
  close_price: number;
  avg_cost_price: number;
}

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order {
  items: OrderItem[];
  total: number;
}

export interface OrderResponse {
  id: string;
  items: OrderItem[];
  total: number;
}

export interface Search {
  id: number;
  ticker: string;
  name: string;
  type: string;
  last_price: number;
  close_price: number;
}
