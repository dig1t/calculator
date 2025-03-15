'use client';

import Calculator from '@/components/Calculator';
import History from '@/components/History';
import { useTheme } from '@/context/ThemeContext';

export default function Home() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <main className="container mx-auto px-4 py-6 sm:py-8 max-w-lg">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Calculator</h1>
        <button
          onClick={toggleTheme}
          className="p-2 sm:p-3 rounded-lg bg-orange-500 text-white hover:bg-orange-600 text-base sm:text-lg"
        >
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
      
      <div>
        <Calculator />
        <History />
      </div>
    </main>
  );
}
