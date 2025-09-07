import type { Product } from './product.js';

export interface CartItem {
    id: string;
    product: Product;
    quantity: number;
}
