# Google Sheets Form Backend Setup Guide

## Step 1: Create Google Sheet

1. Go to https://sheets.google.com
2. Click **+ Blank** to create a new spreadsheet
3. Name it **"Net Money Applications"**
4. In Row 1, add these column headers (exactly as written):
   - **A1:** Timestamp
   - **B1:** First Name
   - **C1:** Last Name
   - **D1:** Email
   - **E1:** Phone
   - **F1:** Referral Source

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any code in the editor
3. Paste this ENTIRE code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);

    // Create timestamp
    var timestamp = new Date();

    // Append data to sheet
    sheet.appendRow([
      timestamp,
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.referralSource
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Step 3: Deploy the Script

1. Click the **Deploy** button (top right) → **New deployment**
2. Click the **gear icon** next to "Select type"
3. Choose **Web app**
4. Settings:
   - **Description:** "Net Money Form Handler"
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
5. Click **Deploy**
6. Click **Authorize access** when prompted
7. Choose your Google account
8. Click **Advanced** → **Go to [project name] (unsafe)**
9. Click **Allow**
10. **COPY THE WEB APP URL** - it looks like:
    `https://script.google.com/macros/s/AKfycbz.../exec`

## Step 4: Update Your Website Code

1. Open `/Users/Micko/yaupicks-clone/app/page.tsx`
2. Find line 37 that says: `const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your actual URL from Step 3
4. Save the file

## Step 5: Rebuild and Redeploy

Run these commands in Terminal:

```bash
cd /Users/Micko/yaupicks-clone
npm run build
firebase deploy
```

## Done!

Now when someone fills out the form on https://net-money-group.web.app, their information will automatically appear in your Google Sheet!

## How Your Client Views Applications

Just send them the Google Sheets link! They can:
- View all applications in real-time
- Sort and filter data
- Export to Excel/PDF
- Share with team members
- No coding knowledge needed!

## Troubleshooting

If form submissions aren't appearing:
1. Check that the Apps Script URL is correct in `page.tsx`
2. Make sure the script is deployed as "Anyone" can access
3. Check the Google Sheet has the correct column headers
