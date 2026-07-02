import { getCookie, sendToCapi } from "@/lib/meta-events";

export function useMetaEvents() {
  const fireLead = (): void => {
    if (typeof window === "undefined" || !window.fbq) return;

    const eventId = crypto.randomUUID();
    window.fbq("track", "Lead", {}, { eventID: eventId });

    // sendToCapi is async but intentionally not awaited — caller doesn't block
    sendToCapi({
      event_name: "Lead",
      event_id: eventId,
      event_source_url: window.location.href,
      fbp: getCookie("_fbp"),
      fbc: getCookie("_fbc"),
    });
  };

  return { fireLead };
}
