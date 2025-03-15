'use client';

import { useCalculator } from '@/context/CalculatorContext';
import { useTheme } from '@/context/ThemeContext';

export default function History() {
  const { history, clearHistory } = useCalculator();
  const { isDarkMode } = useTheme();

  return (
    <div className={`mt-8 md:mt-0 p-6 rounded-2xl shadow-2xl ${
      isDarkMode 
        ? 'bg-gray-800 text-white bg-opacity-90' 
        : 'bg-white text-gray-800'
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">History</h2>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="px-4 py-2 text-sm bg-gradient-to-br from-red-400 to-red-500 text-white rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-200 cursor-pointer shadow-lg shadow-red-500/20"
          >
            Clear
          </button>
        )}
      </div>
      
      {history.length === 0 ? (
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No calculations yet</p>
      ) : (
        <div className="space-y-3 max-h-[calc(100vh-16rem)] overflow-y-auto">
          {history.map((calc) => (
            <div
              key={calc.timestamp}
              className={`p-4 rounded-xl ${
                isDarkMode 
                  ? 'bg-gray-900' 
                  : 'bg-gray-50'
              }`}
            >
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {calc.expression}
              </div>
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