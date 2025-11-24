# HS Review Booster - MVP Product Requirements Document

**Version:** 1.0 (MVP)  
**Date:** April 24, 2025  
**Target Launch:** 30 days from start  
**Status:** Active Development

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [MVP Scope](#mvp-scope)
3. [Technical Stack](#technical-stack)
4. [User Stories & Features (MVP)](#user-stories--features-mvp)
5. [Functional Requirements (MVP)](#functional-requirements-mvp)
6. [Deferred Features](#deferred-features)
7. [Technical Constraints & Workarounds](#technical-constraints--workarounds)
8. [Timeline & Milestones](#timeline--milestones)
9. [Success Criteria](#success-criteria)
10. [Data Models (MVP)](#data-models-mvp)

---

## 1. Executive Summary

**Product Name:** HS Review Booster MVP

**Product Vision (MVP):**
A streamlined review management platform that helps restaurants in Pakistan and the UAE collect Google reviews, send review requests via SMS, and get AI-powered reply suggestions.

**MVP Goals:**
- Launch a functional product in 30 days
- Enable restaurants to collect and view Google reviews in one place
- Allow restaurants to send review requests via SMS
- Provide AI-powered reply suggestions
- Support Free and Starter subscription tiers

**Target Market:** Restaurants in Pakistan and the UAE

**Business Model:** Subscription-based SaaS (Free, Starter tiers only for MVP)

**Key Constraints:**
- 30-day development timeline
- Supabase-only backend (no custom servers)
- Google Places API primary scraping (Apify as fallback)
- SMS-only messaging (no WhatsApp)
- Single restaurant per user (no multi-restaurant)
- Google reviews only (no other platforms)

---

## 2. MVP Scope

### 2.1 What's Included in MVP

**Core Features:**
1. ✅ User authentication (Email + Google OAuth)
2. ✅ Restaurant onboarding (Google Maps URL → auto-populate)
3. ✅ Google reviews collection via Google Places API (with Apify fallback)
4. ✅ Review dashboard (list view + basic analytics)
5. ✅ Manual review requests (CSV upload + SMS)
6. ✅ Unique tracking links with click tracking
7. ✅ Basic AI reply suggestions (stored once per review)
8. ✅ Subscription management (Free + Starter tiers)
9. ✅ Basic admin panel
10. ✅ Marketing landing page

**Platforms:**
- ✅ Google Reviews only
- ❌ Instagram (deferred)
- ❌ Facebook (deferred)
- ❌ Twitter (deferred)

**Messaging:**
- ✅ SMS only
- ❌ WhatsApp (deferred)

**Integrations:**
- ❌ CRM integration (deferred)
- ❌ POS integration (deferred)
- ❌ Automated review requests from orders (deferred)

### 2.2 What's Deferred (Post-MVP)

See [Deferred Features](#deferred-features) section for complete list.

---

## 3. Technical Stack

### 3.1 Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** React Query + Zustand
- **Forms:** React Hook Form + Zod
- **Landing Page:** Next.js pages (can use separate route or same app)
- **SEO:** Next.js Metadata API
- **Analytics:** (Optional) Google Analytics or Vercel Analytics
- **Hosting:** Vercel

### 3.2 Backend
- **Platform:** Supabase
- **Database:** PostgreSQL (Supabase)
- **Authentication:** Supabase Auth
- **Serverless Functions:** Supabase Edge Functions
- **Scheduling:** Supabase Cron Jobs
- **File Storage:** Supabase Storage (for CSV uploads)

### 3.3 External Services
- **Scraping:** Google Places API (primary) + Apify (fallback)
- **SMS:** Twilio (or admin-configurable provider)
- **AI:** OpenAI API (GPT-4 or GPT-3.5-turbo)
- **Payment:** Manual tier management by admins (no payment processor)
- **Monitoring:** Sentry
- **Maps:** Google Places API

### 3.4 What We're NOT Using
- ❌ Docker
- ❌ Redis
- ❌ Celery/Bull queues
- ❌ Custom scrapers
- ❌ Custom backend servers

---

## 4. User Stories & Features (MVP)

### 4.1 Authentication & Onboarding

#### US-MVP-001: User Registration
**As a** restaurant owner  
**I want to** sign up using email or Google  
**So that** I can quickly create an account

**Acceptance Criteria:**
- User can sign up with email/password
- User can sign up with Google OAuth
- Email verification is required
- Profile auto-populates from Google login (name, avatar)
- **Deferred:** Facebook OAuth, linking multiple auth methods

#### US-MVP-002: Simplified Onboarding
**As a** new restaurant owner  
**I want to** complete a quick onboarding process  
**So that** I can start collecting reviews

**Acceptance Criteria:**
- Step 1: Enter restaurant name + Google Maps URL (required)
- System auto-populates restaurant data from Google Places API
- User confirms/edit details
- Onboarding complete → Dashboard
- **Simplified:** No social media links, no verification steps, no preferences setup

### 4.2 Restaurant Management

#### US-MVP-003: Create Restaurant
**As a** restaurant owner  
**I want to** create a restaurant profile  
**So that** I can start collecting reviews

**Acceptance Criteria:**
- User can create ONE restaurant (MVP limitation)
- Google Maps URL auto-populates restaurant data via Places API
- User can edit restaurant details
- **Deferred:** Multiple restaurants per user

### 4.3 Review Collection

#### US-MVP-004: Automatic Google Review Collection
**As a** restaurant owner  
**I want to** automatically collect Google reviews  
**So that** I don't have to manually check Google

**Acceptance Criteria:**
- Reviews collected from Google via Google Places API (primary method)
- Apify fallback activates automatically if API fails 3+ times
- Scraping runs automatically on schedule (daily for all tiers in MVP)
- New reviews appear in dashboard automatically
- Reviews are tagged with date and rating
- System works in background without user action
- **Platform:** Google only (Instagram/Facebook/Twitter deferred)

### 4.4 Review Display & Analytics

#### US-MVP-005: View All Reviews
**As a** restaurant owner  
**I want to** see all my reviews in one dashboard  
**So that** I can monitor feedback

**Acceptance Criteria:**
- List view of all reviews
- Filter by rating (1-5 stars)
- Filter by date range
- Search reviews by text
- Sort by date (newest first)
- See review details: author, text, rating, date
- Pagination for large lists
- **Deferred:** Filter by additional platforms (only Google in MVP)

#### US-MVP-006: Basic Review Analytics
**As a** restaurant owner  
**I want to** see basic analytics about my reviews  
**So that** I can understand my performance

**Acceptance Criteria:**
- Total reviews count
- Average rating (displayed prominently)
- Rating distribution (simple bar chart)
- Reviews over time (simple line chart, last 30 days)
- **Deferred:** Advanced analytics and trend comparisons

### 4.5 Review Request System

#### US-MVP-007: Upload Customer List
**As a** restaurant owner  
**I want to** upload a CSV file with customer information  
**So that** I can send review requests to multiple customers

**Acceptance Criteria:**
- CSV upload with validation
- Supports columns: name, phone, email (optional)
- Shows preview before saving
- Validates phone numbers (format check)
- Stores customer list for reuse
- **Limitation:** Max 1000 customers per upload (enforced by Edge Function timeout)

#### US-MVP-008: Manual Customer Entry
**As a** restaurant owner  
**I want to** manually add individual customers  
**So that** I can send review requests to specific customers

**Acceptance Criteria:**
- Form to add single customer
- Fields: name, phone, email (optional)
- Can add multiple customers one by one
- Saves to customer list

#### US-MVP-009: Send Review Requests via SMS
**As a** restaurant owner  
**I want to** send review requests via SMS  
**So that** customers are prompted to leave reviews

**Acceptance Criteria:**
- Select customers from list (multi-select)
- Choose message template (or use default)
- Preview message before sending
- Send to multiple customers (batch processing)
- Track delivery status (if SMS provider supports)
- Respect subscription tier limits
- **Channel:** SMS only (WhatsApp deferred)
- **Limitation:** Batch size limited by Edge Function timeout (process in chunks)

#### US-MVP-010: Unique Tracking Links
**As a** restaurant owner  
**I want to** send unique review links to each customer  
**So that** I can track which customers clicked

**Acceptance Criteria:**
- Each customer gets unique link
- Link format: `hsreview.com/r/{restaurant_id}/{customer_id}/{hash}`
- Link redirects to restaurant's Google review page
- Click is tracked before redirect
- Click data stored with timestamp and customer info
- **Deferred:** Conversion tracking (click → review left)

#### US-MVP-011: Review Request Performance
**As a** restaurant owner  
**I want to** see how many customers clicked my review links  
**So that** I can measure effectiveness

**Acceptance Criteria:**
- Dashboard shows: sent, delivered (if available), clicked
- Filter by date range
- See individual customer click status
- **Deferred:** Export data, conversion rate (click → review)

### 4.6 AI-Powered Reply Generation

#### US-MVP-012: AI Reply Suggestions
**As a** restaurant owner  
**I want to** receive AI-generated reply suggestions for reviews  
**So that** I can respond quickly and professionally

**Acceptance Criteria:**
- AI analyzes each review and suggests reply
- Reply matches the tone of the review (thankful for positive, apologetic for negative)
- Reply is professional and appropriate
- User can copy reply with one click
- First generated reply is stored in the database and reused
- System never auto-regenerates replies; users request admin assistance if another draft is needed
- Reply is logged for audit
- **Deferred:** System message customization, reply preview/testing

### 4.7 Subscription & Billing

#### US-MVP-014: View Subscription Tier
**As a** restaurant owner  
**I want to** see my current subscription tier and limits  
**So that** I know what features I have access to

**Acceptance Criteria:**
- Profile shows current tier (Free or Starter)
- Shows limits: review requests/month, scraping frequency
- Shows usage: requests sent this month
- Can see upgrade options
- **Tiers:** Free and Starter only (Growth/Enterprise deferred)

#### US-MVP-015: Subscription Limits
**As a** restaurant owner  
**I want to** be notified when approaching limits  
**So that** I can upgrade if needed

**Acceptance Criteria:**
- Warning at 80% of limit (in-app notification)
- Blocked at 100% of limit
- Clear messaging about what's blocked
- Easy upgrade path by contacting admin for manual upgrade
- **Deferred:** Email/SMS notifications for limits

#### US-MVP-016: Subscription Management
**As a** restaurant owner  
**I want to** manage my subscription  
**So that** I can upgrade, downgrade, or cancel

**Acceptance Criteria:**
- View current subscription and usage
- Request upgrade (admin toggles tier after confirming manual payment)
- See manual payment status updates
- **Deferred:** Self-serve downgrade/upgrade, prorated billing, team features

### 4.8 Admin Features

The MVP admin panel is intentionally scoped down to four capabilities: list users, list restaurants, change tiers after confirming manual payments, and view scraping status in a simple table.

#### US-MVP-017: Manage Users
**As an** admin  
**I want to** view all users and update their tiers  
**So that** I can handle manual upgrades

**Acceptance Criteria:**
- List all users in a simple table
- Display manual payment status for each user upgrade request
- Change user subscription tier/status after confirming manual payment
- **Deferred:** Advanced filters, activation controls, user analytics

#### US-MVP-018: Manage Restaurants
**As an** admin  
**I want to** view all restaurants and their scraping status  
**So that** I can monitor core operations

**Acceptance Criteria:**
- List restaurants in a simple table (name, owner, Google link)
- Display last scraping attempt, method, and result per restaurant
- **Deferred:** Restaurant activation controls, review browsing, analytics

### 4.9 Marketing Landing Page

#### US-MVP-020: Marketing Landing Page
**As a** potential customer  
**I want to** learn about HS Review Booster on a landing page  
**So that** I can understand the product and sign up

**Acceptance Criteria:**
- Hero section with value proposition
- Key features showcase
- How it works (3-4 step process)
- Pricing section (Free + Starter tiers)
- Customer testimonials (optional, can be placeholder)
- FAQ section
- Call-to-action buttons (Sign Up, Start Free Trial)
- Mobile-responsive design
- Fast loading (<2 seconds)
- SEO optimized (meta tags, structured data)

**Design Requirements:**
- Modern, clean design
- Restaurant-focused imagery
- Clear value proposition
- Trust indicators (security, testimonials)
- Easy navigation to signup

---

## 5. Functional Requirements (MVP)

### 5.1 Authentication & Authorization

**FR-MVP-001: Multi-Method Authentication**
- Support email/password authentication (Supabase Auth)
- Support Google OAuth authentication (Supabase Auth)
- Email verification required for all signup methods
- Password reset functionality
- **Deferred:** Facebook OAuth, linking multiple auth methods

**FR-MVP-002: Role-Based Access Control**
- Two roles: Restaurant Owner, Admin
- Restaurant owners can only access their own data
- Admins can access all data and admin features
- Middleware enforces role-based route protection (Next.js middleware)

**FR-MVP-003: Session Management**
- JWT-based authentication (Supabase handles this)
- Session timeout after inactivity (configurable)
- Secure token storage (httpOnly cookies)

### 5.2 Restaurant Management

**FR-MVP-004: Restaurant CRUD**
- Create restaurant with Google Maps URL
- Auto-populate from Google Places API
- Edit restaurant details
- View restaurant details
- **Limitation:** One restaurant per user (MVP)
- **Deferred:** Delete restaurant, multiple restaurants

**FR-MVP-005: Google Places Integration**
- Accept Google Maps URL or Place ID
- Fetch restaurant data from Places API
- Store: name, address, phone, coordinates, place_id
- Validate restaurant exists

### 5.3 Review Collection

**FR-MVP-006: Google Review Scraping**
- Primary: Use Google Places API (Place Details with reviews field)
- Fallback: Use Apify Google Maps Scraper if API fails
- Trigger scraping via Supabase Edge Function
- Schedule scraping via Supabase Cron (daily for all tiers)
- Store reviews in database
- Handle scraping failures gracefully
- Automatic fallback after 3 consecutive API failures
- Daily retry of Google Places API when using fallback
- Auto-switch back to API when it works again
- Tag fallback results as "apify_fallback" in database
- **Platform:** Google only
- **Deferred:** Custom scrapers, other platforms

**FR-MVP-007: Review Storage**
- Store parsed reviews (6 months retention)
- Store review metadata (author, rating, date, text)
- Platform tagging (always "google" in MVP)
- Deduplicate reviews by platform_review_id

### 5.4 Review Management

**FR-MVP-008: Review Display**
- List view with filters (rating, date range)
- Search functionality (full-text search)
- Sort options (date, rating)
- Pagination (20 reviews per page)
- Review details view
- Platform indicators (always Google in MVP)

**FR-MVP-009: Review Analytics**
- Total reviews count
- Average rating calculated via SQL aggregates
- Rating distribution (1-5 stars)
- Reviews over time (last 30 days chart)
- **Deferred:** Advanced analytics and platform distribution

### 5.5 Review Request System

**FR-MVP-010: Customer List Management**
- CSV upload with validation (Supabase Storage)
- Manual entry form
- Store customer lists per restaurant
- Edit/delete customers
- Reuse customer lists
- **Limitation:** Max 1000 customers per restaurant (enforced)

**FR-MVP-011: SMS Sending**
- Send via SMS provider (Twilio or configurable)
- Batch sending to multiple customers
- Message templates (default + custom)
- Delivery status tracking (if provider supports)
- Respect subscription limits
- **Channel:** SMS only
- **Deferred:** WhatsApp, email

**FR-MVP-012: Click Tracking**
- Generate unique tracking links
- Track clicks with timestamp
- Store: customer, restaurant, time
- Redirect to Google review page after tracking
- **Deferred:** Conversion tracking (click → review)

### 5.6 AI Features

**FR-MVP-013: Reply Generation**
- Generate an initial reply per review using OpenAI
- Match tone to the review content (thankful for positive, apologetic for negative)
- Store the first generated reply in the database and reuse it
- Never regenerate automatically; escalate to admin support if a new draft is required
- Professional language
- Copy-to-clipboard functionality
- Log all AI suggestions
- **Deferred:** System message customization, reply preview/testing

### 5.7 Subscription Management

**FR-MVP-015: Tier Configuration**
- Two tiers: Free, Starter
- Limits:
  - Free: 1 restaurant, 50 review requests/month, daily scraping
  - Starter: 1 restaurant, 200 review requests/month, daily scraping
- Usage tracking
- Limit enforcement
- **Deferred:** Growth/Enterprise tiers, configurable limits

**FR-MVP-016: Subscription Features**
- View current tier
- View limits and usage
- Upgrade prompts (at 80% limit) with instructions to contact admin
- Block at 100% limit
- Manual upgrade workflow (user request + admin confirmation, no payment processor)
- **Deferred:** Downgrade, prorated billing, team features

### 5.8 Notification System

**FR-MVP-017: In-App Notifications**
- In-app notifications (always on)
- Notification types:
  - New review received
  - Limit warnings (80%)
  - System updates (optional)
- Can mark as read/dismiss
- **Deferred:** Email/SMS notifications, notification preferences

### 5.9 Admin Features

**FR-MVP-018: User Management**
- List all users in a simple table
- Surface manual payment status for pending upgrades
- Manually update subscription tier/status after confirming payment

**FR-MVP-019: Restaurant Management**
- List all restaurants with owner info
- Display last scraping attempt, method, and result in a table view

System monitoring beyond scraping visibility relies on Sentry dashboards and Supabase logs for now.

### 5.10 Marketing Landing Page

**FR-MVP-021: Landing Page Content**
- Hero section with headline and CTA
- Features section (3-5 key features)
- How it works section
- Pricing table (Free + Starter)
- FAQ section (5-10 common questions)
- Footer with links (Privacy, Terms, Contact)

**FR-MVP-022: Landing Page Functionality**
- Sign up CTA buttons (link to auth)
- Mobile-responsive layout
- Fast page load (<2 seconds)
- SEO optimization (meta tags, Open Graph)
- Analytics tracking (optional)

**FR-MVP-023: Landing Page Design**
- Modern, professional design
- Restaurant industry imagery
- Clear typography
- Consistent branding
- Accessible (WCAG 2.1 AA)

---

## 6. Deferred Features

### 6.1 Authentication
- ❌ Facebook OAuth
- ❌ Linking multiple auth methods to one account

### 6.2 Restaurant Management
- ❌ Multiple restaurants per user
- ❌ Restaurant switching UI
- ❌ Multi-restaurant analytics

### 6.3 Review Collection
- ❌ Instagram reviews
- ❌ Facebook reviews
- ❌ Twitter reviews
- ❌ Custom scrapers
- ❌ Scraper versioning system
- ❌ Advanced fallback management (basic fallback included in MVP)

### 6.4 Review Management
- ❌ Advanced analytics (trends, comparisons)
- ❌ Platform distribution analytics
- ❌ Export reviews
- ❌ Review response tracking

### 6.5 Review Requests
- ❌ WhatsApp integration
- ❌ Email review requests
- ❌ Automated review requests from orders
- ❌ CRM integration
- ❌ POS integration
- ❌ Conversion tracking (click → review)
- ❌ Reminder system
- ❌ Advanced message templates

### 6.6 AI Features
- ❌ System message customization
- ❌ AI reply playground/testing
- ❌ Multi-language support

### 6.7 Subscription
- ❌ Growth tier
- ❌ Enterprise tier
- ❌ Downgrade functionality
- ❌ Prorated billing
- ❌ Team collaboration features

### 6.8 Notifications
- ❌ Email notifications
- ❌ SMS notifications
- ❌ Notification preferences
- ❌ Weekly summaries

### 6.9 Admin Features
- ❌ Advanced user analytics
- ❌ Bulk actions
- ❌ Scraper version management
- ❌ Advanced monitoring and alerts
- ❌ System configuration UI

---

## 7. Technical Constraints & Workarounds

### 7.1 No Queue System (Supabase Cron Only)

**Constraint:** Can't process large batches of review requests efficiently with traditional queue systems.

**Workaround:**
- Use Supabase Edge Functions for batch processing
- Process in chunks (50-100 at a time)
- Track progress via `review_requests.status`
- Use Supabase cron to retry failed batches
- Accept async processing delays

**Implementation:** rely on the existing `review_requests` records (and their statuses) to determine which batches still need work.

### 7.2 No Redis Caching

**Constraint:** Slow dashboard loads with many reviews, no caching layer.

**Workaround:**
- Use lightweight SQL aggregate queries for analytics
- Database indexes on all filter columns
- Client-side caching (React Query)
- Accept slower initial load (optimize later)

### 7.3 Google Places API Primary + Apify Fallback

**Primary Method: Google Places API**
- Use Place Details API with `reviews` field
- Cost: ~$0.017 per request (much cheaper than Apify)
- Rate limits: 1000 requests/day (free tier) or higher with paid
- More reliable and official
- Better data quality

**Fallback Method: Apify**
- Trigger after 3 consecutive Google Places API failures
- Use Apify's Google Maps Scraper actor
- Tag results as "apify_fallback" in database
- Daily retry of Google Places API
- Auto-switch back when API works again

**Cost Estimate:**
- Google Places API: ~$0.017 per restaurant per scrape
- 100 restaurants × daily = ~$51/month (much cheaper!)
- Apify fallback: Only used when API fails (~5-10% of time)
- Total estimated: $50-100/month vs $300-1500/month with Apify-only
- Significant cost savings with primary API approach

### 7.4 Supabase Edge Functions Limitations

**Constraint:** 10-second timeout, 50MB memory limit, cold starts.

**Workaround:**
- Break large operations into smaller chunks
- Chain Edge Functions if needed
- Accept limitations for MVP
- Optimize function code for speed

**Example:**
- Process review requests in batches of 50
- Use the `status` field on `review_requests` to track progress
- Use cron to poll and process pending requests

### 7.5 No Background Job Queue

**Constraint:** Can't use traditional job queues (Bull, Celery).

**Workaround:**
- Supabase cron triggers Edge Functions
- Pending review requests are fetched via their `status`
- Polling pattern for status updates
- Accept that some operations are async

**Implementation:**
- Cron job runs every 5 minutes
- Checks for review requests marked `pending`
- Processes requests via Edge Function batches
- Updates each request's status directly

### 7.6 Single Restaurant Per User

**Constraint:** MVP limitation to simplify development.

**Workaround:**
- Database schema supports multiple restaurants (future-proof)
- UI only allows one restaurant per user
- Easy to enable multi-restaurant later

---

## 8. Timeline & Milestones

### Week 1: Foundation (Days 1-7)

**Day 1-2: Project Setup**
- Initialize Next.js project with TypeScript
- Set up Supabase project
- Configure Tailwind CSS + shadcn/ui
- Set up Sentry for monitoring
- Create database schema (initial tables)
- Design and implement marketing landing page
- Set up routing (landing page at `/`, app at `/app/*`)

**Day 3-4: Authentication**
- Implement Supabase Auth
- Email/password signup and login
- Google OAuth integration
- Email verification flow
- Password reset functionality
- Protected routes middleware

**Day 5-7: Restaurant Management**
- Restaurant CRUD operations
- Google Places API integration
- Simplified onboarding flow
- Restaurant profile page

**Milestone 1:** Users can sign up and create a restaurant profile.

### Week 2: Review Collection (Days 8-14)

**Day 8-10: Review Scraping Integration**
- Set up Google Places API (primary method)
- Create Supabase Edge Function for scraping
- Integrate Google Places API (Place Details with reviews)
- Set up Apify account and actors (fallback)
- Implement fallback logic (trigger after 3 failures)
- Store reviews in database
- Handle scraping errors and fallback switching

**Day 11-12: Review Storage & Display**
- Review database schema
- Review list view UI
- Basic filters (rating, date)
- Search functionality
- Pagination

**Day 13-14: Review Dashboard**
- Review analytics (total, average, distribution)
- Simple charts (rating distribution, reviews over time)
- Review details view

**Milestone 2:** Reviews are automatically collected and displayed.

### Week 3: Review Requests (Days 15-21)

**Day 15-17: Customer Management**
- Customer list UI
- CSV upload functionality (Supabase Storage)
- CSV parsing and validation
- Manual customer entry form
- Customer list display

**Day 18-19: SMS Integration**
- Twilio (or provider) integration
- SMS sending via Edge Function
- Message templates
- Unique tracking link generation
- Click tracking system

**Day 20-21: Review Request Flow**
- Select customers UI
- Message preview
- Batch sending (chunked processing)
- Review request dashboard
- Click tracking display

**Milestone 3:** Users can send review requests via SMS.

### Week 4: AI & Subscriptions (Days 22-30)

**Day 22-23: AI Features**
- OpenAI API integration
- AI reply generation (Edge Function)
- Persist first reply per review and reuse it
- Copy-to-clipboard functionality
- Admin support request flow for regenerations

**Day 24-25: Subscription System**
- Subscription tier enforcement
- Usage tracking
- Limit warnings (80%)
- Block at 100% limit
- Manual upgrade workflow (admin toggles tier once payment confirmed offline)
- Subscription management UI

**Day 26-27: Admin Panel**
- Admin authentication
- User list with manual tier updates
- Manual payment status view + edit flow
- Restaurant list with scraping status table
- Basic admin UI

**Day 28-29: Testing & Bug Fixes**
- End-to-end testing
- Bug fixes
- Performance optimization
- UI/UX polish
- Error handling improvements

**Day 30: Launch**
- Final testing
- Documentation
- Deployment to production
- Launch announcement

**Milestone 4:** MVP is complete and launched.

---

## 9. Success Criteria

### 9.1 Functional Success
- ✅ Users can sign up and create restaurant profile
- ✅ Google reviews are automatically collected daily
- ✅ Users can view all reviews in dashboard
- ✅ Users can send review requests via SMS
- ✅ Users can track click-through rates
- ✅ AI reply suggestions work for all reviews
- ✅ Subscription limits are enforced
- ✅ Admin can manage users and restaurants

### 9.2 Technical Success
- ✅ All features work within Supabase constraints
- ✅ Google Places API scraping runs reliably (95%+ success rate)
- ✅ Apify fallback activates when needed (<5% of time)
- ✅ SMS delivery works (90%+ delivery rate)
- ✅ Dashboard loads in <3 seconds
- ✅ Landing page loads in <2 seconds
- ✅ No critical bugs in production
- ✅ Sentry monitoring is active

### 9.3 Business Success
- ✅ Product is launchable in 30 days
- ✅ Core value proposition is delivered
- ✅ Admins can manually record payments and upgrade tiers
- ✅ Foundation is set for Phase 2 features

---

## 10. Data Models (MVP)

### User
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  role TEXT CHECK (role IN ('owner', 'admin')) DEFAULT 'owner',
  subscription_tier TEXT CHECK (subscription_tier IN ('free', 'starter')) DEFAULT 'free',
  subscription_status TEXT CHECK (subscription_status IN ('active', 'canceled', 'past_due')) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Restaurant
```sql
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  google_maps_url TEXT NOT NULL,
  place_id TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  website TEXT,
  settings JSONB DEFAULT '{}',
  last_scraped_at TIMESTAMP,
  last_scrape_status TEXT CHECK (last_scrape_status IN ('pending', 'success', 'failed')),
  last_scrape_method TEXT CHECK (last_scrape_method IN ('google_places_api', 'apify_fallback')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id) -- MVP: One restaurant per user
);
```

### Review
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  platform TEXT DEFAULT 'google' CHECK (platform = 'google'), -- MVP: Google only
  platform_review_id TEXT NOT NULL,
  author TEXT,
  text TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_date TIMESTAMP,
  ai_suggestion TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(restaurant_id, platform, platform_review_id)
);

CREATE INDEX idx_reviews_restaurant ON reviews(restaurant_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_date ON reviews(review_date);
```

### Customer
```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  source TEXT CHECK (source IN ('manual', 'csv')) DEFAULT 'manual',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(restaurant_id, phone) -- One customer per phone per restaurant
);

CREATE INDEX idx_customers_restaurant ON customers(restaurant_id);
```

### Review Request
```sql
CREATE TABLE review_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  channel TEXT CHECK (channel = 'sms') DEFAULT 'sms', -- MVP: SMS only
  tracking_link TEXT UNIQUE NOT NULL,
  status TEXT CHECK (status IN ('pending', 'sent', 'delivered', 'failed')) DEFAULT 'pending',
  message TEXT,
  sent_at TIMESTAMP,
  delivered_at TIMESTAMP,
  clicked_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_review_requests_restaurant ON review_requests(restaurant_id);
CREATE INDEX idx_review_requests_customer ON review_requests(customer_id);
CREATE INDEX idx_review_requests_tracking ON review_requests(tracking_link);
```

### Subscription Usage
```sql
CREATE TABLE subscription_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  month_year TEXT NOT NULL, -- Format: '2025-04'
  review_requests_sent INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, month_year)
);
```

### Admin Log
```sql
CREATE TABLE admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  target_type TEXT, -- 'user', 'restaurant', etc.
  target_id UUID,
  details JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 11. API Endpoints (MVP)

### Authentication
- `POST /api/auth/signup` - Email signup
- `POST /api/auth/login` - Email login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/google` - Google OAuth
- `POST /api/auth/reset-password` - Password reset

### Restaurants
- `GET /api/restaurants` - Get user's restaurant
- `POST /api/restaurants` - Create restaurant
- `PUT /api/restaurants/:id` - Update restaurant
- `GET /api/restaurants/:id` - Get restaurant details

### Reviews
- `GET /api/reviews` - List reviews (with filters)
- `GET /api/reviews/:id` - Get review details
- `GET /api/reviews/stats` - Get review analytics

### Customers
- `GET /api/customers` - List customers
- `POST /api/customers` - Create customer
- `POST /api/customers/upload` - Upload CSV
- `DELETE /api/customers/:id` - Delete customer

### Review Requests
- `POST /api/review-requests` - Send review requests
- `GET /api/review-requests` - List review requests
- `GET /api/review-requests/stats` - Get request stats
- `GET /api/track/:hash` - Track link click

### AI
- `POST /api/ai/generate-reply` - Generate AI reply

### Subscriptions
- `GET /api/subscriptions` - Get current subscription
- `POST /api/subscriptions/upgrade` - Submit manual upgrade request (processed by admin)
- `POST /api/subscriptions/cancel` - Cancel subscription
- `GET /api/subscriptions/usage` - Get usage stats

### Admin
- `GET /api/admin/users` - List users
- `GET /api/admin/restaurants` - List restaurants
- `GET /api/admin/stats` - System stats
- `PUT /api/admin/users/:id/tier` - Change user tier

---

## 12. Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Google Places API (Primary)
GOOGLE_PLACES_API_KEY=

# Apify (Fallback)
APIFY_API_TOKEN=
APIFY_ACTOR_ID_GOOGLE_MAPS=

# Twilio (or SMS provider)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# OpenAI
OPENAI_API_KEY=

# Sentry
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=

# App
NEXT_PUBLIC_APP_URL=
TRACKING_LINK_SECRET=
```

---

## 13. Risk Mitigation

### High Risk Items

**1. Google Places API Costs & Limits**
- **Risk:** API quota limits or costs
- **Mitigation:**
  - Monitor API usage daily
  - Set up quota alerts in Google Cloud Console
  - Use Apify fallback if quota exceeded
  - Consider upgrading API tier if needed
  - Track API vs fallback usage

**2. Apify Fallback Costs**
- **Risk:** Apify costs if API fails frequently
- **Mitigation:**
  - Monitor fallback usage (should be <5%)
  - Alert if fallback usage >10%
  - Investigate API failures immediately
  - Set budget alerts in Apify

**3. Supabase Edge Function Timeouts**
- **Risk:** Large batches of review requests could timeout
- **Mitigation:**
  - Process in small chunks (50 at a time)
  - Use cron-triggered batches that read from request statuses
  - Accept async processing

**4. SMS Costs**
- **Risk:** High costs if limits not enforced
- **Mitigation:**
  - Strict tier limit enforcement
  - Monitor usage daily
  - Set cost alerts

### Medium Risk Items

**1. Slow Dashboard Performance**
- **Risk:** Dashboard could be slow with many reviews
- **Mitigation:**
  - Use SQL aggregates with supporting indexes
  - Add database indexes
  - Implement pagination
  - Client-side caching (React Query)

**2. Google Places API Failures**
- **Risk:** API could fail or hit rate limits
- **Mitigation:**
  - Monitor API success rate
  - Automatic fallback to Apify after 3 failures
  - Alert on API failures
  - Daily retry of API when using fallback
  - Monitor API quota usage

### Low Risk Items

**1. Missing Features**
- **Risk:** Users might want deferred features
- **Mitigation:**
  - Clear communication about MVP scope
  - Collect user feedback
  - Prioritize Phase 2 features based on demand

**2. Limited Platforms**
- **Risk:** Users might want Instagram/Facebook reviews
- **Mitigation:**
  - Start with Google (most important)
  - Add other platforms in Phase 2
  - Communicate roadmap

---

## 14. Post-MVP Roadmap

### Phase 2 (Month 2-3)
- Multi-restaurant support
- Instagram/Facebook/Twitter reviews
- WhatsApp integration
- Email notifications
- Advanced analytics

### Phase 3 (Month 4-6)
- CRM/POS integration
- Automated review requests from orders
- Growth/Enterprise tiers
- System message customization
- Advanced admin features

---

## Document Control

**Version History:**
- v1.0 (April 24, 2025): Initial MVP PRD
- v1.1 (April 24, 2025): Updated scraping strategy (Google Places API primary + Apify fallback), added marketing landing page

**Approval:**
- Product Owner: [Pending]
- Engineering Lead: [Pending]

**Next Steps:**
1. Review and approve MVP PRD
2. Set up development environment
3. Begin Week 1 implementation
4. Daily standups to track progress

---

**End of MVP PRD**

