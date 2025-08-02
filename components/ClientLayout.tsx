'use client';

import {CartProvider} from '@/contexts/CartContext';

export function ClientLayout({children}: {children: React.ReactNode}) {
  return <CartProvider>{children}</CartProvider>;
}
