declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.cookie
    .split("; ")
    .find((r) => r.startsWith(name + "="))
    ?.split("=")[1];
}

export interface CapiPayload {
  event_name: string;
  event_id: string;
  event_source_url: string;
  fbp?: string;
  fbc?: string;
}

export async function sendToCapi(payload: CapiPayload): Promise<void> {
  try {
    await fetch("/api/meta-conversion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // fire-and-forget: never block user experience on tracking
  }
}
