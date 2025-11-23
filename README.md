# Lead Generation Funnel - Web Development Services

A complete, automated lead generation funnel for freelance web developers. This landing page captures leads, integrates with Google Sheets for CRM, and includes email automation templates to nurture prospects into paying clients.

**Live Demo Case Study**: [Net Money Group](https://net-money-group.web.app)

## Features

- **Professional Landing Page**: Modern, dark-themed design with smooth animations
- **Case Study Showcase**: Built-in section to showcase your best work (Net Money Group example included)
- **3-Tier Pricing**: Clear pricing structure ($500, $1,000, $2,000+) with detailed features
- **Lead Capture Form**: Collects name, email, phone, business type, budget, and current website
- **Google Sheets Integration**: All form submissions automatically saved to Google Sheets (no database needed)
- **Calendly Integration**: Book strategy calls directly from the landing page
- **Email Automation Templates**: 4-email nurture sequence to convert leads (see EMAIL_TEMPLATES.md)
- **Mobile Responsive**: Looks perfect on all devices
- **SEO Optimized**: Proper meta tags, Open Graph, and semantic HTML
- **Fast Performance**: Built with Next.js for blazing-fast load times
- **Static Export**: Pre-rendered pages for maximum speed and reliability

## Tech Stack

- **Framework**: Next.js 16.0.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Fonts**: Geist Sans & Geist Mono (optimized by Next.js)
- **Form Backend**: Google Apps Script + Google Sheets
- **Email Automation**: Mailchimp (free tier)
- **Booking**: Calendly integration
- **Deployment**: Vercel (recommended) or any static host

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 3. Build for Production

```bash
npm run build
```

This creates a static export in the `out/` directory.

## Complete Setup Guide

### Step 1: Google Sheets Integration

The form submissions are saved to Google Sheets using Google Apps Script.

1. **Create a Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new spreadsheet
   - Name it "Lead Gen Funnel Submissions"
   - Add headers in row 1: `Timestamp`, `Name`, `Email`, `Phone`, `Business Type`, `Website URL`, `Budget`

2. **Create Apps Script**
   - In your Google Sheet, click `Extensions` → `Apps Script`
   - Delete any existing code
   - Paste this code:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  var timestamp = new Date();

  sheet.appendRow([
    timestamp,
    data.name,
    data.email,
    "'" + data.phone,  // Prefix with ' to preserve leading zeros
    data.businessType,
    data.websiteUrl,
    data.budget
  ]);

  return ContentService.createTextOutput(JSON.stringify({
    'result': 'success',
    'message': 'Data saved successfully'
  })).setMimeType(ContentService.MimeType.JSON);
}
```

3. **Deploy the Script**
   - Click `Deploy` → `New deployment`
   - Click the gear icon ⚙️ next to "Select type"
   - Choose `Web app`
   - Settings:
     - **Description**: Lead Gen Form Handler
     - **Execute as**: Me
     - **Who has access**: Anyone
   - Click `Deploy`
   - **Copy the Web App URL** - you'll need this next

4. **Update the Form Handler**
   - Open `/app/page.tsx`
   - Find line 43: `const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
   - Replace with your actual script URL
   - Save the file

5. **Test the Form**
   - Run `npm run dev`
   - Fill out the form
   - Check your Google Sheet - the submission should appear

### Step 2: Calendly Integration

1. **Create Calendly Account**
   - Go to [Calendly](https://calendly.com) and sign up (free tier works fine)
   - Create a new event type: "15-minute Strategy Call"
   - Set your availability

2. **Get Embed Code**
   - In Calendly, go to your event
   - Click the "Copy Link" button to get your Calendly URL

3. **Add to Website**
   - Open `/app/page.tsx`
   - Find line 660: `href="https://calendly.com"`
   - Replace with your actual Calendly link

**Optional**: For inline embed (shows calendar directly on page):
   - In Calendly, click "Share" → "Add to website" → "Inline embed"
   - Copy the embed code
   - Replace the placeholder code in `/app/page.tsx` lines 636-657

### Step 3: Email Automation Setup

See **EMAIL_TEMPLATES.md** for complete instructions, but here's the quick version:

1. **Sign up for Mailchimp** (free up to 500 contacts)
2. **Connect Google Sheets to Mailchimp** using Zapier:
   - Trigger: New row in Google Sheets
   - Action: Add subscriber to Mailchimp audience
3. **Create 4-email automation sequence** using the templates provided
4. **Set delays**: Email 1 (immediate), Email 2 (+2 days), Email 3 (+4 days), Email 4 (+7 days)

### Step 4: Customize Your Content

#### Update Contact Information

In `/app/page.tsx`, update the footer (lines 708-709):
```tsx
<li>Email: contact@webdevpro.com</li>  // Your email
<li>Phone: +1 (555) 123-4567</li>      // Your phone
```

#### Update Social Media Links

In `/app/page.tsx`, footer section (lines 712-727), update the `href` attributes with your actual social media profiles.

#### Customize Pricing

Edit the pricing tiers in `/app/page.tsx` (lines 284-445) to match your actual services and prices.

#### Change Branding

1. **Logo/Name**: Find "WebDev Pro" in `/app/page.tsx` (lines 80, 680) and replace with your business name
2. **Colors**: The site uses emerald-500 as the primary color. Search and replace with your brand color:
   - `emerald-500` → `blue-500` (or any Tailwind color)
   - `emerald-600` → `blue-600`
   - `emerald-400` → `blue-400`
   - `emerald-700` → `blue-700`

3. **Favicon**: Replace `/public/icon.svg` with your own logo/icon

#### Update Case Study

Replace the Net Money case study with your own best project:
- Edit lines 183-281 in `/app/page.tsx`
- Update project name, description, results
- Change the live site URL

### Step 5: Deploy to Vercel

Vercel is recommended because it's built by the creators of Next.js and offers automatic deployments on git push.

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Lead gen funnel"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign up (free tier is perfect)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Automatic Deployments**
   - Every time you push to GitHub, Vercel automatically rebuilds and deploys
   - Preview URLs for every branch/PR
   - Production URL updates when you push to main branch

4. **Custom Domain** (Optional)
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed by Vercel

## Project Structure

```
lead-gen-funnel/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main landing page (all sections)
│   ├── globals.css         # Global styles and Tailwind
│   └── icon.svg            # Favicon
├── public/                 # Static assets
├── EMAIL_TEMPLATES.md      # Email automation templates
├── next.config.ts          # Next.js configuration (static export)
├── package.json            # Dependencies
├── tailwind.config.ts      # Tailwind CSS config
└── README.md              # This file
```

## Customization Guide

### Changing the Color Scheme

The site uses a dark theme with emerald accents. To change:

1. **Background colors**: `stone-950`, `stone-900`, `stone-800`
2. **Text colors**: `stone-100`, `stone-300`, `stone-400`
3. **Accent color**: `emerald-500`, `emerald-600`, `emerald-400`

Search and replace these in `/app/page.tsx` and `/app/globals.css`.

### Adding More Sections

The landing page is structured in sections. To add a new section:

1. Create a new `<section>` element in `/app/page.tsx`
2. Add an `id` attribute for navigation (e.g., `id="testimonials"`)
3. Add a navigation link in the header (lines 84-93)
4. Style consistently with other sections

### Modifying the Form

To add/remove form fields:

1. Update the `formData` state (line 8-15 in `/app/page.tsx`)
2. Add/remove input fields in the form JSX (lines 461-567)
3. Update the Google Apps Script to match (add column headers and data fields)

### Changing Fonts

The site uses Geist Sans and Geist Mono. To change:

1. Open `/app/layout.tsx`
2. Import different fonts from `next/font/google`
3. Update the font variables (lines 5-13)

## Performance Optimization

This site is already optimized, but here are the features:

- ✅ Static site generation (pre-rendered HTML)
- ✅ Optimized fonts with `next/font`
- ✅ No runtime JavaScript for initial render
- ✅ Mobile-first responsive design
- ✅ Lazy loading for form state
- ✅ Smooth scroll animations
- ✅ Optimized images (unoptimized config for static export)

**Lighthouse Scores**: Expect 95+ on all metrics

## Troubleshooting

### Form submissions not appearing in Google Sheets

1. Check that the Apps Script is deployed as a web app
2. Verify "Who has access" is set to "Anyone"
3. Check the script URL in `/app/page.tsx` line 43
4. Look at browser console for errors (F12 → Console)
5. Test the script URL directly in a browser (should return JSON)

### Build errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Try building again
npm run build
```

### Styling issues

- Make sure Tailwind CSS is properly configured
- Check that `/app/globals.css` imports Tailwind directives
- Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

### Deployment issues

**Vercel**:
- Make sure `next.config.ts` has `output: 'export'`
- Check build logs in Vercel dashboard
- Ensure all environment variables are set (if using any)

**Other hosts** (Netlify, GitHub Pages, etc.):
- Run `npm run build` locally
- Upload the contents of the `out/` directory
- Configure to serve `index.html` for 404s (SPA fallback)

## Marketing Strategy

Once deployed, drive traffic with:

1. **Google Ads**: Target keywords like "web developer near me", "freelance web design"
2. **Facebook Ads**: Target small business owners, entrepreneurs
3. **SEO**: Blog about web development, create case studies
4. **Cold Outreach**: Email businesses with poor websites
5. **Social Media**: Share case studies, tips, behind-the-scenes
6. **Networking**: Local business groups, entrepreneur meetups

**Budget Recommendation**: Start with $10-20/day on Google or Facebook ads, track ROI, scale what works.

## Email Sequence Performance

Expected metrics for the 4-email sequence:
- **Open Rate**: 40-60% (Email 1 highest, Email 4 lowest)
- **Click Rate**: 10-20% (on links to case study, Calendly)
- **Conversion Rate**: 5-15% (leads who book a call)
- **Close Rate**: 20-40% (calls that become clients)

**Example**: 100 leads → 10 calls booked → 3 clients @ $1000 avg = $3,000 revenue

## Future Enhancements

Ideas to improve the funnel:

- [ ] Add testimonials section with real client reviews
- [ ] Create more case studies (3-5 total)
- [ ] A/B test different headlines and CTAs
- [ ] Add live chat widget (Intercom, Drift)
- [ ] Create a blog for SEO and lead magnets
- [ ] Add Google Analytics and Meta Pixel for tracking
- [ ] Create lead magnet (free website audit, checklist)
- [ ] Add video testimonials or demo video
- [ ] Implement retargeting ads for visitors who don't convert
- [ ] Create custom thank-you page with instant Calendly booking

## Support & Updates

This is a standalone project with no ongoing dependencies or subscriptions required (except Vercel/hosting if you choose a paid plan).

**Free Tier Services Used**:
- Vercel hosting (free)
- Google Sheets (free)
- Mailchimp (free up to 500 contacts)
- Calendly (free tier works fine)

**Total Cost**: $0 to start, scale as needed

## License

This project is open source and free to use for your own business. If you share or sell this template, please give credit.

## Credits

Built with Next.js, Tailwind CSS, and lots of coffee.

Case study example: Net Money Group - https://net-money-group.web.app

---

**Questions?** Open an issue on GitHub or reach out.

**Ready to get clients?** Deploy this funnel, set up your ads, and start capturing leads today.
