# iOS Auto-Tracking Waitlist — Design

Date: 2026-10-22
Repos touched: `allocat-landing` (Vite/React SSG, Cloudflare), `allocat-web` (Next.js on Vercel + Supabase)

## Intent

Android users get SMS-based expense auto-tracking. iPhone users today only get "Add to Home Screen" (PWA), which has no auto-tracking. We want iPhone visitors to know auto-tracking is **coming to iOS**, build anticipation, and collect:

1. their email, and
2. whether they need a native App Store app or are fine with a web app.

The native-vs-web split is decision input: the founder will use it to decide whether to build a native iOS app or keep iOS as a PWA.

## Goals

- iPhone visitors see "Join the iOS waitlist" as their main CTA instead of the PWA install button.
- Every visitor (incl. desktop people who own iPhones) can join from a short home-page section.
- Emails + preference stored in the existing Supabase, next to user data. No new third-party service.
- Founder can see count, native/web split and the list in `/admin`, and export CSV.

## Non-goals

- No confirmation / launch emails (no email service exists; launch email is a later, separate task).
- No live "N people waiting" counter on the landing page.
- No extra fields (name, country, bank).
- No change for Android visitors.

## Anti-goals (failure even if it works)

- Implying iOS auto-tracking exists today or giving a launch date.
- Removing the PWA path entirely — iPhone users who want to start now must still be able to.
- Storing anything beyond what is listed below (no IP, no user agent). The landing site's privacy stance (see `src/lib/track.ts`) is a real constraint.
- A form that leaks whether an email is already on the list.

## Decisions made with the founder

| Topic | Decision |
|---|---|
| Placement | iPhone CTA swap **and** a home section visible to all |
| PWA | Stays, demoted to secondary option on iPhone |
| Preference question | Required, 3 choices (below) |
| Extra fields | None |
| Extras | `/admin` waitlist view. No confirmation email, no live count |
| Storage | `allocat-web` endpoint → Supabase (Claude's recommendation, founder agreed) |

Preference choices (stored value → label):

- `native` → "I need a native App Store app"
- `web` → "A web app is fine if it auto-tracks"
- `either` → "Either works for me"

## Design

### 1. Database (`allocat-web/supabase/migrations/20261022000000_ios_waitlist.sql`)

```sql
create table if not exists public.ios_waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  preference  text not null check (preference in ('native','web','either')),
  source      text,          -- 'cta' | 'home_section'
  platform    text,          -- 'ios' | 'android' | 'desktop' (coarse, from landing)
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create unique index if not exists ios_waitlist_email_key on public.ios_waitlist (lower(email));
alter table public.ios_waitlist enable row level security;
-- Deliberately no policies: service-role only (same as landing_events).
```

Optionally extend `admin_overview()` with a `waitlist` object (total, native, web, either, new_7d) — builder's call whether that or a direct query in `lib/admin/queries.ts`.

### 2. API (`allocat-web/app/api/waitlist/route.ts`)

Mirror `app/api/track/route.ts` style and guards:

- `OPTIONS` + `POST`, CORS locked to `https://grow.allocat.xyz`.
- Body: `text/plain` JSON `{ email, preference, source, platform, website }` (keeps request CORS-simple like track). `website` is a honeypot: if non-empty, return success and store nothing.
- Max body 1 KB. Rate limit via `lib/server/rateLimit` keyed `waitlist:${ip}`, e.g. 5 per 10 min. IP never stored.
- Validate: email trimmed, lowercased, ≤ 254 chars, basic regex; preference in allowed set; source/platform clipped to known values or null.
- Upsert on lower(email): re-submitting updates `preference`, `source`, `updated_at`.
- Responses: `200 {ok:true}` for success **and** for duplicates/honeypot (no existence leak); `400 {ok:false, error:"invalid_email"|"invalid_preference"}` for bad input; `429 {ok:false, error:"rate_limited"}`; `500 {ok:false}` on DB error (log with `console.warn("[waitlist] ...")`, check supabase `error` like track does).
- Add `cta_waitlist_open` and `waitlist_join` to track route's `ALLOWED_EVENTS`.
- Unit tests next to source for validation helper (vitest).

### 3. Landing (`allocat-landing`)

- **Env:** `VITE_WAITLIST_ENDPOINT` (add to `.env.example`). Unset ⇒ form shows "Waitlist opening soon" disabled state rather than failing silently.
- **`src/lib/waitlist.ts`:** `joinWaitlist({email, preference, source})` using `fetch` with `text/plain` body, returns `{ok}|{error}`. Adds platform via same detection as `track.ts`.
- **`src/components/WaitlistForm.tsx`:** email input, 3-option radio group (required), submit, hidden honeypot. States: idle → submitting → success ("You're on the list. We'll email you when auto-tracking lands on iPhone.") / error (inline message, retry). Fine print: "One email when it launches. No spam." Reused by both placements. Fires `track("waitlist_join")` on success.
- **iPhone CTA (`DownloadCTA.tsx`):** for `platform === "ios"`:
  - Primary lime button: "Join iOS waitlist" → opens popover/sheet containing `WaitlistForm` (`source: "cta"`), fires `cta_waitlist_open`. On phone width a bottom sheet is fine (existing `vaul`/dialog in `components/ui`); builder's call.
  - Secondary outline: existing `IosInstallButton` relabelled "Use web app now" (keeps the Add-to-Home-Screen steps).
  - Drop the current "Open in browser" button on iOS (PWA steps already link to the app) to keep it to two buttons.
  - `AppStoreButton` iOS branch → same waitlist button.
- **Home section (`src/components/home/IosWaitlist.tsx`):** placed in `Index.tsx` between `Glimpses` and `FaqSection`. Visible on all platforms. Headline idea: "Auto-tracking is coming to iPhone." Subcopy: "Android already turns bank SMS into tracked spends. We're bringing it to iOS — join the waitlist and tell us how you'd like it." Inline `WaitlistForm` (`source: "home_section"`). Give it an `id="ios"` anchor so the iPhone CTA can also link here if needed. Match existing neo/home visual style and dark mode.
- **FAQ:** add/adjust an entry "Is AlloCat on iPhone?" pointing to the waitlist (check current FAQ copy for iOS claims and keep consistent).

### 4. Admin (`allocat-web`)

- New `app/admin/waitlist/page.tsx` (`requireAdmin()`), nav item in `components/admin/AdminNav`.
- Tiles: total, native, web, either (with %), new last 7d. Reuse `Tile`, `num`, `pct`, `ago`.
- Table: email, preference, source, platform, joined (newest first, paginated or capped ~500).
- CSV export: `app/api/admin/waitlist/csv/route.ts`, admin-guarded, all rows.
- Optional: one "iOS waitlist" tile on `/admin` overview.

## Rollout order

1. `allocat-web`: migration applied to Supabase, API route, admin page. Deploy.
2. Verify with `curl` from allowed origin (success, duplicate, bad email, honeypot).
3. `allocat-landing`: set `VITE_WAITLIST_ENDPOINT` in Cloudflare build env, ship UI.
4. Test on a real iPhone (Safari) + desktop + dark mode.

## Left to the builder

- Exact visual design of popover vs bottom sheet, and home section layout (follow existing `neo` components).
- Final copy polish (within the anti-goals: no launch date, no "available now").
- Whether waitlist metrics go through `admin_overview()` or a separate query.

## Claude's calls (founder to check)

- Duplicate signup updates preference silently and returns success.
- Honeypot + IP rate limit for spam; no captcha.
- "Open in browser" removed from the iPhone CTA pair (PWA steps still link to the app).
- Home section sits between Glimpses and FAQ.
- New env var `VITE_WAITLIST_ENDPOINT` rather than deriving from the track URL.
