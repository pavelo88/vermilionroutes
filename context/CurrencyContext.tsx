'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';

interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  rate: number; // Against USD
  label: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, label: 'GBP (£)' },
  CAD: { code: 'CAD', symbol: 'CA$', rate: 1.36, label: 'CAD (CA$)' },
  AUD: { code: 'AUD', symbol: 'AU$', rate: 1.52, label: 'AUD (AU$)' }
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amountInUSD: number) => string;
  convertPrice: (amountInUSD: number) => number;
  currentCurrencyInfo: CurrencyInfo;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');

  useEffect(() => {
    const saved = localStorage.getItem('vermilion_currency') as CurrencyCode;
    if (saved && CURRENCIES[saved]) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency);
    if (typeof window !== 'undefined') {
      localStorage.setItem('vermilion_currency', newCurrency);
    }
  };

  const currentCurrencyInfo = CURRENCIES[currency] || CURRENCIES.USD;

  const convertPrice = (amountInUSD: number): number => {
    return Math.round(amountInUSD * currentCurrencyInfo.rate);
  };

  const formatPrice = (amountInUSD: number): string => {
    const converted = convertPrice(amountInUSD);
    return `${currentCurrencyInfo.symbol}${converted.toLocaleString('en-US')} ${currency}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        currentCurrencyInfo
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    // Fallback if used outside provider
    return {
      currency: 'USD' as CurrencyCode,
      setCurrency: () => {},
      formatPrice: (amountInUSD: number) => `$${amountInUSD.toLocaleString('en-US')} USD`,
      convertPrice: (amountInUSD: number) => amountInUSD,
      currentCurrencyInfo: CURRENCIES.USD
    };
  }
  return context;
}
