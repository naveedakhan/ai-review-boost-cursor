HS Review Booster – Pakistan
============================

Next.js 14 + Supabase App Router build for HS Review Booster. Includes a Pakistan-only marketing page, Supabase auth (email + Google), dashboard scaffolding (restaurant setup, reviews, SMS requests, customers, admin), and a generic SMS gateway + webhook model.

## Getting Started

1) Copy `.env.example` to `.env.local` and fill values:

```
cp .env.example .env.local
```

You need Supabase URL/keys (anon + service role), Resend API key, and your SMS gateway endpoint/key for Pakistan.

2) Install dependencies:

```bash
npm run dev
# Run linting
npm run lint
```

3) Open [http://localhost:3000](http://localhost:3000).

Key routes
----------
- `/` – marketing landing page (Pakistan only)
- `/login`, `/signup`, `/forgot-password` – Supabase Auth helpers
- `/dashboard`, `/restaurant`, `/reviews`, `/requests`, `/customers`, `/admin` – app shells behind middleware protection
- `/auth/callback` – Supabase OAuth exchange
- `/api/contact` – stores contact form in Supabase + notifies via Resend

Database schema
---------------
`supabase/migrations/0001_initial.sql` creates tables for profiles, restaurants, subscriptions, customers, review requests, reviews, replies, sync logs, and contact messages. Uses Google Places as primary review source with Apify as fallback.

Notes
-----
- SMS is generic HTTP + webhook for Pakistan gateways. Sending must stop at plan limits (Free 50, Starter 200).
- Manual upgrades only (no Stripe).
- AI replies are stored once per review and reused; do not regenerate automatically.
- One restaurant per user for the MVP.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
