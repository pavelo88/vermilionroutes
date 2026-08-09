/**
 * @shared layout
 * Shared barrel — re-exports layout chrome components (Navbar, Footer).
 *
 * FSD convention: import from '@/components/shared/layout'.
 * Existing imports via '@/components/layout/*' remain valid.
 */
export { Navbar } from '@/components/layout/Navbar';
export { Footer } from '@/components/layout/Footer';
export { ConditionalFooter } from '@/components/layout/ConditionalFooter';
