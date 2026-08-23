'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// Mute non-fatal script tag & firebase connection timeout warnings
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  const originalError = console.error;
  console.error = (...args) => {
    if (args[0] && typeof args[0] === 'string') {
      if (
        args[0].includes('Encountered a script tag while rendering React component') ||
        args[0].includes('Could not reach Cloud Firestore backend') ||
        args[0].includes('@firebase/firestore') ||
        args[0].includes('fdprocessedid') ||
        args[0].includes('A tree hydrated but some attributes of the server rendered HTML didn\'t match')
      ) {
        return;
      }
    }
    originalError.call(console, ...args);
  };
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
