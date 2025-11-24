"use client";

import { useEffect, useState } from "react";

type Status = { error?: string; success?: string };

const coverOptions = [
  "Up to 1,000 / month",
  "1,000 - 5,000 / month",
  "5,000 - 10,000 / month",
  "10,000+ / month",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>({});
  const [loading, setLoading] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(media.matches);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus({});

    const form = event.currentTarget;
    const formData = new FormData(form);

    const search = typeof window !== "undefined" ? window.location.search : "";

    const res = await fetch(`/api/contact${search}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        restaurant: formData.get("restaurant"),
        country: formData.get("country"),
        covers_per_month: formData.get("covers_per_month"),
        message: formData.get("message"),
        opted_in: formData.get("opt_in") === "on",
        honeypot: formData.get("website"),
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setStatus({
        error:
          data.error ||
          "Could not send message. Email hello@halsahal.com as a fallback.",
      });
    } else {
      setStatus({ success: "Thanks! We will reply within one business day." });
      form.reset();
    }

    setLoading(false);
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <input
        type="text"
        name="website"
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
      />
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-800" htmlFor="name">
          Name
        </label>
        <input
          required
          name="name"
          id="name"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          placeholder="Your name"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-800" htmlFor="email">
          Business email
        </label>
        <input
          required
          type="email"
          name="email"
          id="email"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          placeholder="you@restaurant.pk"
        />
      </div>
      <div className="space-y-1">
        <label
          className="text-sm font-medium text-slate-800"
          htmlFor="restaurant"
        >
          Restaurant name (optional)
        </label>
        <input
          name="restaurant"
          id="restaurant"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          placeholder="BBQ Gali Lahore"
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-800" htmlFor="country">
            Country
          </label>
          <select
            name="country"
            id="country"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            defaultValue="Pakistan"
          >
            <option>Pakistan</option>
          </select>
        </div>
        <div className="space-y-1">
          <label
            className="text-sm font-medium text-slate-800"
            htmlFor="covers_per_month"
          >
            Monthly covers
          </label>
          <select
            name="covers_per_month"
            id="covers_per_month"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            <option value="">Select volume</option>
            {coverOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-800" htmlFor="message">
          How can we help?
        </label>
        <textarea
          required
          name="message"
          id="message"
          rows={3}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          placeholder="Tell us about your restaurant and goals."
        />
      </div>
      <label className="flex items-start gap-2 text-sm text-slate-700">
        <input
          required
          type="checkbox"
          name="opt_in"
          className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
        />
        <span>
          I agree to receive product emails. Reply STOP to opt out of SMS requests sent to your customers.
        </span>
      </label>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Sending..." : "Send message"}
      </button>
      {status.error && (
        <p className="text-sm text-red-600">
          {status.error} If this persists, email{" "}
          <a className="underline" href="mailto:hello@halsahal.com">
            hello@halsahal.com
          </a>
          .
        </p>
      )}
      {status.success && (
        <p className="text-sm text-green-700">{status.success}</p>
      )}
      {!prefersReducedMotion && (
        <p className="text-xs text-slate-500">
          We store data securely on Supabase in the EU. We only use your info to contact you about HS Review Booster.
        </p>
      )}
    </form>
  );
}
