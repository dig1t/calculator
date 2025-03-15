'use client';

import { useCalculator } from '@/context/CalculatorContext';
import { useTheme } from '@/context/ThemeContext';

export default function History() {
  const { history, clearHistory } = useCalculator();
  const { isDarkMode } = useTheme();

  return (
    <div className={`mt-8 p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">History</h2>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear
          </button>
        )}
      </div>
      
      {history.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No calculations yet</p>
      ) : (
        <div className="space-y-2">
          {history.map((calc, index) => (
            <div
              key={calc.timestamp}
              className="p-3 rounded bg-gray-100 dark:bg-gray-700"
            >
              <div className="text-sm text-gray-500 dark:text-gray-400">{calc.expression}</div>
              <div className="text-lg font-semibold">{calc.result}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500">
                {new Date(calc.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}