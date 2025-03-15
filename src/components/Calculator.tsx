'use client';

import { useCalculator } from '@/context/CalculatorContext';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';

export default function Calculator() {
  const { display, setDisplay, addToHistory } = useCalculator();
  const { isDarkMode } = useTheme();
  const [expression, setExpression] = useState('');

  const handleNumber = (num: string) => {
    if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    setDisplay(display + ' ' + op + ' ');
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
  };

  const handleCalculate = () => {
    try {
      const result = eval(display).toString();
      addToHistory({
        expression: display,
        result,
        timestamp: Date.now(),
      });
      setExpression(display);
      setDisplay(result);
    } catch {
      setDisplay('Error');
    }
  };

  return (
    <div className={`p-6 rounded-2xl shadow-2xl ${
      isDarkMode 
        ? 'bg-gray-800 text-white bg-opacity-90' 
        : 'bg-white text-gray-800'
    }`}>
      <div className={`mb-6 p-6 rounded-xl ${
        isDarkMode 
          ? 'bg-gray-900' 
          : 'bg-gray-50'
      }`}>
        <div className={`text-sm h-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {expression}
        </div>
        <div className="text-4xl font-light tracking-wider text-right">
          {display}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        <button 
          onClick={handleClear} 
          className="col-span-2 p-4 bg-gradient-to-br from-red-400 to-red-500 text-white rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-200 text-lg font-medium shadow-lg shadow-red-500/20 cursor-pointer"
        >
          AC
        </button>
        {['÷', '×'].map((op) => (
          <button 
            key={op}
            onClick={() => handleOperator(op === '÷' ? '/' : '*')} 
            className="p-4 bg-gradient-to-br from-orange-400 to-orange-500 text-white rounded-xl hover:from-orange-500 hover:to-orange-600 transition-all duration-200 text-xl font-medium shadow-lg shadow-orange-500/20 cursor-pointer"
          >
            {op}
          </button>
        ))}
        
        {[7, 8, 9, '-', 4, 5, 6, '+', 1, 2, 3, '='].map((item) => (
          <button
            key={item}
            onClick={() => {
              if (typeof item === 'number') handleNumber(item.toString());
              else if (item === '=') handleCalculate();
              else handleOperator(item);
            }}
            className={`p-4 rounded-xl transition-all duration-200 text-lg font-medium cursor-pointer ${
              typeof item === 'string' && item !== '=' 
                ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600 shadow-lg shadow-orange-500/20'
                : item === '='
                ? 'row-span-2 bg-gradient-to-br from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600 shadow-lg shadow-orange-500/20'
                : isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-white shadow-lg shadow-gray-900/30'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800 shadow-lg shadow-gray-200/50'
            }`}
          >
            {item}
          </button>
        ))}
        
        <button
          onClick={() => handleNumber('0')}
          className={`col-span-2 p-4 rounded-xl transition-all duration-200 text-lg font-medium cursor-pointer ${
            isDarkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-white shadow-lg shadow-gray-900/30'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800 shadow-lg shadow-gray-200/50'
          }`}
        >
          0
        </button>
        <button
          onClick={() => handleNumber('.')}
          className={`p-4 rounded-xl transition-all duration-200 text-lg font-medium cursor-pointer ${
            isDarkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-white shadow-lg shadow-gray-900/30'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800 shadow-lg shadow-gray-200/50'
          }`}
        >
          .
        </button>
      </div>
    </div>
  );
}