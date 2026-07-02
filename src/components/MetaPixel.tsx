import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCookie, sendToCapi } from "@/lib/meta-events";

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

const MetaPixel = () => {
  const location = useLocation();

  // Initializes fbq queue and loads the pixel script (runs once on mount).
  // Also registers the global WhatsApp click listener that covers all wa.me
  // links across the site without requiring changes to individual components.
  useEffect(() => {
    if (!PIXEL_ID) return;

    if (!window.fbq) {
      const fbq: Window["fbq"] & {
        callMethod?: (...args: unknown[]) => void;
        queue: unknown[][];
        loaded: boolean;
        version: string;
        push: (...args: unknown[]) => void;
      } = Object.assign(
        function (...args: unknown[]) {
          if (fbq.callMethod) fbq.callMethod(...args);
          else fbq.queue.push(args);
        },
        { queue: [] as unknown[][], loaded: true, version: "2.0" }
      ) as never;

      fbq.push = fbq;
      window.fbq = fbq;
      if (!window._fbq) window._fbq = fbq;

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);
    }

    window.fbq("init", PIXEL_ID);

    const handleWhatsAppClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (!href.includes("wa.me") && !href.includes("api.whatsapp.com")) return;

      const eventId = crypto.randomUUID();
      window.fbq("track", "Contact", {}, { eventID: eventId });
      sendToCapi({
        event_name: "Contact",
        event_id: eventId,
        event_source_url: window.location.href,
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
      });
    };

    document.addEventListener("click", handleWhatsAppClick);
    return () => document.removeEventListener("click", handleWhatsAppClick);
  }, []);

  // Fires PageView on mount (first load) AND on every subsequent route change.
  // [location.pathname] dependency guarantees the effect runs on initial render
  // — not only on diffs — so the very first PageView is never missed.
  useEffect(() => {
    if (!PIXEL_ID || !window.fbq) return;

    const eventId = crypto.randomUUID();
    window.fbq("track", "PageView", {}, { eventID: eventId });
    sendToCapi({
      event_name: "PageView",
      event_id: eventId,
      event_source_url: window.location.href,
      fbp: getCookie("_fbp"),
      fbc: getCookie("_fbc"),
    });
  }, [location.pathname]);

  return null;
};

export default MetaPixel;
