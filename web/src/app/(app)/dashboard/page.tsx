import { BarChart3, MessageCircle, Shield, Star, Users } from "lucide-react";

const stats = [
  { label: "Total reviews", value: "1,248", icon: Star },
  { label: "Avg rating", value: "4.7", icon: BarChart3 },
  { label: "New (30d)", value: "42", icon: MessageCircle },
  { label: "SMS sent", value: "120 / 200", icon: Users },
];

const reviews = [
  {
    id: 1,
    name: "Ayesha R.",
    rating: 5,
    date: "Nov 20",
    text: "Food was excellent and service was quick. Will visit again!",
    aiReply: "Shukriya Ayesha! We’re thrilled you enjoyed the meal. See you soon.",
  },
  {
    id: 2,
    name: "Bilal M.",
    rating: 4,
    date: "Nov 18",
    text: "Great taste but seating was a bit crowded.",
    aiReply:
      "Thanks Bilal! We’ll open more seating this weekend and appreciate your visit.",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
          Overview
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold text-slate-950">Dashboard</h1>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-brand-700">
            Starter · 200 SMS
          </span>
        </div>
        <p className="text-sm text-slate-600">
          Review sync happens daily. SMS sending stops once limits are hit.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <div className="rounded-xl bg-emerald-50 p-2 text-brand-700">
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-slate-600">{stat.label}</p>
              <p className="text-xl font-semibold text-slate-900">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Latest reviews
              </h2>
              <p className="text-sm text-slate-600">
                Google Places sync + Apify fallback
              </p>
            </div>
            <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-brand-600 hover:text-brand-700">
              Filter
            </button>
          </div>
          <div className="mt-4 space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">
                      {review.name}
                    </p>
                    <span className="text-xs text-slate-600">{review.date}</span>
                  </div>
                  <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    {review.rating} ★
                  </div>
                </div>
                <p className="text-sm text-slate-700">{review.text}</p>
                <div className="mt-2 rounded-xl bg-white p-3 text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">AI reply</p>
                  <p>{review.aiReply}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-brand-600" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Sync</p>
                <p className="text-xs text-slate-600">Daily at 3am PKT</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-700">
              Google Places is primary. Apify only triggers on failures. We skip duplicates automatically.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  SMS usage
                </p>
                <p className="text-xs text-slate-600">Pakistan gateways</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-brand-700">
                Starter
              </span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[60%] rounded-full bg-brand-600" />
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Sending stops automatically once the quota is hit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
