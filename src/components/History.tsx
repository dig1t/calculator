'use client';

import { useCalculator } from '@/context/CalculatorContext';
import { useTheme } from '@/context/ThemeContext';

export default function History() {
  const { history, clearHistory } = useCalculator();
  const { isDarkMode } = useTheme();

  return (
    <div className={`mt-8 p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">History</h2>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear
          </button>
        )}
      </div>
      
      {history.length === 0 ? (
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No calculations yet</p>
      ) : (
        <div className="space-y-3">
          {history.map((calc) => (
            <div
              key={calc.timestamp}
              className={`p-4 rounded shadow-sm ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
            >
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{calc.expression}</div>
              <div className="text-lg font-semibold mt-1">{calc.result}</div>
              <div className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {new Date(calc.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}