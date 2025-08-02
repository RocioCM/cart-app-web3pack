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
    <div className="grid grid-cols-1 tablet:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
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
