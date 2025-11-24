# Complete Setup Guide: GA4 + Stripe Integration

This guide walks you through setting up Google Analytics 4 and Stripe payment integration for your lead gen funnel.

---

## Part 1: Google Analytics 4 Setup (15 minutes)

### Step 1: Create GA4 Account and Property

1. Go to https://analytics.google.com/
2. Sign in with your Google account
3. Click **"Start measuring"** or **"Admin"** (gear icon in bottom left)
4. Click **"Create Account"**
   - Account name: `Your Business Name`
   - Configure data sharing settings (leave defaults checked)
   - Click **"Next"**

### Step 2: Create Property

1. Property name: `Lead Gen Funnel` or `Your Business Website`
2. Select your timezone and currency
3. Click **"Next"**
4. Choose business details (select what applies to you)
5. Click **"Create"**
6. Accept Terms of Service

### Step 3: Set Up Data Stream

1. Select platform: **"Web"**
2. Website URL: Enter your Vercel deployment URL (e.g., `https://your-site.vercel.app`)
3. Stream name: `Production Website`
4. Click **"Create stream"**

### Step 4: Get Your Measurement ID

After creating the stream, you'll see:

```
Measurement ID: G-XXXXXXXXXX
```

**COPY THIS ID** - you'll need it in the next step!

Example: `G-ABC123DEF4` (always starts with `G-`)

### Step 5: Configure Locally

1. Open the file: `.env.local` in the project root
2. Find the line: `NEXT_PUBLIC_GA_MEASUREMENT_ID=YOUR_GA4_MEASUREMENT_ID_HERE`
3. Replace `YOUR_GA4_MEASUREMENT_ID_HERE` with your actual Measurement ID
4. Save the file

Example:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-ABC123DEF4
```

### Step 6: Test Locally

1. Restart your development server:
   ```bash
   npm run dev
   ```
2. Open http://localhost:3000 in your browser
3. Go back to Google Analytics → Reports → Realtime
4. You should see yourself as "1 user right now"
5. If you see activity, GA4 is working! ✅

---

## Part 2: Stripe Integration (30 minutes)

### Step 1: Create Stripe Account

1. Go to https://stripe.com
2. Click **"Start now"** or **"Sign up"**
3. Enter your email and create a password
4. Complete the account setup (you can skip verification for testing)

### Step 2: Get Test API Keys

**IMPORTANT:** Start with TEST keys to avoid real charges!

1. In Stripe Dashboard, make sure you're in **TEST MODE** (toggle in top right)
2. Go to **Developers** → **API keys** (https://dashboard.stripe.com/test/apikeys)
3. You'll see two keys:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`) - click "Reveal test key"

**COPY BOTH KEYS** - you'll need them in the next step!

### Step 3: Configure Locally

1. Open the file: `.env.local` in the project root
2. Find these lines:
   ```
   STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
   ```
3. Replace with your actual keys:
   ```
   STRIPE_SECRET_KEY=sk_test_51abc123...xyz789
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51abc123...xyz789
   ```
4. Save the file

**SECURITY NOTE:** The `.env.local` file is gitignored and won't be committed to GitHub!

### Step 4: Test Locally

1. Restart your development server:
   ```bash
   npm run dev
   ```
2. Open http://localhost:3000
3. Click on a pricing package
4. Fill out the checkout form
5. Click "Continue to Secure Checkout"
6. You should be redirected to Stripe's checkout page

**Test with Stripe's test card numbers:**
- Success: `4242 4242 4242 4242`
- Use any future expiration date (e.g., 12/34)
- Use any 3-digit CVC (e.g., 123)
- Use any ZIP code (e.g., 12345)

7. Complete the test payment
8. You should be redirected to the success page
9. Check your Google Sheets - the order should appear there

If all this works, your local setup is complete! ✅

---

## Part 3: Deploy to Vercel (Production)

### Step 1: Add Environment Variables to Vercel

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables (one at a time):

**Variable 1: GA4 Measurement ID**
- Key: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Value: `G-XXXXXXXXXX` (your actual Measurement ID)
- Scope: ✅ Production, ✅ Preview, ✅ Development
- Click **"Save"**

**Variable 2: Stripe Publishable Key**
- Key: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- Value: `pk_test_...` (your test key for now)
- Scope: ✅ Production, ✅ Preview, ✅ Development
- Click **"Save"**

**Variable 3: Stripe Secret Key**
- Key: `STRIPE_SECRET_KEY`
- Value: `sk_test_...` (your test key for now)
- Scope: ✅ Production, ✅ Preview, ✅ Development
- Click **"Save"**

### Step 2: Redeploy

After adding environment variables:

1. Go to **Deployments** tab
2. Click **"Redeploy"** on the latest deployment
   - OR just push a new commit to GitHub (Vercel auto-deploys)

### Step 3: Test on Production

1. Visit your live site (e.g., `https://your-site.vercel.app`)
2. Test the checkout flow with Stripe test cards
3. Verify GA4 is tracking (check Realtime reports)
4. Test that orders appear in Google Sheets

If everything works, you're live with TEST MODE! 🎉

---

## Part 4: Go Live with Real Payments

**ONLY do this when you're ready to accept real money!**

### Step 1: Activate Your Stripe Account

1. In Stripe Dashboard, click **"Activate your account"**
2. Complete business verification (enter business info, tax details, bank account)
3. This may take 1-2 business days for approval

### Step 2: Get Live API Keys

1. In Stripe Dashboard, toggle to **LIVE MODE** (top right)
2. Go to **Developers** → **API keys**
3. Copy your **LIVE** keys:
   - Publishable key (starts with `pk_live_...`)
   - Secret key (starts with `sk_live_...`)

### Step 3: Update Vercel Environment Variables

1. Go to Vercel → Your Project → Settings → Environment Variables
2. Edit `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`:
   - Change from `pk_test_...` to `pk_live_...`
   - Scope: ✅ Production only (keep test keys for Preview/Development)
3. Edit `STRIPE_SECRET_KEY`:
   - Change from `sk_test_...` to `sk_live_...`
   - Scope: ✅ Production only

### Step 4: Redeploy and Test

1. Redeploy your site on Vercel
2. **IMPORTANT:** Test with a REAL card first (your own)
3. Immediately refund the test payment in Stripe Dashboard
4. Verify the checkout flow works end-to-end

### Step 5: Update Local Environment (Optional)

If you want to test with live mode locally:

1. Update `.env.local` with live keys
2. **BE CAREFUL** - any payments will be real!
3. Better to keep test keys locally and only use live mode in production

---

## Part 5: Ongoing Maintenance

### Monitoring Payments

1. Check Stripe Dashboard daily: https://dashboard.stripe.com
2. View all payments, refunds, and disputes
3. Set up email notifications: Settings → Email notifications

### Monitoring Analytics

1. Check GA4 weekly: https://analytics.google.com
2. View Reports → Realtime for live traffic
3. View Reports → Engagement for historical data
4. Compare A/B test variants: Explore → Create exploration

### Checking Orders

1. Google Sheets will have all orders
2. Set up email notifications (Tools → Notification rules)
3. Get instant alerts when someone orders

---

## Troubleshooting

### GA4 Not Tracking

**Problem:** No data in GA4 Realtime reports

**Solutions:**
1. Check Measurement ID is correct in `.env.local` and Vercel
2. Restart dev server: `npm run dev`
3. Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
4. Check browser console for errors (F12 → Console)
5. Verify you're looking at the correct Property in GA4
6. Wait 24-48 hours for historical data (Realtime is instant though)

### Stripe Checkout Not Working

**Problem:** Error when clicking "Continue to Secure Checkout"

**Solutions:**
1. Check both Stripe keys are correct in `.env.local` and Vercel
2. Verify you're using TEST keys (not live keys)
3. Check browser console for errors
4. Make sure `output: 'export'` is removed from `next.config.ts`
5. Verify API route exists: `/app/api/create-checkout-session/route.ts`
6. Restart dev server

**Problem:** Redirected to blank page or error page

**Solutions:**
1. Check success/cancel page URLs in Stripe API call
2. Verify success and cancel pages exist
3. Check Vercel deployment logs for errors

### Environment Variables Not Working

**Problem:** "undefined" or missing environment variables

**Solutions:**
1. Verify variable names are EXACTLY correct (case-sensitive)
2. Make sure variable names start with `NEXT_PUBLIC_` for client-side access
3. Restart dev server after changing `.env.local`
4. Redeploy Vercel after changing environment variables
5. Check Vercel deployment logs to see if variables are loaded

### Payments Not Appearing in Google Sheets

**Problem:** Stripe checkout works but no order in Google Sheets

**Solutions:**
1. Check Google Apps Script URL is correct in `CheckoutModal.tsx`
2. Verify Apps Script is deployed as Web App with "Anyone" access
3. Check Google Sheets Apps Script execution logs
4. Test Google Sheets submission separately (before Stripe redirect)

---

## Security Checklist

Before going live, verify:

- [ ] `.env.local` is in `.gitignore` (it is by default)
- [ ] Never committed API keys to GitHub
- [ ] Test keys work locally
- [ ] Live keys are ONLY in Vercel Production environment
- [ ] Google Sheets is set to private (only you can view)
- [ ] Stripe webhook secret is secure (if using webhooks)
- [ ] SSL/HTTPS is enabled on Vercel (automatic)

---

## Need Help?

If you get stuck, email: jamesfinleymcmillan@gmail.com

Include:
- What you're trying to do
- What error you're seeing (screenshot helps!)
- Whether it's happening locally or on Vercel

---

## Summary: What You Need

### To Get Started:
1. ✅ GA4 Measurement ID (G-XXXXXXXXXX)
2. ✅ Stripe Test Keys (pk_test_... and sk_test_...)
3. ✅ Update `.env.local`
4. ✅ Update Vercel environment variables
5. ✅ Test locally
6. ✅ Test on production

### To Go Live:
1. ⚠️ Activate Stripe account (business verification)
2. ⚠️ Get Stripe Live Keys (pk_live_... and sk_live_...)
3. ⚠️ Update Vercel Production environment variables
4. ⚠️ Test with real card (then refund)
5. ✅ Start accepting real payments!

Good luck! 🚀
