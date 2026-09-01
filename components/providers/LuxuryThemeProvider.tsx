'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface LuxuryContextType {
  isLuxuryMode: boolean;
  setLuxuryMode: (isLuxury: boolean) => void;
}

const LuxuryContext = createContext<LuxuryContextType | undefined>(undefined);

export function LuxuryThemeProvider({ children }: { children: React.ReactNode }) {
  const [isLuxuryMode, setLuxuryMode] = useState(false);

  useEffect(() => {
    if (isLuxuryMode) {
      document.documentElement.classList.add('theme-luxury');
    } else {
      document.documentElement.classList.remove('theme-luxury');
    }
    
    // Cleanup on unmount
    return () => {
      document.documentElement.classList.remove('theme-luxury');
    };
  }, [isLuxuryMode]);

  return (
    <LuxuryContext.Provider value={{ isLuxuryMode, setLuxuryMode }}>
      {children}
    </LuxuryContext.Provider>
  );
}

export function useLuxury() {
  const context = useContext(LuxuryContext);
  if (context === undefined) {
    throw new Error('useLuxury must be used within a LuxuryThemeProvider');
  }
  return context;
}
