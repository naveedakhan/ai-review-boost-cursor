"use client";

import { useEffect, useState } from "react";
import { ContactForm } from "@/components/contact-form";
import {
  ArrowUp,
  CheckCircle,
  Menu,
  MessageSquare,
  Shield,
  Smartphone,
  Star,
  X,
} from "lucide-react";

const highlights = [
  { title: "Google-first", text: "Daily sync with Google Places so ratings stay fresh." },
  { title: "SMS funnels", text: "50 free SMS every month to turn dine-ins into reviews." },
  { title: "AI replies", text: "One-click, locally-tuned responses that save time." },
  { title: "Manual upgrades", text: "Admin confirms payment, then unlocks Starter instantly." },
];

const featureCards = [
  { icon: Smartphone, title: "SMS review requests", detail: "Send tracked SMS via your Pakistan gateway." },
  { icon: Star, title: "Google sync", detail: "Official Google data with Apify only as fallback." },
  { icon: MessageSquare, title: "AI replies", detail: "Store one reply per review—no auto-regeneration." },
  { icon: Shield, title: "Compliance", detail: "Supabase auth + GDPR-friendly storage and opt-outs." },
];

const steps = [
  {
    title: "Send SMS",
    detail: "Upload CSV or add diners; every message includes a unique tracking link.",
  },
  {
    title: "Sync Google reviews",
    detail: "Daily pull from Google Places. Apify only runs if Google fails.",
  },
  {
    title: "Reply with AI",
    detail: "First suggestion is saved and reused. No auto re-generations.",
  },
];

const pricing = [
  {
    name: "Free",
    price: "PKR 0/mo",
    description: "Perfect for testing in one outlet.",
    perks: ["50 SMS each month", "Google review sync", "AI reply suggestions", "Basic analytics"],
  },
  {
    name: "Starter",
    price: "PKR 4,500/mo",
    description: "For busy restaurants that need steady volume.",
    perks: [
      "200 SMS each month",
      "Priority sync",
      "Reply history & reuse",
      "Admin-led upgrades (bank transfer/JazzCash)",
    ],
  },
];

const faqs = [
  {
    q: "Is this built for Pakistan?",
    a: "Yes. SMS, pricing, and workflows are localized for Pakistani restaurant teams.",
  },
  {
    q: "How do upgrades work?",
    a: "Choose Starter, pay offline, and an admin manually upgrades your account.",
  },
  {
    q: "Do you support WhatsApp?",
    a: "No. MVP is SMS only with tracking links.",
  },
  {
    q: "Can I manage multiple restaurants?",
    a: "MVP is one restaurant per account to keep it simple.",
  },
  {
    q: "What about data privacy?",
    a: "Data is stored securely on Supabase (EU-friendly Postgres). GDPR copy is in the footer.",
  },
  {
    q: "Do you auto-regenerate AI replies?",
    a: "No. One suggestion per review is stored and reused to avoid drift.",
  },
];

function StatsChip() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setValue(95);
      return;
    }
    let current = 0;
    const timer = setInterval(() => {
      current += 5;
      if (current >= 95) {
        current = 95;
        clearInterval(timer);
      }
      setValue(current);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-slate-900 shadow-soft backdrop-blur">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-brand-700">
        {value}%
      </span>
      Sync success rate (Pakistan)
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 600);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!show) return null;
  return (
    <button
      aria-label="Back to top"
      className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-full bg-slate-900 p-3 text-white shadow-soft transition hover:bg-brand-700 md:bottom-6 md:left-auto md:right-4 md:translate-x-0"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      title="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState<string | null>(null);

  return (
    <div id="top" className="bg-slate-50">
      <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-brand-600 px-2.5 py-1 text-sm font-semibold text-white shadow-soft">
              HS
            </div>
            <span className="text-lg font-semibold text-slate-900">
              Review Booster Pakistan
            </span>
          </div>
          <nav className="hidden items-center gap-4 text-sm font-medium md:flex">
            <a href="#features" className="text-slate-600 transition hover:text-slate-900">
              Features
            </a>
            <a href="#how" className="text-slate-600 transition hover:text-slate-900">
              How it Works
            </a>
            <a href="#testimonials" className="text-slate-600 transition hover:text-slate-900">
              Testimonials
            </a>
            <a href="#pricing" className="text-slate-600 transition hover:text-slate-900">
              Pricing
            </a>
            <a href="#faq" className="text-slate-600 transition hover:text-slate-900">
              FAQ
            </a>
            <a href="#contact" className="text-slate-600 transition hover:text-slate-900">
              Contact
            </a>
            <a
              href="/login"
              className="rounded-full border border-slate-200 px-4 py-2 text-slate-900 transition hover:border-brand-600 hover:text-brand-700"
            >
              Log in
            </a>
            <a
              href="/signup"
              className="rounded-full bg-brand-600 px-4 py-2 text-white transition hover:bg-brand-700"
            >
              Start Free
            </a>
          </nav>
          <button
            aria-label="Open navigation"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6 text-slate-900" />
          </button>
        </div>
        {mobileOpen && (
          <div className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur">
            <div className="ml-auto flex h-full w-72 flex-col gap-4 bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-slate-900">
                  Menu
                </span>
                <button
                  aria-label="Close navigation"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-6 w-6 text-slate-900" />
                </button>
              </div>
              {[
                { href: "#features", label: "Features" },
                { href: "#how", label: "How it Works" },
                { href: "#testimonials", label: "Testimonials" },
                { href: "#pricing", label: "Pricing" },
                { href: "#faq", label: "FAQ" },
                { href: "#contact", label: "Contact" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-semibold text-slate-900"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/login"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-brand-600 hover:text-brand-700"
              >
                Log in
              </a>
              <a
                href="/signup"
                className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                Start Free
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-12">
        <section className="grid gap-10 rounded-3xl bg-white px-8 py-12 shadow-soft md:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-brand-700">
              Built for Pakistani restaurants
            </div>
            <h1 className="text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
              Turn diners into five-star evangelists.
            </h1>
            <p className="text-lg text-slate-700">
              HS Review Booster automates SMS requests, syncs Google feedback daily, and stores AI replies for instant reuse—tuned for teams in Karachi, Lahore, and Islamabad.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/signup"
                className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-brand-700"
              >
                Start Free
              </a>
              <a
                href="#contact"
                className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-brand-500 hover:text-brand-700"
              >
                Book a Demo
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <StatsChip />
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                <div className="text-sm font-semibold text-slate-900">
                  Pakistani SMS ready
                </div>
                <p className="text-sm text-slate-600">
                  Works with generic HTTP gateways common in Pakistan. Webhooks track clicks.
                </p>
              </div>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-soft"
            style={{
              backgroundImage:
                "linear-gradient(120deg, rgba(16,20,24,0.8), rgba(16,20,24,0.7)), url('https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 backdrop-blur-[2px]" />
            <div className="relative space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="h-10 w-10" />
                <div>
                  <p className="text-sm uppercase tracking-wide text-emerald-50">
                    Daily health
                  </p>
                  <p className="text-2xl font-semibold">Review Pulse</p>
                </div>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-emerald-50">Avg. Rating</span>
                  <span className="text-emerald-100 font-semibold">4.7 ★</span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-[78%] rounded-full bg-white" />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white/10 p-3">
                  <p className="text-sm text-emerald-50">New reviews (30d)</p>
                  <p className="text-2xl font-semibold">42</p>
                </div>
                <div className="rounded-xl bg-white/10 p-3">
                  <p className="text-sm text-emerald-50">SMS sent</p>
                  <p className="text-2xl font-semibold">120 / 200</p>
                  <p className="text-xs text-emerald-50">Starter limit</p>
                </div>
              </div>
              <div className="rounded-xl bg-white/10 p-3">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-6 w-6" />
                  <div>
                    <p className="text-sm text-emerald-50">AI reply ready</p>
                    <p className="text-lg font-semibold">
                      “Shukriya! We’re excited to see you again.”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl border border-slate-100 bg-white px-6 py-4 shadow-sm">
          <span className="text-sm font-semibold text-slate-700">
            Trusted data & partners:
          </span>
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
            <span className="rounded-full bg-slate-100 px-3 py-1">Google Places API</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">Supabase Auth</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">Resend</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">PK SMS Gateways</span>
          </div>
        </section>

        <section id="features" className="mt-16 space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
              Features
            </p>
            <h2 className="text-3xl font-bold text-slate-950">
              Everything you need to earn and reply fast
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featureCards.map((card) => (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 transition group-hover:opacity-100" />
                <card.icon className="h-6 w-6 text-brand-600" />
                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600">{card.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="how" className="mt-16 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            How it works
          </p>
          <h2 className="text-3xl font-bold text-slate-950">
            Built for busy owners in Pakistan
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, idx) => (
              <div
                key={step.title}
                className="flex h-full flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-brand-700">
                    {idx + 1}
                  </div>
                  <p className="text-lg font-semibold text-slate-900">
                    {step.title}
                  </p>
                </div>
                <p className="text-sm text-slate-600">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="ai" className="mt-16 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
              AI replies
            </p>
            <h3 className="text-2xl font-bold text-slate-950">
              One stored suggestion per review. Copy in one click.
            </h3>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Review</p>
                <p className="text-sm text-slate-700">
                  “Best karahi in Lahore. Seating was a bit tight.”
                </p>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <div className="mt-1 h-2 w-2 rounded-full bg-brand-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    AI suggestion (stored)
                  </p>
                  <p className="text-sm text-slate-700">
                    Shukriya for visiting! We’re adding more seating this weekend. Glad you loved the karahi—see you soon.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    Copy reply
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600">
                We never auto-regenerate replies. If you need another draft, request it via admin support.
              </p>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
              SMS funnel
            </p>
            <h3 className="text-2xl font-bold text-slate-950">
              Track clicks with unique links and stop at quota.
            </h3>
            <div className="mt-4 space-y-3">
              {[
                { label: "Sent", value: "120", detail: "Starter limit 200 SMS" },
                { label: "Clicked", value: "74", detail: "Per-customer tracking" },
                { label: "Blocked", value: "0", detail: "Sending stops at 100%" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {item.label}
                    </p>
                    <p className="text-xs text-slate-600">{item.detail}</p>
                  </div>
                  <span className="text-xl font-bold text-brand-700">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="mt-16 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Pricing
          </p>
          <h2 className="text-3xl font-bold text-slate-950">
            Simple tiers. Pakistan-first limits.
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
                      {plan.name}
                    </p>
                    <p className="text-3xl font-bold text-slate-950">
                      {plan.price}
                    </p>
                  </div>
                  <a
                    href="/signup"
                    className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
                  >
                    Choose plan
                  </a>
                </div>
                <p className="text-sm text-slate-600">{plan.description}</p>
                <ul className="space-y-2 text-sm text-slate-700">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-brand-600" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section
          id="testimonials"
          className="mt-16 rounded-3xl border border-slate-100 bg-white p-8 shadow-soft"
        >
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
              What owners say
            </p>
            <h2 className="text-3xl font-bold text-slate-950">
              Proven in Karachi and Lahore
            </h2>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "We collected more reviews in 3 weeks than the previous 6 months. SMS funnels just work here.",
                name: "Asma, Owner at BBQ Gali (Karachi)",
              },
              {
                quote:
                  "AI replies save me an hour daily. I only tweak Urdu phrases and hit send.",
                name: "Hamza, GM at Bundu Khan (Lahore)",
              },
              {
                quote:
                  "Setup was one link and a CSV. Our staff now sends requests after every table.",
                name: "Sana, Ops at Islamabad Bistro",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-600 to-emerald-500" />
                  <div className="text-sm font-semibold text-slate-900">
                    {item.name}
                  </div>
                </div>
                <p className="text-sm text-slate-700">{item.quote}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="faq"
          className="mt-16 grid gap-8 md:grid-cols-[1.2fr_0.8fr]"
        >
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
              FAQ
            </p>
            <h2 className="text-3xl font-bold text-slate-950">
              Straightforward answers
            </h2>
            <div className="space-y-3">
              {faqs.map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl border border-slate-100 bg-white"
                >
                  <button
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                    onClick={() =>
                      setAccordionOpen(accordionOpen === item.q ? null : item.q)
                    }
                    aria-expanded={accordionOpen === item.q}
                  >
                    <span className="text-base font-semibold text-slate-900">
                      {item.q}
                    </span>
                    <span className="text-slate-500">
                      {accordionOpen === item.q ? "-" : "+"}
                    </span>
                  </button>
                  {accordionOpen === item.q && (
                    <div className="px-5 pb-4 text-sm text-slate-600">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div
            id="contact"
            className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft"
          >
            <h3 className="text-xl font-semibold text-slate-950">
              Talk to the team
            </h3>
            <p className="text-sm text-slate-600">
              Submit the form and we&apos;ll reply within one business day. Or email{" "}
              <a className="text-brand-700 underline" href="mailto:hello@halsahal.com">
                hello@halsahal.com
              </a>
              .
            </p>
            <ul className="mt-3 space-y-1 text-sm text-slate-700">
              <li>• We store data on Supabase in the EU.</li>
              <li>• You get a Resend confirmation email.</li>
              <li>• GDPR-friendly handling; see footer for privacy links.</li>
            </ul>
            <div className="mt-4">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-slate-600">
          <div className="space-y-1">
            <p>HS Review Booster · Built for restaurants in Pakistan</p>
            <p>
              We store data securely on Supabase (EU-friendly Postgres). Reply STOP to opt out of SMS.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a className="hover:text-brand-700" href="/privacy">
              Privacy
            </a>
            <a className="hover:text-brand-700" href="/terms">
              Terms
            </a>
            <a className="hover:text-brand-700" href="#" aria-label="LinkedIn (placeholder)">
              LinkedIn
            </a>
            <a className="hover:text-brand-700" href="#" aria-label="Instagram (placeholder)">
              Instagram
            </a>
            <a className="hover:text-brand-700" href="/login">
              Log in
            </a>
            <a className="hover:text-brand-700" href="/signup">
              Get started
            </a>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800">
              <Shield className="h-4 w-4" />
              GDPR-friendly via Supabase + Google Places
            </span>
          </div>
        </div>
      </footer>
      <BackToTop />
    </div>
  );
}
