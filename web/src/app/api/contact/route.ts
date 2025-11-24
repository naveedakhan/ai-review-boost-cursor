import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { createServiceRoleClient } from "@/lib/supabase/server";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  restaurant: z.string().optional(),
  country: z.string().optional(),
  covers_per_month: z.string().optional(),
  message: z.string().min(5),
  opted_in: z.coerce.boolean().optional(),
  honeypot: z.string().optional(),
});

function getClientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function extractUtm(searchParams: URLSearchParams) {
  return {
    utm_source: searchParams.get("utm_source") || undefined,
    utm_medium: searchParams.get("utm_medium") || undefined,
    utm_campaign: searchParams.get("utm_campaign") || undefined,
    utm_term: searchParams.get("utm_term") || undefined,
    utm_content: searchParams.get("utm_content") || undefined,
  };
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success || parsed.data.honeypot) {
    return NextResponse.json(
      { error: "Please provide the required details." },
      { status: 400 },
    );
  }

  const ipAddress = getClientIp(request);
  const searchParams = new URL(request.url).searchParams;
  const utm = extractUtm(searchParams);

  try {
    const supabase = createServiceRoleClient();

    // Simple rate limit by IP: max 3 submissions per hour
    const { data: recent } = await supabase
      .from("marketing_leads")
      .select("id, created_at")
      .eq("ip_address", ipAddress)
      .gte("created_at", new Date(Date.now() - 60 * 60 * 1000).toISOString());

    if (recent && recent.length >= 3) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 },
      );
    }

    await supabase.from("marketing_leads").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      restaurant: parsed.data.restaurant,
      country: parsed.data.country,
      covers_per_month: parsed.data.covers_per_month,
      message: parsed.data.message,
      opted_in: parsed.data.opted_in ?? false,
      ip_address: ipAddress,
      ...utm,
    });
  } catch (error) {
    console.error("Supabase insert error", error);
  }

  try {
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "support@hsreview.pk",
        to: process.env.CONTACT_NOTIFY_EMAIL || "hello@halsahal.com",
        subject: "New HS Review Booster lead (Pakistan)",
        text: `Name: ${parsed.data.name}
Email: ${parsed.data.email}
Restaurant: ${parsed.data.restaurant || "-"}
Country: ${parsed.data.country || "-"}
Covers/month: ${parsed.data.covers_per_month || "-"}
Opted in: ${parsed.data.opted_in ? "yes" : "no"}
Message: ${parsed.data.message}
UTM: ${JSON.stringify(utm)}`,
      });
    }
  } catch (error) {
    console.error("Resend error", error);
  }

  return NextResponse.json({ ok: true });
}
