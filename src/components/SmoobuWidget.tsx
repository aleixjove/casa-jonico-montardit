import { useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const SMOOBU_IFRAME_ID = '1791826';
const SMOOBU_SCRIPT_SRC = 'https://login.smoobu.com/js/Settings/BookingToolIframe.js';
const TARGET_ID = 'smoobuBookingWidget';

declare global {
  interface Window {
    BookingToolIframe?: {
      initialize: (opts: { url: string; baseUrl: string; target: string }) => void;
    };
  }
}

export default function SmoobuWidget() {
  const { locale } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smoobu no té català; redirigim a castellà
    const widgetLocale = locale === 'ca' ? 'es' : locale;
    const widgetUrl = `https://login.smoobu.com/${widgetLocale}/booking-tool/iframe/${SMOOBU_IFRAME_ID}`;

    const init = () => {
      if (containerRef.current) containerRef.current.innerHTML = '';
      window.BookingToolIframe?.initialize({
        url: widgetUrl,
        baseUrl: 'https://login.smoobu.com',
        target: `#${TARGET_ID}`,
      });
    };

    if (window.BookingToolIframe) {
      init();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SMOOBU_SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener('load', init, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = SMOOBU_SCRIPT_SRC;
    script.async = true;
    script.onload = init;
    document.body.appendChild(script);
  }, [locale]);

  return (
    <div className="bg-white border border-[#e0d8c8] rounded-sm p-4 md:p-6 shadow-xl">
      <div id={TARGET_ID} ref={containerRef} className="min-h-[600px]" />
    </div>
  );
}
