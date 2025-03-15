'use client';

import Calculator from '@/components/Calculator';
import History from '@/components/History';
import { useTheme } from '@/context/ThemeContext';

export default function Home() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Calculator</h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
        >
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
      
      <div className="max-w-md mx-auto">
        <Calculator />
        <History />
      </div>
    </main>
  );
}
