import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Product } from '../types/product.js';
import type { CartItem } from '../types/cart.js';

interface CartState {
    items: CartItem[];
    total: number;
}

type CartAction =
    | { type: 'ADD_TO_CART'; payload: Product }
    | { type: 'REMOVE_FROM_CART'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' };

interface CartContextType extends CartState {
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItem = state.items.find(item => item.product.id === action.payload.id);

            if (existingItem) {
                const updatedItems = state.items.map(item =>
                    item.product.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                return {
                    items: updatedItems,
                    total: updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
                };
            }

            const newItems = [...state.items, { id: action.payload.id, product: action.payload, quantity: 1 }];
            return {
                items: newItems,
                total: newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
            };
        }

        case 'REMOVE_FROM_CART': {
            const filteredItems = state.items.filter(item => item.product.id !== action.payload);
            return {
                items: filteredItems,
                total: filteredItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
            };
        }

        case 'UPDATE_QUANTITY': {
            if (action.payload.quantity <= 0) {
                const filteredItems = state.items.filter(item => item.product.id !== action.payload.id);
                return {
                    items: filteredItems,
                    total: filteredItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
                };
            }

            const updatedItems = state.items.map(item =>
                item.product.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
            return {
                items: updatedItems,
                total: updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
            };
        }

        case 'CLEAR_CART':
            return { items: [], total: 0 };

        default:
            return state;
    }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

    const addToCart = (product: Product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeFromCart = (productId: string) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    const updateQuantity = (productId: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                ...state,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                itemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
