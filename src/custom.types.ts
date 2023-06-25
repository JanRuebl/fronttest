export interface Product {
  description: string;
  category: string;
  color: string;
}
export interface Products {
  [key: string]: Product;
}
