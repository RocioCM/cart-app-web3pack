'use client';

import {useState} from 'react';
import Image from 'next/image';
import {useCart} from '@/contexts/CartContext';

export function Cart() {
  const {cartItems, totalItems, totalPrice, removeItem, clearCart} = useCart();
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

  const handleConfirmOrder = () => {
    setShowOrderConfirmation(true);
  };

  const handleStartNewOrder = () => {
    clearCart();
    setShowOrderConfirmation(false);
  };

  return (
    <div className="bg-white shadow-sm rounded-2xl p-6 h-max max-h-full flex flex-col">
      <h2 className="text-2xl font-bold text-red mb-6">
        Your Cart ({totalItems})
      </h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-4">
          <Image
            src="/assets/illustration-empty-cart.svg"
            alt="Empty cart"
            width={128}
            height={128}
          />
          <p className="text-rose-900 text-center">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col flex-1 overflow-auto">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between py-4 border-b border-rose-100"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-rose-900">
                    {item.product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-red font-semibold mr-2">
                      {item.quantity}x
                    </span>
                    <span className="text-rose-500">
                      @ ${item.product.price.toFixed(2)}
                    </span>
                    <span className="font-semibold text-rose-500">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="shrink-0 flex items-center justify-center w-5 h-5 p-[3px] rounded-full border-2 border-rose-300 hover:border-rose-900 hover:brightness-0 transition-all cursor-pointer"
                >
                  <Image
                    src="/assets/icon-remove-item.svg"
                    alt="Remove item"
                    width={10}
                    height={10}
                    className="w-full h-full object-contain"
                  />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between py-4">
            <span className="text-rose-900">Order Total</span>
            <span className="text-2xl font-bold text-rose-900">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="bg-rose-50 rounded-lg my-4 p-4 flex justify-center items-center gap-2">
            <Image
              src="/assets/icon-carbon-neutral.svg"
              alt="Carbon neutral"
              width={20}
              height={20}
            />
            <p className="text-rose-900 text-sm">
              This is a <strong>carbon-neutral</strong> delivery
            </p>
          </div>

          <button
            onClick={handleConfirmOrder}
            className="w-full bg-red text-white font-medium py-4 rounded-full hover:bg-red-800 transition-colors cursor-pointer"
          >
            Confirm Order
          </button>
        </>
      )}

      {/* Order Confirmation Modal */}
      {showOrderConfirmation && (
        <div className="fixed inset-0 bg-[#11111170] flex items-end sm:items-center justify-center z-50 animate__animated animate__fadeIn animate__faster">
          <div className="flex flex-col gap-6 bg-white rounded-t-2xl sm:rounded-xl p-8 sm:max-w-lg w-full max-h-[90vh] animate__animated animate__zoomIn animate__faster">
            <div>
              <Image
                src="/assets/icon-order-confirmed.svg"
                alt="Order confirmed"
                width={48}
                height={48}
                className="mb-4 -ml-0.5"
              />
              <h2 className="text-3xl font-bold text-rose-900 mb-2">
                Order <br className="sm:hidden" /> Confirmed
              </h2>
              <p className="text-rose-500">We hope you enjoy your food!</p>
            </div>

            <div className="bg-rose-50 rounded-lg p-4 flex-1 overflow-auto">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4 py-3 border-b border-rose-100 last:border-b-0"
                >
                  <Image
                    src={item.product.image.thumbnail}
                    alt={item.product.name}
                    width={48}
                    height={48}
                    className="rounded flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-rose-900 truncate">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="text-red font-semibold">
                        {item.quantity}x
                      </span>
                      <span className="text-rose-500">
                        @ ${item.product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <span className="font-semibold text-rose-900 flex-shrink-0">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-rose-900 font-semibold">Order Total</span>
              <span className="text-2xl font-bold text-rose-900">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleStartNewOrder}
              className="w-full bg-red text-white font-semibold mt-2 p-4 rounded-full hover:bg-red-800 cursor-pointer transition-colors"
            >
              Start New Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
