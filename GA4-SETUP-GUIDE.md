# Google Analytics 4 (GA4) Setup Guide

Follow these steps to get your GA4 Measurement ID and start tracking conversions on your lead gen funnel.

---

## Step 1: Create a Google Analytics Account

1. Go to https://analytics.google.com/
2. Click **"Start measuring"** or **"Admin"** (bottom left gear icon)
3. Click **"Create Account"**
4. Enter account name: `WebDev Pro` (or your business name)
5. Configure data sharing settings (leave defaults)
6. Click **"Next"**

---

## Step 2: Create a Property

1. Property name: `Lead Gen Funnel` or `WebDev Pro Website`
2. Select your timezone and currency
3. Click **"Next"**

---

## Step 3: Set Up Data Stream

1. Select platform: **"Web"**
2. Enter your website URL: `https://lead-gen-funnel.vercel.app`
3. Stream name: `Lead Gen Funnel Production`
4. Click **"Create stream"**

---

## Step 4: Get Your Measurement ID

After creating the stream, you'll see:

```
Measurement ID: G-XXXXXXXXXX
```

**Copy this ID** - you'll need it in the next step!

It looks like: `G-ABC123DEF4` (starts with G-)

---

## Step 5: Add Measurement ID to Your Site

1. Open your project in your code editor
2. Create a file: `.env.local` in the root directory
3. Add this line:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID

4. Save the file
5. I'll handle the rest! (The tracking code is already integrated)

---

## Step 6: Verify It's Working

1. After deploying, go back to Google Analytics
2. Go to **Reports** → **Realtime**
3. Open your website in a new tab
4. You should see yourself show up as "1 user right now"

If you see activity, you're all set!

---

## What We're Tracking

Your GA4 is configured to track:

### Events:
- **page_view** - Every page visit
- **checkout_opened** - When someone clicks "Start Project Now"
- **package_selected** - Which pricing tier they chose (Basic/Pro/Premium)
- **upsell_selected** - Which add-ons they picked
- **form_submitted** - When they submit the checkout form
- **ab_test_variant_view** - Which A/B test variant they saw

### User Properties:
- **variant** - A/B test group (variant_a or variant_b)

---

## Viewing A/B Test Results

After 7-14 days of traffic:

1. Go to **Explore** → **Create new exploration**
2. Add dimension: **Event name** = `form_submitted`
3. Add dimension: **User property** = `variant`
4. Add metric: **Event count**
5. Compare conversion rates between variant_a and variant_b

**Winner = whichever variant has more conversions!**

---

## Important Notes

- ✅ GA4 is free forever
- ✅ Data appears within 24-48 hours (Realtime is instant)
- ✅ Keep your Measurement ID private (it's in .env.local which is gitignored)
- ✅ You can view analytics on mobile via the Google Analytics app

---

## Troubleshooting

**Not seeing data?**
1. Check Measurement ID is correct in `.env.local`
2. Restart your dev server: `npm run dev`
3. Clear browser cache and revisit site
4. Check browser console for errors (F12 → Console tab)

**Need help?**
Email me at jamesfinleymcmillan@gmail.com with your Measurement ID and I'll troubleshoot!

---

## Next Steps

Once GA4 is set up, you can:
1. View which pricing tier converts best
2. See which urgency message (A/B test) performs better
3. Track ROI on any ads you run
4. Make data-driven improvements to your funnel

Happy tracking! 📊
