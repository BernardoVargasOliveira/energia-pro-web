import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

/**
 * Carrega o Google Analytics 4.
 * Configure VITE_GA_ID=G-XXXXXXXXXX no .env (ou variáveis do Vercel).
 */
const GoogleAnalytics = () => {
  useEffect(() => {
    if (!GA_ID) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { send_page_view: true });
  }, []);

  return null;
};

export default GoogleAnalytics;
