'use client';

import { useEffect } from 'react';

export default function GTranslateWrapper() {
  useEffect(() => {
    // Prevent multiple injections
    if (document.getElementById('google-translate-script')) return;

    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    // Inject the Google Translate script
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
    
    // Custom function to toggle language manually from our button
    (window as any).doGTranslate = (langPair: string) => {
      // langPair comes like "en|es" or "en|en"
      const targetLang = langPair.split('|')[1]; 
      
      const domain = window.location.hostname;
      
      if (targetLang === 'en') {
         // Clear cookies to restore English
         document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
         document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
      } else {
         // Set cookie to Spanish
         document.cookie = `googtrans=/en/${targetLang}; path=/;`;
         document.cookie = `googtrans=/en/${targetLang}; path=/; domain=${domain}`;
      }
      
      // Reload to apply translation immediately
      window.location.reload();
    };

    const hideGoogleTranslateBar = () => {
      const frames = document.querySelectorAll('.goog-te-banner-frame');
      frames.forEach((el) => {
        (el as HTMLElement).style.display = 'none';
        (el as HTMLElement).style.visibility = 'hidden';
        (el as HTMLElement).style.height = '0';
      });
      document.body.style.top = '0px';
      document.documentElement.style.marginTop = '0px';
    };

    const observer = new MutationObserver(hideGoogleTranslateBar);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    // Also run periodically for the first few seconds
    const interval = setInterval(hideGoogleTranslateBar, 500);
    setTimeout(() => clearInterval(interval), 5000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="google_translate_element" className="w-full overflow-hidden rounded-lg [&>div]:!w-full [&>div>select]:!w-full [&>div>select]:!p-2 [&>div>select]:!border-zinc-200 [&>div>select]:!rounded-lg [&>div>select]:!text-sm" />
  );
}
