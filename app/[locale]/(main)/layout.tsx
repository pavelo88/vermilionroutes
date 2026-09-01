import React, { ReactNode } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ConditionalFooter } from '@/components/layout/ConditionalFooter';
import { ConciergeWidget } from '@/components/ui/ConciergeWidget';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full relative">{children}</main>
      <ConciergeWidget />
      <ConditionalFooter />
    </>
  );
}
