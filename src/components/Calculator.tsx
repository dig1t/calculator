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
    } catch (error) {
      setDisplay('Error');
    }
  };

  return (
    <div className={`p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="mb-4 p-4 rounded bg-gray-100 dark:bg-gray-700">
        <div className="text-sm text-gray-500 dark:text-gray-400 h-6">{expression}</div>
        <div className="text-3xl font-bold">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <button onClick={handleClear} className="col-span-2 p-4 bg-red-500 text-white rounded hover:bg-red-600">
          AC
        </button>
        <button onClick={() => handleOperator('/')} className="p-4 bg-orange-500 text-white rounded hover:bg-orange-600">
          ÷
        </button>
        <button onClick={() => handleOperator('*')} className="p-4 bg-orange-500 text-white rounded hover:bg-orange-600">
          ×
        </button>
        
        {[7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(num.toString())}
            className="p-4 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            {num}
          </button>
        ))}
        <button onClick={() => handleOperator('-')} className="p-4 bg-orange-500 text-white rounded hover:bg-orange-600">
          -
        </button>
        
        {[4, 5, 6].map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(num.toString())}
            className="p-4 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            {num}
          </button>
        ))}
        <button onClick={() => handleOperator('+')} className="p-4 bg-orange-500 text-white rounded hover:bg-orange-600">
          +
        </button>
        
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(num.toString())}
            className="p-4 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            {num}
          </button>
        ))}
        <button onClick={handleCalculate} className="row-span-2 p-4 bg-orange-500 text-white rounded hover:bg-orange-600">
          =
        </button>
        
        <button
          onClick={() => handleNumber('0')}
          className="col-span-2 p-4 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
        >
          0
        </button>
        <button
          onClick={() => handleNumber('.')}
          className="p-4 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
        >
          .
        </button>
      </div>
    </div>
  );
}