# National Nines Golf - Complete Setup Guide

This guide covers everything needed to get nationalninesgolf.co.uk live, including domain transfer from GoDaddy, Cloudflare Pages deployment, backend API hosting, and Stripe payments.

---

## Table of Contents

1. [Domain Transfer from GoDaddy to Cloudflare](#1-domain-transfer-from-godaddy-to-cloudflare)
2. [Cloudflare Pages Setup (Frontend)](#2-cloudflare-pages-setup-frontend)
3. [Backend API Deployment (Railway)](#3-backend-api-deployment-railway)
4. [Stripe Configuration](#4-stripe-configuration)
5. [Email Setup](#5-email-setup)
6. [Final Configuration](#6-final-configuration)
7. [Go-Live Checklist](#7-go-live-checklist)

---

## 1. Domain Transfer from GoDaddy to Cloudflare

### Option A: Full Domain Transfer (Recommended)

This moves your domain registration to Cloudflare (usually cheaper renewals).

#### Step 1: Prepare at GoDaddy

1. Log into [GoDaddy](https://www.godaddy.com)
2. Go to **My Products** → **Domains**
3. Click on `nationalninesgolf.co.uk`
4. Scroll to **Additional Settings**
5. Turn OFF **Domain Lock** (transfer lock)
6. Click **Get authorization code** - you'll receive an email with the EPP/Auth code

> ⚠️ Domain must be at least 60 days old and not expiring within 15 days

#### Step 2: Initiate Transfer at Cloudflare

1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Add a Site** → enter `nationalninesgolf.co.uk`
3. Select the **Free** plan
4. Cloudflare will scan existing DNS records - verify they look correct
5. Click **Continue**
6. Go to **Domain Registration** → **Transfer Domains**
7. Enter `nationalninesgolf.co.uk`
8. Enter the authorization code from GoDaddy
9. Pay for 1 year renewal (required with transfer, ~£8-10)
10. Confirm transfer

#### Step 3: Approve the Transfer

1. Check email for transfer confirmation from GoDaddy
2. **Approve** the transfer (or wait 5 days for auto-approval)
3. Transfer completes in 5-7 days

---

### Option B: Keep Domain at GoDaddy, Use Cloudflare DNS Only

Faster setup - just point nameservers to Cloudflare.

#### Step 1: Add Site to Cloudflare

1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Add a Site** → enter `nationalninesgolf.co.uk`
3. Select **Free** plan
4. Cloudflare scans DNS records - review and continue
5. Note the two nameservers provided (e.g., `ada.ns.cloudflare.com`)

#### Step 2: Update Nameservers at GoDaddy

1. Log into GoDaddy → **My Products** → **Domains**
2. Click `nationalninesgolf.co.uk` → **DNS** → **Nameservers**
3. Click **Change** → **Enter my own nameservers**
4. Enter Cloudflare's nameservers:
   ```
   ada.ns.cloudflare.com
   bob.ns.cloudflare.com
   ```
   (Use the actual ones Cloudflare gave you)
5. Save changes

#### Step 3: Verify in Cloudflare

1. Back in Cloudflare, click **Check nameservers**
2. Wait 10 minutes to 48 hours for propagation
3. You'll get an email when active

---

## 2. Cloudflare Pages Setup (Frontend)

### Step 1: Connect GitHub Repository

1. In Cloudflare Dashboard, go to **Workers & Pages**
2. Click **Create application** → **Pages** → **Connect to Git**
3. Select GitHub and authorize Cloudflare
4. Choose repository: `george-itf/national-nines-site`
5. Click **Begin setup**

### Step 2: Configure Build Settings

```
Project name: national-nines-golf
Production branch: main
Build command: npm run build
Build output directory: dist
Root directory: /
```

### Step 3: Environment Variables

Click **Add variable** for each:

| Variable | Value |
|----------|-------|
| `NODE_VERSION` | `20` |
| `SITE` | `https://nationalninesgolf.co.uk` |
| `PUBLIC_API_URL` | `https://api.nationalninesgolf.co.uk` |

### Step 4: Deploy

1. Click **Save and Deploy**
2. Wait for build to complete (~1-2 minutes)
3. You'll get a `*.pages.dev` preview URL

### Step 5: Add Custom Domain

1. Go to your Pages project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `nationalninesgolf.co.uk`
4. Cloudflare auto-configures DNS (since you're using Cloudflare DNS)
5. Add another: `www.nationalninesgolf.co.uk`
6. Wait for SSL certificates (automatic, few minutes)

### Step 6: Use Production Config

For production builds, you may want to use `astro.config.prod.mjs`:

1. Rename `astro.config.mjs` to `astro.config.dev.mjs`
2. Rename `astro.config.prod.mjs` to `astro.config.mjs`
3. Commit and push

Or set build command to:
```bash
cp astro.config.prod.mjs astro.config.mjs && npm run build
```

---

## 3. Backend API Deployment (Railway)

Railway is the easiest for Java/Spring Boot. Alternative: Render, Fly.io.

### Step 1: Create Railway Account

1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. Click **New Project** → **Deploy from GitHub repo**
4. Select `george-itf/national-nines-api`

### Step 2: Add PostgreSQL Database

1. In your Railway project, click **+ New**
2. Select **Database** → **PostgreSQL**
3. Railway creates the database and sets `DATABASE_URL` automatically

### Step 3: Configure Environment Variables

Click on your service → **Variables** → **Add Variable**:

| Variable | Value |
|----------|-------|
| `SPRING_PROFILES_ACTIVE` | `prod` |
| `PORT` | `8080` |
| `STRIPE_API_KEY` | `sk_live_...` (from Stripe) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` (from Stripe) |
| `FRONTEND_URL` | `https://nationalninesgolf.co.uk` |
| `ADMIN_EMAIL` | `info@nationalninesgolf.co.uk` |
| `ADMIN_API_KEY` | Generate: `openssl rand -hex 32` |
| `MAIL_HOST` | `smtp.gmail.com` (or your provider) |
| `MAIL_PORT` | `587` |
| `MAIL_USERNAME` | Your email |
| `MAIL_PASSWORD` | App password |

> `DATABASE_URL` is auto-injected by Railway

### Step 4: Configure Domain

1. Go to **Settings** → **Networking** → **Generate Domain**
2. You'll get something like `national-nines-api-production.up.railway.app`
3. To use custom domain `api.nationalninesgolf.co.uk`:
   - Click **Custom Domain** → enter `api.nationalninesgolf.co.uk`
   - Add CNAME record in Cloudflare:
     ```
     Type: CNAME
     Name: api
     Target: national-nines-api-production.up.railway.app
     Proxy: OFF (DNS only - grey cloud)
     ```

### Step 5: Deploy

Railway auto-deploys on push. Check logs for startup:
```
Started NationalNinesApiApplication in X seconds
```

### Step 6: Test API

```bash
# Health check
curl https://api.nationalninesgolf.co.uk/api/health

# Admin (with API key)
curl -H "X-API-Key: your-key" https://api.nationalninesgolf.co.uk/api/admin/dashboard
```

---

## 4. Stripe Configuration

### Step 1: Create Stripe Account

1. Go to [Stripe](https://stripe.com) and sign up
2. Complete business verification (required for live payments)
3. Go to **Developers** → **API keys**
4. Copy:
   - **Publishable key**: `pk_live_...` (for frontend, not used yet)
   - **Secret key**: `sk_live_...` (for backend)

### Step 2: Configure Webhook

1. Go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. URL: `https://api.nationalninesgolf.co.uk/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click **Add endpoint**
6. Copy the **Signing secret**: `whsec_...`
7. Add to Railway environment variables

### Step 3: Test Mode

For testing, use test keys (`sk_test_...`) and test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

---

## 5. Email Setup

### Option A: Gmail (Simple)

1. Enable 2-Factor Authentication on your Google account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Generate password for "Mail"
4. Use in Railway:
   ```
   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USERNAME=your@gmail.com
   MAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx
   ```

### Option B: Custom Domain Email (Professional)

Use Cloudflare Email Routing + Gmail:

1. In Cloudflare, go to **Email** → **Email Routing**
2. Add destination: your personal email
3. Create route: `info@nationalninesgolf.co.uk` → your email
4. For sending, use Gmail SMTP with "Send as" alias

### Option C: Dedicated Email Service

For higher volume, use:
- **Resend** (easy API, free tier)
- **SendGrid** (robust, free tier)
- **Postmark** (transactional focused)

---

## 6. Final Configuration

### Enable API in Frontend

Once backend is deployed and tested:

1. Edit `src/pages/events/kent-nines.astro`
2. Change `const USE_API = false;` to `const USE_API = true;`
3. Do same for `essex-nines.astro` and `cart.astro`
4. Commit and push

### Cloudflare Settings (Recommended)

In Cloudflare Dashboard:

1. **SSL/TLS** → Set to **Full (strict)**
2. **Speed** → **Optimization**:
   - Enable Auto Minify (JS, CSS, HTML)
   - Enable Brotli compression
3. **Caching** → **Configuration**:
   - Browser Cache TTL: 4 hours
4. **Security** → **Settings**:
   - Security Level: Medium
   - Enable Bot Fight Mode

### DNS Records Summary

Your Cloudflare DNS should have:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | @ | `national-nines-golf.pages.dev` | ✅ Proxied |
| CNAME | www | `national-nines-golf.pages.dev` | ✅ Proxied |
| CNAME | api | `your-railway-url.up.railway.app` | ❌ DNS only |
| MX | @ | (email provider records) | - |
| TXT | @ | (SPF/DKIM if sending email) | - |

---

## 7. Go-Live Checklist

### Pre-Launch

- [ ] Domain pointing to Cloudflare
- [ ] SSL certificates active (green padlock)
- [ ] Frontend deploying successfully
- [ ] Backend API responding
- [ ] Database connected
- [ ] Stripe webhook configured
- [ ] Test payment flow (use test mode)
- [ ] Test entry form submission
- [ ] Test contact form
- [ ] Check mobile responsiveness
- [ ] Verify all links work

### Launch Day

- [ ] Switch Stripe to live mode (swap API keys)
- [ ] Enable `USE_API = true` in frontend
- [ ] Test a real £1 payment (refund after)
- [ ] Monitor error logs
- [ ] Submit sitemap to Google Search Console

### Post-Launch

- [ ] Set up Google Search Console
- [ ] Set up Google Analytics (optional)
- [ ] Monitor Railway logs for errors
- [ ] Set up uptime monitoring (UptimeRobot free)

---

## Quick Reference

| Service | URL | Dashboard |
|---------|-----|-----------|
| Website | https://nationalninesgolf.co.uk | Cloudflare Pages |
| API | https://api.nationalninesgolf.co.uk | Railway |
| Payments | - | Stripe Dashboard |
| DNS | - | Cloudflare |
| Repos | github.com/george-itf/national-nines-* | GitHub |

### Support Contacts

- Cloudflare: support.cloudflare.com
- Railway: railway.app/help
- Stripe: support.stripe.com

---

## Troubleshooting

### "DNS_PROBE_FINISHED_NXDOMAIN"
- Nameservers not propagated yet. Wait up to 48h, or check with `dig nationalninesgolf.co.uk NS`

### "502 Bad Gateway" on API
- Backend not running. Check Railway logs.

### Stripe webhook failures
- Check webhook signing secret matches
- Ensure endpoint URL is correct (https, not http)
- Check Railway logs for errors

### Emails not sending
- Verify SMTP credentials
- Check spam folder
- Gmail: ensure app password, not regular password

---

*Guide created: January 2026*
*For National Nines Golf Ltd*
