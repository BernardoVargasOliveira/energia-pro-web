// Pixel ID is public (same value as VITE_META_PIXEL_ID on the client).
const PIXEL_ID = "931486056623004";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const token = process.env.META_CONVERSIONS_API_TOKEN;
  if (!token) {
    console.error("META_CONVERSIONS_API_TOKEN is not set");
    return res.status(500).json({ message: "CAPI token not configured" });
  }

  const { event_name, event_id, event_source_url, fbp, fbc } =
    req.body ?? {};

  if (!event_name || !event_id) {
    return res.status(400).json({ message: "Missing event_name or event_id" });
  }

  // In Vercel serverless functions the real client IP comes from
  // x-forwarded-for, not req.socket.remoteAddress (which is an internal IP).
  const forwarded = req.headers["x-forwarded-for"];
  const clientIp = (Array.isArray(forwarded) ? forwarded[0] : forwarded)
    ?.split(",")[0]
    ?.trim();

  const userAgent = req.headers["user-agent"] as string | undefined;

  const userData: Record<string, string> = {};
  if (clientIp) userData.client_ip_address = clientIp;
  if (userAgent) userData.client_user_agent = userAgent;
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  const payload = {
    data: [
      {
        event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id,
        event_source_url: event_source_url ?? "",
        action_source: "website",
        user_data: userData,
      },
    ],
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Meta CAPI error:", error);
      return res.status(502).json({ message: "CAPI request failed" });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Meta CAPI fetch error:", error);
    return res.status(500).json({ message: "Internal error" });
  }
}
