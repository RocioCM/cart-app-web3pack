import type {Metadata} from 'next';
import {Red_Hat_Text} from 'next/font/google';
import './globals.css';
import 'animate.css';

const redHatText = Red_Hat_Text({
  variable: '--font-red-hat-text',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Desserts Shop',
  description: 'A delightful collection of desserts',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${redHatText.variable} antialiased`}>{children}</body>
    </html>
  );
}
