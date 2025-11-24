# Google Sheets Setup - Two Separate Sheets

You need to create TWO separate Google Sheets with Apps Scripts to collect form submissions.

## Sheet 1: Orders (High Priority - Paying Customers)

### Step 1: Create the Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new sheet
3. Name it: **"Website Orders"**

### Step 2: Set Up Column Headers
In Row 1, add these headers:
- A1: `Timestamp`
- B1: `Name`
- C1: `Email`
- D1: `Phone`
- E1: `Business Name`
- F1: `Package`
- G1: `Base Price`
- H1: `Upsells`
- I1: `Total Price`
- J1: `Project Details`
- K1: `Inspiration Website`

### Step 3: Create Apps Script
1. Click **Extensions** → **Apps Script**
2. Delete any code in the editor
3. Paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Format phone number as text by prefixing with apostrophe
    // This preserves + signs and leading zeros
    const phoneFormatted = data.phone ? "'" + data.phone : '';

    // Format prices as currency strings with $ sign
    const basePriceFormatted = data.basePrice ? '$' + data.basePrice : '';
    const totalPriceFormatted = data.totalPrice ? '$' + data.totalPrice : '';

    // Add row with formatted data
    const newRow = [
      new Date(),
      data.name || '',
      data.email || '',
      phoneFormatted,
      data.businessName || '',
      data.package || '',
      basePriceFormatted,
      Array.isArray(data.selectedUpsells) ? data.selectedUpsells.join(', ') : '',
      totalPriceFormatted,
      data.projectDetails || '',
      data.inspirationWebsite || ''
    ];

    sheet.appendRow(newRow);

    // Get the row number that was just added
    const lastRow = sheet.getLastRow();

    // Format the timestamp column (A) as datetime
    sheet.getRange(lastRow, 1).setNumberFormat('M/d/yyyy h:mm:ss');

    // Format the phone column (D) as plain text (left-aligned)
    sheet.getRange(lastRow, 4).setHorizontalAlignment('left');

    // Format price columns (G, I) as left-aligned for consistency
    sheet.getRange(lastRow, 7).setHorizontalAlignment('left');
    sheet.getRange(lastRow, 9).setHorizontalAlignment('left');

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Deploy** → **New deployment**
5. Click the gear icon ⚙️ → Select **Web app**
6. Set:
   - **Description**: "Website Orders Webhook"
   - **Execute as**: Me
   - **Who has access**: Anyone
7. Click **Deploy**
8. Copy the **Web app URL** - it will look like:
   ```
   https://script.google.com/macros/s/ABC123.../exec
   ```
9. **SAVE THIS URL** - you'll need it for the checkout modal

---

## Sheet 2: Questions (Contact Form Inquiries)

### Step 1: Create the Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new sheet
3. Name it: **"Website Questions"**

### Step 2: Set Up Column Headers
In Row 1, add these headers:
- A1: `Timestamp`
- B1: `Name`
- C1: `Email`
- D1: `Message`

### Step 3: Create Apps Script
1. Click **Extensions** → **Apps Script**
2. Delete any code in the editor
3. Paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Add row with timestamp
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.message || ''
    ]);

    // Get the row number that was just added
    const lastRow = sheet.getLastRow();

    // Format the timestamp column (A) as datetime
    sheet.getRange(lastRow, 1).setNumberFormat('M/d/yyyy h:mm:ss');

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Deploy** → **New deployment**
5. Click the gear icon ⚙️ → Select **Web app**
6. Set:
   - **Description**: "Website Questions Webhook"
   - **Execute as**: Me
   - **Who has access**: Anyone
7. Click **Deploy**
8. Copy the **Web app URL** - it will look like:
   ```
   https://script.google.com/macros/s/XYZ789.../exec
   ```
9. **SAVE THIS URL** - you'll need it for the questions form

---

## Update Your Code

Once you have both URLs, you need to update your website code:

1. **For Orders (Checkout Modal)**: Keep the existing URL or update `app/components/CheckoutModal.tsx` line 123
2. **For Questions (Contact Form)**: Update `app/page.tsx` line 56 with the NEW questions URL

Let me know when you have both URLs and I'll update the code for you!

---

## Updating Existing Deployments

If you've already deployed your Apps Scripts and need to update them with the improved formatting code:

### For Both Sheets:

1. Open the Google Sheet
2. Click **Extensions** → **Apps Script**
3. Replace the entire code with the updated version above
4. Click **Deploy** → **Manage deployments**
5. Click the **Edit** button (pencil icon) next to your existing deployment
6. Under "Version", select **New version**
7. Click **Deploy**

**Important:** The Web App URL stays the same - you don't need to update your website code!

---

## Fixing Existing Data (One-Time Setup)

If you already have data in your sheets with formatting issues, apply this one-time manual formatting:

### For Orders Sheet:

1. **Column A (Timestamp)**: Select column → Format → Number → Date time
2. **Column D (Phone)**: Select column → Format → Number → Plain text → Format → Align → Left
3. **Columns G & I (Prices)**: Select both columns → Format → Align → Left

### For Questions Sheet:

1. **Column A (Timestamp)**: Select column → Format → Number → Date time

This fixes existing data. All new submissions will be automatically formatted correctly by the updated Apps Script!

---

## Optional: Email Notifications

If you want to get emailed when someone submits a form:

1. In your Google Sheet, click **Tools** → **Notification rules**
2. Select **"A user submits a form"** or **"Any changes are made"**
3. Choose **"Email - right away"**
4. Click **Save**

Now you'll get instant notifications for new orders and questions!
