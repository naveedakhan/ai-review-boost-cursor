# HS Review Booster – Marketing Landing Page PRD (Supplement)

## 1. Purpose
This document captures landing-page requirements that go beyond the main MVP PRD. The output must work in tandem with `mvp-prd-final.md`, so anything defined here augments—not replaces—the primary scope.

## 2. Objectives
- Convert restaurant owners in Pakistan and the UAE who arrive from organic/paid channels.
- Reinforce credibility by showcasing AI replies, SMS review requests, and Google review syncing.
- Collect qualified leads through a contact form that feeds Supabase and triggers a Resend email to `hello@halsahal.com`.
- Offer a mobile-first experience while still looking polished on desktop (PC-first app screens are acceptable).

## 3. Target Personas
| Persona | Needs | Messaging Angle |
| --- | --- | --- |
| Independent restaurant owner | Fast setup, trustworthy automation, low tech overhead | “Launch in a weekend, no dev team needed.” |
| Multi-location ops manager | Consistency, compliance, per-location visibility | “Daily Google sync + tracked SMS so every branch is covered.” |
| Marketing consultant | Proof of performance, sharable analytics | “Tracked clicks + AI replies that feel on-brand.” |

## 4. Page Architecture
1. **Sticky Header**
   - Logo + nav links: `Features`, `How it Works`, `Testimonials`, `Pricing`, `FAQ`, `Contact`.
   - CTA button: `Start Free`.
   - Collapsible mobile menu (hamburger) → full-screen overlay.
2. **Hero Section**
   - Full-width, high-quality image of a modern restaurant (staff serving customers, warm lighting) with blur overlay for text.
   - Headline: punchy value prop (`"Turn diners into five-star evangelists"`).
   - Sub-headline + two CTAs (`Start Free`, `Book a Demo` anchor to contact form).
   - Animated statistical chip (counts up to metrics like “95% sync success”).
3. **Social Proof Strip**
   - Logos of launch partners or badges (“Powered by Supabase”, “Google Places API”).
4. **Feature Cards**
   - Four cards with simple line icons:
     1. Phone + chat bubble → SMS review requests.
     2. Review stars → Google sync.
     3. Dashboard screen → analytics snapshot.
     4. Shield → compliance & data security.
   - Subtle hover lift/scale animation on desktop.
5. **How It Works (3 Steps)**
   - Illustrations:
     - Step 1: Phone sending SMS.
     - Step 2: Dashboard showing daily synced reviews.
     - Step 3: Chef replying via laptop using AI suggestions.
   - Consistent color palette (greens/oranges to signal freshness/hospitality).
6. **AI Reply Showcase**
   - Split layout with mock review card and generated reply bubble.
   - “Copy reply” micro-interaction animation.
7. **Pricing Snapshot**
   - Quick comparison of Free vs Starter (full details still in main PRD).
   - CTA linking to signup/auth flow.
8. **Testimonials**
   - Three cards with circular headshot placeholders, quote text, name/restaurant.
   - Slide-in animation on scroll.
9. **FAQ**
   - Accordion for 6–8 common questions (data privacy, SMS costs, manual upgrades).
10. **Contact Section**
    - Short pitch + bullet list of what happens after submission.
    - Contact form (see Section 6).
11. **Footer**
    - Navigation repeat, social icons (LinkedIn, Instagram placeholder).
    - Legal links: Privacy, Terms.
    - Compliance badge: lock/shield icon next to copy “GDPR-friendly data handling via Supabase + Google Places API”.
    - “Back to top” button anchored to page start.

## 5. Visual & Animation Guidelines
- **Imagery**
  - Hero: specified restaurant photo with blur overlay.
  - Feature icons: custom simple stroke icons.
  - How-it-works illustrations: vector or lightweight Lottie animations (green/orange palette).
  - Testimonials: placeholder headshots until real photos (use subtle gradient background and drop shadow).
- **Animations**
  - Hero metric counter (number animates from 0 to final metric on load).
  - Feature cards hover: 4px lift, soft shadow.
  - Scroll-triggered fade/slide for section reveals.
  - Back-to-top button fades in after user scrolls 600px; smooth-scroll behavior.
- **Typography & Layout**
  - Mobile-first: stack elements vertically, 16px base font, clamp-based responsive headings.
  - Desktop: max width 1200px center content; allow PC-first app screenshots (reviews dashboard) to display at >1200px if needed.

## 6. Contact Form & Integrations
1. **Form Fields**
   - Name (required)
   - Business email (required, validate MX)
   - Restaurant name (optional)
   - Country (dropdown: Pakistan, UAE, Other)
   - Monthly covers volume (select)
   - Message
   - Opt-in checkbox: “I agree to receive product emails.”
2. **Submission Flow**
   - Frontend calls `/api/contact` route.
   - API inserts payload into Supabase table `marketing_leads`:
     ```sql
     CREATE TABLE marketing_leads (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       name TEXT NOT NULL,
       email TEXT NOT NULL,
       restaurant TEXT,
       country TEXT,
       covers_per_month TEXT,
       message TEXT,
       opted_in BOOLEAN DEFAULT false,
       created_at TIMESTAMP DEFAULT NOW()
     );
     ```
   - After insert, trigger Resend email to `hello@halsahal.com` with structured body (lead info + source UTM if available).
   - Return success/failure JSON; show toast + fallback email link on error.
3. **Spam/Abuse Handling**
   - Include honeypot hidden field.
   - Rate limit by IP (Supabase RLS or middleware).

## 7. Legal & Compliance
- Display concise GDPR statement in footer and contact section:
  - “We store data securely on Supabase (EU-friendly Postgres). We only use your info to fulfill review services. View Privacy Policy.”
- Link to detailed Privacy Policy + Terms (docs can be placeholders initially).
- Mention SMS opt-out responsibility on the customer (template should include “Reply STOP to opt out”).
- Ensure Google Places API use is labeled “Official Google data source.”

## 8. Accessibility & Performance
- WCAG 2.1 AA: focus states, sufficient contrast, aria labels for interactive elements.
- All animations must be reduced when `prefers-reduced-motion` is set.
- Optimize hero image (AVIF/webp) + lazy-load non-critical illustrations.
- Target <2s LCP on 3G; use prefetch for auth CTA.

## 9. Back to Top Button
- Floating button bottom-right on desktop, bottom-center on mobile.
- Appears after 600px scroll; uses smooth scroll to `#top`.
- Includes tooltip text “Back to top.”

## 10. Delivery Checklist
- [ ] Header/nav links anchor correctly.
- [ ] Hero image + blur overlay implemented.
- [ ] Feature/How-it-works illustrations or animations in place.
- [ ] Contact form writes to Supabase + sends Resend notification.
- [ ] Mobile layout reviewed on 375px width.
- [ ] Back-to-top button working on all breakpoints.
- [ ] Legal text references GDPR & opt-out instructions.

This supplemental PRD should be referenced alongside `mvp-prd-final.md` during implementation to ensure consistency across marketing and product surfaces.


