'use client';
import { usePathname } from 'next/navigation';
import { Footer } from './Footer';

export function ConditionalFooter() {
  const pathname = usePathname();
  if (
    pathname?.includes('/admin') || 
    pathname?.includes('/cpanel') || 
    pathname?.includes('/operator') || 
    pathname?.includes('/affiliates') || 
    pathname?.includes('/auth')
  ) return null;
  return <Footer />;
}
