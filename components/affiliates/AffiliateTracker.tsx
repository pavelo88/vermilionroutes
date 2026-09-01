'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, X, Check } from 'lucide-react';
import { useLocale } from 'next-intl';

export const AFFILIATE_STORAGE_KEY = 'vermilion_vid';

/**
 * Helper to get the currently stored affiliate VID (from localStorage or cookie)
 */
export function getStoredAffiliateRef(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const local = localStorage.getItem(AFFILIATE_STORAGE_KEY);
    if (local) return local.toLowerCase().trim();

    // Fallback: check cookie
    const match = document.cookie.match(new RegExp('(^| )' + AFFILIATE_STORAGE_KEY + '=([^;]+)'));
    if (match) return decodeURIComponent(match[2]).toLowerCase().trim();
  } catch (e) {
    console.warn('Could not read affiliate vid from storage', e);
  }
  return null;
}

/**
 * Helper to store affiliate VID for 30 days
 */
export function setStoredAffiliateRef(ref: string) {
  if (typeof window === 'undefined' || !ref) return;
  const clean = ref.toLowerCase().trim();
  try {
    localStorage.setItem(AFFILIATE_STORAGE_KEY, clean);
    // Cookie valid for 30 days (2592000 seconds)
    document.cookie = `${AFFILIATE_STORAGE_KEY}=${encodeURIComponent(clean)}; path=/; max-age=2592000; SameSite=Lax`;
  } catch (e) {
    console.warn('Could not write affiliate vid to storage', e);
  }
}

/**
 * Global component that captures ?vid= (Vermilion ID) in the URL,
 * saves it to storage (localStorage + 30-day cookie), and shows a VIP discount notice.
 * Also supports legacy ?ref= and ?affiliate= for backwards compatibility.
 */
export function AffiliateTracker() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const isEs = locale === 'es';
  const [activeRef, setActiveRef] = useState<string | null>(null);
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    // 1. Check URL params — vid= is the canonical param, affiliate/code are fallbacks
    const refParam = searchParams.get('vid') || searchParams.get('affiliate') || searchParams.get('code') || searchParams.get('ref');
    
    // Ignore internal order/booking reference codes like VR-1788232281883
    if (refParam && !/^vr-\d+$/i.test(refParam.trim())) {
      const clean = refParam.toLowerCase().trim();
      setStoredAffiliateRef(clean);
      setActiveRef(clean);
      setBannerVisible(true);
      return;
    }

    // 2. Check existing storage (also verify it's not a legacy saved vr- timestamp)
    const stored = getStoredAffiliateRef();
    if (stored && !/^vr-\d+$/i.test(stored)) {
      setActiveRef(stored);
    } else if (stored && /^vr-\d+$/i.test(stored)) {
      // Clear invalid timestamp from localStorage/cookie
      try {
        localStorage.removeItem(AFFILIATE_STORAGE_KEY);
        document.cookie = `${AFFILIATE_STORAGE_KEY}=; path=/; max-age=0`;
      } catch (e) {}
    }
  }, [searchParams]);


  if (!bannerVisible || !activeRef) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in max-w-sm">
      <div className="bg-stone-950/95 text-white border border-amber-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-md flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="flex-1 text-xs">
          <p className="font-bold text-amber-400">
            {isEs ? '¡10% de Descuento VIP Activo!' : '10% VIP Discount Active!'}
          </p>
          <p className="text-zinc-300 mt-0.5 leading-relaxed">
            {isEs
              ? `Recomendado por @${activeRef}. Tu descuento se aplicará automáticamente al reservar.`
              : `Referred by @${activeRef}. Your discount will apply automatically upon booking.`}
          </p>
        </div>
        <button
          onClick={() => setBannerVisible(false)}
          className="text-zinc-400 hover:text-white p-1"
          aria-label="Cerrar aviso"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
