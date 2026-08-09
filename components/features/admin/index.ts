/**
 * @feature admin
 * Feature barrel — re-exports all admin panel components.
 *
 * FSD convention: import from '@/components/features/admin' instead of
 * individual paths. Existing imports via '@/components/admin/*' remain valid.
 */
export { AdminDashboard } from '@/components/admin/AdminDashboard';
export { AdminHeader } from '@/components/admin/AdminHeader';
export { AdminLoginForm } from '@/components/admin/AdminLoginForm';
export { AdminMetrics } from '@/components/admin/AdminMetrics';
export { AdminBookingsTable } from '@/components/admin/AdminBookingsTable';
export { AdminTourTable } from '@/components/admin/AdminTourTable';
export { AdminTourModal } from '@/components/admin/AdminTourModal';
export { AdminSettingsPanel } from '@/components/admin/AdminSettingsPanel';
export { AdminPaymentLinks } from '@/components/admin/AdminPaymentLinks';
