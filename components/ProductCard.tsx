'use client';

import {Product} from '@/types/product';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  currentCount: number;
  onAddToCart: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function ProductCard({
  product,
  currentCount,
  onAddToCart,
  onIncrement,
  onDecrement,
}: ProductCardProps) {
  return (
    <div className="h-max w-max flex flex-col gap-10">
      {/* Product Image */}
      <div className="relative">
        <div
          className={`rounded-lg overflow-hidden border-2 transition-colors ${
            currentCount > 0 ? 'border-red' : 'border-transparent'
          }`}
        >
          <Image
            src={product.image.desktop}
            alt={product.name}
            width={250}
            height={240}
            className="w-full h-60 object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Add to Cart Button or Counter */}
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2">
          {currentCount === 0 ? (
            <button
              onClick={onAddToCart}
              className="flex items-center gap-2 bg-white border border-rose-400 rounded-full px-6 py-3 hover:border-red hover:text-red transition-colors font-semibold"
            >
              <Image
                src="/assets/icon-add-to-cart.svg"
                alt="Add to cart"
                width={20}
                height={20}
              />
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center bg-red rounded-full px-3 py-3 text-white font-semibold min-w-[160px]">
              <button
                onClick={onDecrement}
                className="flex items-center justify-center w-5 h-5 rounded-full border border-white hover:bg-white hover:text-red transition-colors"
              >
                <Image
                  src="/assets/icon-decrement-quantity.svg"
                  alt="Decrease quantity"
                  width={10}
                  height={2}
                />
              </button>
              <span className="flex-1 text-center">{currentCount}</span>
              <button
                onClick={onIncrement}
                className="flex items-center justify-center w-5 h-5 rounded-full border border-white hover:bg-white hover:text-red transition-colors"
              >
                <Image
                  src="/assets/icon-increment-quantity.svg"
                  alt="Increase quantity"
                  width={10}
                  height={10}
                />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-0.5">
        <p className="text-sm opacity-60">{product.category}</p>
        <h3 className="font-bold">{product.name}</h3>
        <p className="text-rose-500 font-bold">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
