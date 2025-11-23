# Deployment Guide - Lead Generation Funnel

This guide walks you through deploying your lead generation funnel to Vercel with automatic deployments from GitHub.

## Prerequisites

- Git installed and configured
- GitHub account
- Vercel account (free tier is perfect)

## Step 1: Create a New GitHub Repository

Your project is currently pointing to the old `yaupicks-clone` repository. Let's create a new one for this lead gen funnel.

### Option A: Create via GitHub Website

1. Go to [GitHub](https://github.com) and log in
2. Click the **+** icon in the top-right → **New repository**
3. Repository settings:
   - **Name**: `lead-gen-funnel` (or your preferred name)
   - **Description**: "Automated lead generation funnel for web development services"
   - **Visibility**: Private or Public (your choice)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **Create repository**
5. **Copy the repository URL** (should look like: `https://github.com/YOUR_USERNAME/lead-gen-funnel.git`)

### Option B: Create via GitHub CLI

If you have GitHub CLI installed:

```bash
gh repo create lead-gen-funnel --private --description "Automated lead generation funnel for web development services"
```

## Step 2: Update Git Remote

Your local repository is currently pointing to the yaupicks-clone repo. Let's update it to point to your new repository.

```bash
# Remove the old remote
git remote remove origin

# Add your new repository as origin
git remote add origin https://github.com/YOUR_USERNAME/lead-gen-funnel.git

# Verify the new remote
git remote -v
```

You should see your new repository URL listed.

## Step 3: Push to GitHub

Now push your code to the new GitHub repository:

```bash
# Push to the new repository
git push -u origin main
```

If you get an error about authentication:
- **HTTPS**: You may need to use a Personal Access Token instead of password
- **SSH**: Set up SSH keys if you haven't already
- **GitHub CLI**: Run `gh auth login` to authenticate

After pushing, visit your GitHub repository URL to verify your code is there.

## Step 4: Deploy to Vercel

Vercel is the recommended hosting platform for Next.js (it's built by the creators of Next.js). It offers:
- Free tier with generous limits
- Automatic deployments on git push
- Instant preview URLs for branches
- Custom domain support
- Edge network for fast global delivery

### 4.1: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Choose **Continue with GitHub** (easiest option)
4. Authorize Vercel to access your GitHub account

### 4.2: Import Your Project

1. From the Vercel dashboard, click **Add New...** → **Project**
2. Find your `lead-gen-funnel` repository in the list
3. Click **Import**

### 4.3: Configure Project

Vercel will auto-detect that this is a Next.js project. The settings should look like:

- **Framework Preset**: Next.js
- **Root Directory**: ./
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `out` (auto-detected from next.config.ts)
- **Install Command**: `npm install` (auto-detected)

**No environment variables needed** - click **Deploy**

### 4.4: Wait for Deployment

Vercel will:
1. Install dependencies (1-2 minutes)
2. Build your project (1-2 minutes)
3. Deploy to their edge network (seconds)

You'll see a confetti animation when it's done! 🎉

### 4.5: View Your Live Site

Vercel will provide:
- **Production URL**: `your-project-name.vercel.app`
- Click **Visit** to see your live site
- Share this URL to start getting leads!

## Step 5: Automatic Deployments

Congrats! Your site is now live and set up for automatic deployments.

**How it works:**
- Every time you push to `main` branch → Vercel automatically rebuilds and deploys
- Every time you create a pull request → Vercel creates a preview URL
- All deployments are logged in the Vercel dashboard

**Test it:**
1. Make a small change locally (e.g., edit a heading in `/app/page.tsx`)
2. Commit: `git add . && git commit -m "Test automatic deployment"`
3. Push: `git push`
4. Go to Vercel dashboard → see the new deployment in progress
5. Wait 2-3 minutes → your change is live!

## Step 6: Add Custom Domain (Optional)

If you have a custom domain (e.g., `youragency.com`):

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Click **Add**
4. Enter your domain name (e.g., `youragency.com`)
5. Follow Vercel's instructions to update your DNS records:
   - For domain bought on GoDaddy, Namecheap, etc.: Add A record and CNAME
   - For domain on Cloudflare: Add A record pointing to Vercel's IP
6. Wait for DNS propagation (can take 5-60 minutes)
7. Your site will be live on your custom domain with auto-SSL certificate

**Recommended domain registrars:**
- [Namecheap](https://www.namecheap.com) - $8-12/year
- [Google Domains](https://domains.google) - $12/year
- [Cloudflare](https://www.cloudflare.com) - $10/year + free CDN

## Step 7: Complete the Setup

Now that your site is live, you need to configure the integrations:

### 7.1: Google Sheets Integration

1. Follow instructions in `README.md` under "Google Sheets Integration"
2. Create your Google Sheet
3. Deploy the Apps Script
4. **Important**: Update line 43 in `/app/page.tsx` with your script URL
5. Commit and push: `git add . && git commit -m "Add Google Sheets URL" && git push`
6. Wait for Vercel to redeploy (2-3 minutes)
7. Test the form on your live site

### 7.2: Calendly Integration

1. Create your Calendly account and event
2. Get your Calendly URL
3. Update line 660 in `/app/page.tsx` with your Calendly link
4. Commit and push: `git add . && git commit -m "Add Calendly link" && git push`
5. Wait for redeployment

### 7.3: Email Automation

1. Follow instructions in `EMAIL_TEMPLATES.md`
2. Set up Mailchimp account
3. Connect Google Sheets → Mailchimp via Zapier
4. Create the 4-email automation sequence

## Step 8: Start Marketing

Your funnel is now complete and ready to generate leads! 🚀

### Immediate Next Steps:

1. **Test the entire funnel yourself:**
   - Submit the form
   - Check Google Sheets
   - Verify you receive the automated emails
   - Test Calendly booking

2. **Share with your network:**
   - Post on LinkedIn, Twitter, Facebook
   - Email your existing contacts
   - Add to your email signature

3. **Start running ads:**
   - Google Ads: Target "web developer near me", "website design"
   - Facebook Ads: Target small business owners, entrepreneurs
   - Start with $10-20/day budget
   - Track conversions in ad platforms

4. **Optimize based on data:**
   - Check Vercel Analytics for traffic
   - Monitor form submission rate
   - Track email open/click rates in Mailchimp
   - A/B test different headlines and CTAs

## Troubleshooting

### Build Failed on Vercel

**Check the build logs:**
1. Go to Vercel dashboard → Deployments
2. Click the failed deployment
3. Read the error message in the logs

**Common fixes:**
- Clear cache and redeploy (Deployments → ... menu → Redeploy)
- Ensure `next.config.ts` has `output: 'export'`
- Check that all dependencies are in `package.json`

### Site Shows 404 or Blank Page

- Verify the build completed successfully
- Check that `output: 'export'` is in `next.config.ts`
- Look at browser console for JavaScript errors (F12 → Console)

### Form Not Working on Live Site

- Make sure you updated the Google Apps Script URL in `/app/page.tsx`
- Test the script URL directly in browser (should return JSON)
- Check browser console for CORS errors
- Verify the Apps Script is deployed with "Who has access: Anyone"

### Automatic Deployments Not Working

- Check if Vercel has access to your repository (Settings → Git)
- Verify your latest commit shows in GitHub
- Try manually triggering a deployment in Vercel dashboard

### Domain Not Working

- DNS changes can take 5-60 minutes to propagate
- Verify you added the correct A record and CNAME
- Check DNS propagation: [whatsmydns.net](https://www.whatsmydns.net)
- Ensure SSL certificate is issued (Vercel does this automatically)

## Vercel Dashboard Overview

**Key sections:**
- **Deployments**: See all deployments, logs, and status
- **Analytics**: Traffic, page views, performance (free with basic metrics)
- **Settings**: Domains, environment variables, integrations
- **Logs**: Real-time function logs and errors

## Cost Breakdown

**Free Forever:**
- Vercel hosting (Hobby plan)
- GitHub repository (unlimited public, unlimited private repos)
- Google Sheets (part of free Google account)
- Mailchimp (up to 500 contacts)
- Calendly (1 event type)

**Optional Paid:**
- Custom domain: ~$10-15/year
- Mailchimp Standard (500+ contacts): $20+/month
- Vercel Pro (more bandwidth, better analytics): $20/month

**Recommended starting point:** $0 for infrastructure + $10-20/day for ads = $300-600/month total

## Monitoring Your Funnel

### Weekly Checklist:
- [ ] Check Google Sheets for new leads
- [ ] Respond to all form submissions within 24 hours
- [ ] Review Mailchimp email performance (open rates, clicks)
- [ ] Monitor Vercel Analytics for traffic trends
- [ ] Adjust ad spending based on lead quality
- [ ] Follow up with leads who booked calls

### Monthly Review:
- [ ] Calculate ROI (ad spend vs. revenue from new clients)
- [ ] A/B test new headlines, CTAs, or pricing
- [ ] Update case studies with new client work
- [ ] Refresh email templates based on performance
- [ ] Optimize the pages with lowest conversion rates

## Scaling Your Funnel

Once you're getting consistent leads:

1. **Increase ad budget** on campaigns that have positive ROI
2. **Add more case studies** to build social proof
3. **Create blog content** for SEO traffic (free leads!)
4. **Set up retargeting ads** for visitors who didn't convert
5. **Add live chat** for instant engagement (Intercom, Drift)
6. **Create lead magnets** (free website audit, checklist)
7. **Build email list** of people not ready to buy yet
8. **Hire VA** to handle initial lead qualification

## Need Help?

**Resources:**
- Vercel docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)
- This project's README: See `README.md` for full setup instructions

**Support:**
- Vercel support: [vercel.com/support](https://vercel.com/support)
- GitHub issues: Create an issue in your repository

---

**Congrats on deploying your lead generation funnel!** 🎉

Now go get those clients! Remember: the funnel only works if people see it. Focus on driving traffic through ads, SEO, and networking.

Your automated lead gen system is now live 24/7, capturing leads while you sleep. Good luck! 🚀
