'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 disabled:pointer-events-none rounded-2xl cursor-pointer active:scale-[0.98]';

    const variants = {
      primary:
        'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-600/20 hover:shadow-md hover:shadow-emerald-600/30 border border-transparent',
      outline:
        'border border-zinc-200 bg-white/80 text-zinc-900 hover:bg-zinc-100/80 hover:border-zinc-300 shadow-sm backdrop-blur-sm',
      ghost:
        'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100/80 border border-transparent',
    };

    const sizes = {
      sm: 'px-3.5 py-1.5 text-xs gap-1.5',
      md: 'px-5 py-2.5 text-sm gap-2',
      lg: 'px-7 py-3.5 text-base gap-2.5',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
