'use client';

import React, { Suspense } from 'react';
import { AdminCrmDashboard } from '@/components/crm/AdminCrmDashboard';

export default function AdminCrmPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07110B] flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AdminCrmDashboard />
    </Suspense>
  );
}
