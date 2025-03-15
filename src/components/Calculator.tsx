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
    <div className={`p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className={`mb-4 p-4 rounded shadow-inner ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
        <div className={`text-sm h-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{expression}</div>
        <div className="text-3xl font-bold">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        <button onClick={handleClear} className="col-span-2 p-4 bg-red-500 text-white rounded hover:bg-red-600 text-lg sm:text-xl">
          AC
        </button>
        <button onClick={() => handleOperator('/')} className="p-4 bg-orange-500 text-white rounded hover:bg-orange-600 text-lg sm:text-xl">
          ÷
        </button>
        <button onClick={() => handleOperator('*')} className="p-4 bg-orange-500 text-white rounded hover:bg-orange-600 text-lg sm:text-xl">
          ×
        </button>
        
        {[7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(num.toString())}
            className={`p-4 rounded hover:bg-gray-100 shadow-sm text-lg sm:text-xl ${
              isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-white hover:bg-gray-50 text-gray-800'
            }`}
          >
            {num}
          </button>
        ))}
        <button onClick={() => handleOperator('-')} className="p-4 bg-orange-500 text-white rounded hover:bg-orange-600 text-lg sm:text-xl">
          -
        </button>
        
        {[4, 5, 6].map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(num.toString())}
            className={`p-4 rounded hover:bg-gray-100 shadow-sm text-lg sm:text-xl ${
              isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-white hover:bg-gray-50 text-gray-800'
            }`}
          >
            {num}
          </button>
        ))}
        <button onClick={() => handleOperator('+')} className="p-4 bg-orange-500 text-white rounded hover:bg-orange-600 text-lg sm:text-xl">
          +
        </button>
        
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(num.toString())}
            className={`p-4 rounded hover:bg-gray-100 shadow-sm text-lg sm:text-xl ${
              isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-white hover:bg-gray-50 text-gray-800'
            }`}
          >
            {num}
          </button>
        ))}
        <button onClick={handleCalculate} className="row-span-2 p-4 bg-orange-500 text-white rounded hover:bg-orange-600 text-lg sm:text-xl">
          =
        </button>
        
        <button
          onClick={() => handleNumber('0')}
          className={`col-span-2 p-4 rounded hover:bg-gray-100 shadow-sm text-lg sm:text-xl ${
            isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-white hover:bg-gray-50 text-gray-800'
          }`}
        >
          0
        </button>
        <button
          onClick={() => handleNumber('.')}
          className={`p-4 rounded hover:bg-gray-100 shadow-sm text-lg sm:text-xl ${
            isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-white hover:bg-gray-50 text-gray-800'
          }`}
        >
          .
        </button>
      </div>
    </div>
  );
}