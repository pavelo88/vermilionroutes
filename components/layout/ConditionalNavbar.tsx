'use client';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';

export function ConditionalNavbar() {
  const pathname = usePathname();
  // No mostrar el navbar en las rutas internas (affiliates, admin, cpanel, operator, auth)
  if (
    pathname?.includes('/affiliates') || 
    pathname?.includes('/admin') || 
    pathname?.includes('/cpanel') || 
    pathname?.includes('/operator') || 
    pathname?.includes('/auth')
  ) return null;
  return (
    <>
      <Navbar />
      {/* Spacer so main content doesn't hide under fixed Navbar */}
      <div className="h-20 sm:h-24 md:h-28 lg:h-[120px]" />
    </>
  );
}
