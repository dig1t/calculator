import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { CalculatorProvider } from '@/context/CalculatorContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Calculator App',
  description: 'A modern calculator app with dark mode and history',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200`}>
        <ThemeProvider>
          <CalculatorProvider>
            {children}
          </CalculatorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
