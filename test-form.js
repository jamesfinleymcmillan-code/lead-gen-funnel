const { chromium } = require('playwright');

async function testForm() {
  const browser = await chromium.launch({ headless: false });

  const testUsers = [
    { name: 'John Smith', email: 'john.smith.test@example.com', phone: '0412345678', package: 'Basic' },
    { name: 'Sarah Johnson', email: 'sarah.j.test@example.com', phone: '0423456789', package: 'Pro' },
    { name: 'Mike Chen', email: 'mike.chen.test@example.com', phone: '0434567890', package: 'Premium' },
    { name: 'Emma Wilson', email: 'emma.w.test@example.com', phone: '0445678901', package: 'Basic' },
    { name: 'David Lee', email: 'david.lee.test@example.com', phone: '0456789012', package: 'Pro' },
    { name: 'Lisa Brown', email: 'lisa.b.test@example.com', phone: '0467890123', package: 'Premium' },
    { name: 'Tom Davis', email: 'tom.davis.test@example.com', phone: '0478901234', package: 'Basic' },
    { name: 'Anna Martinez', email: 'anna.m.test@example.com', phone: '0489012345', package: 'Pro' },
    { name: 'Chris Taylor', email: 'chris.t.test@example.com', phone: '0490123456', package: 'Premium' },
    { name: 'Rachel White', email: 'rachel.w.test@example.com', phone: '0401234567', package: 'Pro' }
  ];

  for (let i = 0; i < testUsers.length; i++) {
    const user = testUsers[i];
    console.log(`\nTesting user ${i + 1}/10: ${user.name} - ${user.package} package`);

    const page = await browser.newPage();

    try {
      // Navigate to site
      await page.goto('https://webdevpro.dev', { waitUntil: 'networkidle' });
      console.log('✓ Page loaded');

      // Wait a bit for page to fully load
      await page.waitForTimeout(2000);

      // Find and click the "Start Project Now" button for the selected package
      const buttons = await page.locator('button:has-text("Start Project Now")').all();

      let buttonIndex;
      if (user.package === 'Basic') buttonIndex = 0;
      else if (user.package === 'Pro') buttonIndex = 1;
      else buttonIndex = 2;

      await buttons[buttonIndex].click();
      console.log(`✓ Clicked ${user.package} package button`);

      // Wait for modal to appear
      await page.waitForTimeout(1000);

      // Fill out the form
      await page.fill('input[name="name"]', user.name);
      console.log('✓ Filled name');

      await page.fill('input[name="email"]', user.email);
      console.log('✓ Filled email');

      await page.fill('input[name="phone"]', user.phone);
      console.log('✓ Filled phone');

      // Fill business name
      const businessNameField = await page.locator('input[name="businessName"]');
      if (await businessNameField.count() > 0) {
        await businessNameField.fill(`${user.name.split(' ')[0]}'s Business`);
        console.log('✓ Filled business name');
      }

      // Fill project description
      const descField = await page.locator('textarea[name="projectDescription"]');
      if (await descField.count() > 0) {
        await descField.fill('I need a professional website for my business. Looking forward to working with you!');
        console.log('✓ Filled project description');
      }

      // Submit the form
      await page.click('button[type="submit"]');
      console.log('✓ Clicked submit button');

      // Wait to see if submission was successful
      await page.waitForTimeout(3000);

      console.log(`✅ User ${i + 1} test completed!`);

    } catch (error) {
      console.error(`❌ Error testing user ${i + 1}:`, error.message);
    } finally {
      await page.close();
    }

    // Wait between submissions
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  await browser.close();
  console.log('\n🎉 All 10 test users completed!');
}

testForm().catch(console.error);
