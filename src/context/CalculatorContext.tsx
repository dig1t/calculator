'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type CalculationHistory = {
  expression: string;
  result: string;
  timestamp: number;
};

type CalculatorContextType = {
  display: string;
  history: CalculationHistory[];
  setDisplay: (value: string) => void;
  addToHistory: (calculation: CalculationHistory) => void;
  clearHistory: () => void;
};

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export function CalculatorProvider({ children }: { children: React.ReactNode }) {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState<CalculationHistory[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('calculatorHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToHistory = (calculation: CalculationHistory) => {
    const newHistory = [calculation, ...history].slice(0, 10); // Keep only last 10 calculations
    setHistory(newHistory);
    localStorage.setItem('calculatorHistory', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('calculatorHistory');
  };

  return (
    <CalculatorContext.Provider value={{ display, setDisplay, history, addToHistory, clearHistory }}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
}