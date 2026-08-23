'use client';

import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'icon-only' | 'text-only';
  themeMode?: 'light' | 'dark' | 'auto';
  height?: number | string;
}

export function BrandLogo({
  className = '',
  variant = 'full',
  themeMode = 'auto',
  height = 42
}: BrandLogoProps) {
  const isDarkAuto = themeMode === 'auto';
  const isDarkForced = themeMode === 'dark';
  const isLightForced = themeMode === 'light';

  // Primary brand colors
  const primaryTextColor = isDarkForced
    ? '#FFFFFF'
    : isLightForced
    ? '#14281D'
    : 'currentColor';

  const subTextColor = isDarkForced
    ? '#34D399'
    : isLightForced
    ? '#059669'
    : 'currentColor';

  return (
    <div
      className={`inline-flex items-center gap-2.5 select-none ${className}`}
      style={{ height }}
    >
      {/* Vector Hummingbird Emblem */}
      {variant !== 'text-only' && (
        <svg
          viewBox="0 0 100 100"
          className="h-full w-auto shrink-0 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="vrBirdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E11D48" />
              <stop offset="50%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="vrGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* Stylized Vermilion Hummingbird Body & Wings */}
          <path
            d="M50 15 C45 25, 30 35, 15 38 C28 42, 38 48, 42 62 C40 50, 48 40, 58 35 C68 30, 85 28, 92 18 C78 22, 65 20, 50 15 Z"
            fill="url(#vrBirdGrad)"
          />
          <path
            d="M42 62 C40 72, 45 82, 55 88 C48 80, 48 70, 52 62 C48 62, 44 62, 42 62 Z"
            fill="url(#vrGoldGrad)"
          />
          <path
            d="M58 35 C65 42, 75 52, 85 58 C75 52, 68 45, 62 38 Z"
            fill="#10B981"
            opacity="0.9"
          />
          {/* Eye */}
          <circle cx="56" cy="26" r="2.5" fill="#FFFFFF" />
        </svg>
      )}

      {/* Luxury Typography */}
      {variant !== 'icon-only' && (
        <div className="flex flex-col justify-center text-left leading-none">
          <span
            className="font-serif font-black tracking-[0.18em] uppercase text-sm sm:text-base md:text-lg transition-colors"
            style={{ color: primaryTextColor }}
          >
            VERMILION
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className="font-sans font-bold tracking-[0.32em] uppercase text-[9px] sm:text-[10px] md:text-[11px]"
              style={{ color: subTextColor }}
            >
              ROUTES
            </span>
            <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
            <span
              className="font-sans font-semibold tracking-[0.2em] uppercase text-[7px] sm:text-[8px] text-zinc-400 dark:text-zinc-500 hidden sm:inline"
            >
              ECUADOR &amp; GALAPAGOS
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
