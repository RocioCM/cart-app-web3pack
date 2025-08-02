'use client';

import {Product} from '@/types/product';
import {ProductCard} from './ProductCard';
import {useCart} from '@/contexts/CartContext';

interface ProductsListProps {
  products: Product[];
}

export function ProductsList({products}: ProductsListProps) {
  const {addToCart, incrementItem, decrementItem, getItemQuantity} = useCart();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          currentCount={getItemQuantity(product.id)}
          onAddToCart={() => addToCart(product)}
          onIncrement={() => incrementItem(product.id)}
          onDecrement={() => decrementItem(product.id)}
        />
      ))}
    </div>
  );
}
