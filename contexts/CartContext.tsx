'use client';

import {createContext, useContext, useState, ReactNode} from 'react';
import {Product} from '@/types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  incrementItem: (productId: number) => void;
  decrementItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({children}: {children: ReactNode}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? {...item, quantity: item.quantity + 1}
            : item
        );
      }
      return [...prev, {product, quantity: 1}];
    });
  };

  const incrementItem = (productId: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? {...item, quantity: item.quantity + 1}
          : item
      )
    );
  };

  const decrementItem = (productId: number) => {
    setCartItems((prev) => {
      return prev.reduce<CartItem[]>((acc, item) => {
        if (item.product.id === productId) {
          if (item.quantity > 1) {
            acc.push({...item, quantity: item.quantity - 1});
          }
          // If quantity becomes 0, item is removed (not added to acc)
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    });
  };

  const removeItem = (productId: number) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getItemQuantity = (productId: number) => {
    const item = cartItems.find((item) => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        totalPrice,
        addToCart,
        incrementItem,
        decrementItem,
        removeItem,
        clearCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return (
    context || {
      cartItems: [],
      totalItems: 0,
      totalPrice: 0,
      addToCart: () => {},
      incrementItem: () => {},
      decrementItem: () => {},
      removeItem: () => {},
      clearCart: () => {},
      getItemQuantity: () => 0,
    }
  );
}
