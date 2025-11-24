# Codex Build Prompt: HS Review Booster – MVP + Landing Page

You are my senior full-stack engineer. Your job is to generate and improve the application using best practices.  
Your deliverable is a clean, production-ready build of the HS Review Booster MVP and its marketing landing page.

## Overall Goal
Build a working SaaS product for restaurant owners in Pakistan and the UAE.  
The app has two surfaces:

1. A marketing landing page for acquisition  
2. A web app where authenticated users manage reviews, send SMS review requests, and use AI reply assistance

Use your own technical judgment on structure, patterns, and file layout while staying consistent with the product requirements.

---

## High-Level Requirements

### 1. Authentication
- Email and Google sign-in using Supabase Auth  
- Signup, login, logout, and password reset  
- Google callback flow correctly redirects to dashboard  
- Secure session handling  
- Role support: owner, admin  

### 2. Restaurant Setup
- Single restaurant per user for the MVP  
- User enters a Google Maps URL  
- System auto-fetches restaurant details from Google Places and pre-fills fields  

### 3. Review Syncing
- Daily sync  
- Google Places is primary  
- Apify only as fallback  
- Reviews stored in the database  
- Prevent duplicates  
- Basic reviewer metadata  

### 4. Dashboard
- List of reviews  
- Filters (rating, date)  
- Search  
- Basic analytics: total reviews, average rating, distribution, 30-day trend  
- AI reply suggestion stored once per review and reused  

### 5. Customers & Review Requests
- CSV upload (name, phone, email optional)  
- Manual customer entry  
- SMS review request sending  
- Unique tracking links and click tracking  
- Usage limits based on subscription tier  

### 6. Subscription
- Two tiers only: Free, Starter  
- Free: 50 monthly SMS  
- Starter: 200 monthly SMS  
- Block sending when limit is exhausted  
- Admin manually upgrades users after confirming payment  

### 7. Admin Panel
- List users  
- List restaurants  
- Change user tier  
- View scraping status  

### 8. Landing Page
Follow modern SaaS conventions and the specs in the supplemental PRD.  
Include:

- Hero section  
- Features  
- How it works  
- Pricing (Free vs Starter)  
- Testimonials  
- FAQ  
- Contact form connected to Supabase  
- Email notification via Resend  
- Back-to-top button  
- Fast loading, mobile friendly  

Use imagery, icons, animations, and layout structure that match restaurant and hospitality themes.

---

## Guiding Principles
- Keep implementation pragmatic and clean  
- Do not include experimental patterns  
- Minimize complexity where Supabase already solves the job  
- Use your own best judgment on file structure, routing, naming, components, and data flow  
- Apply best practices for forms, validation, and secure API access  
- Favor simplicity and maintainability over abstraction  
- Do not reinvent common patterns, follow Next.js + Supabase conventions  
- For every flow, choose the most stable, boring, proven approach  

---

## Deliverables
Codex should produce and refine:

1. Complete app structure  
2. Database schema and migrations  
3. All required components and pages  
4. All API routes needed by the app  
5. Admin panel implementation  
6. Landing page implementation  
7. Clear redirect behavior  
8. All forms and UX flows  
9. Any necessary utilities or hooks  
10. Environment variable usage patterns  
11. Secure handling of user data  

Codex should generate all code needed and update files when asked.

---

## Important Behavior Rules
- Do not regenerate AI replies automatically. Save once and reuse.  
- Do not add Stripe or any external payment system. Upgrades are manual.  
- Do not exceed MVP scope.  
- Do not introduce unnecessary libraries.  
- Do not implement WhatsApp. SMS only.  
- Use your best technical judgment for everything not explicitly defined.  

---

## Final Instruction
Begin the project by scaffolding the full folder structure, initial pages, Supabase integration, auth flow, and landing page.  
Then proceed step by step through features, improving as you go.
