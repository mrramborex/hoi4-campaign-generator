const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  const failures = [];
  const screenshotDir = path.join(process.cwd(), 'phase22b-artifacts');
  fs.mkdirSync(screenshotDir, { recursive: true });
  try {
    await page.goto('http://127.0.0.1:8765/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForFunction(() => typeof window.HOI4WarRoomPhase22BArchiveUIAudit === 'function', { timeout: 10000 });
    const checks = await page.evaluate(() => ({
      generic: window.HOI4WarRoomPhase22AGenericAudit?.(),
      identity: window.HOI4WarRoomPhase22AIdentityAudit?.(),
      classification: window.HOI4WarRoomPhase22BClassificationAudit?.(),
      validation: window.HOI4WarRoomPhase22BPilotValidationAudit?.(),
      archive: window.HOI4WarRoomPhase22BArchiveUIAudit?.()
    }));
    for (const [name, result] of Object.entries(checks)) {
      console.log(name, JSON.stringify(result));
      if (!result || result.passed !== true) failures.push(name);
    }
    await page.locator('#navAchievements').click();
    const desktopArchive = await page.evaluate(() => ({
      visibleIntelligenceChips: document.querySelectorAll('#achievementGrid .ach-intel').length,
      editorialLabels: document.querySelectorAll('#achievementGrid .ach-intel-label').length,
      catalogCount: document.getElementById('mappedCount')?.textContent.trim()
    }));
    console.log('desktop-archive', JSON.stringify(desktopArchive));
    // Capture a single reviewed achievement so the images are readable in PR review.
    await page.locator('#achSearch').fill('True Blitzkrieg');
    await page.locator('#achievementGrid .ach-intel').first().waitFor({ state: 'visible' });
    await page.screenshot({ path: path.join(screenshotDir, 'phase22b-desktop-archive.png'), fullPage: true });
    await page.locator('#achSearch').fill('');
    if (desktopArchive.visibleIntelligenceChips !== 5 || desktopArchive.editorialLabels !== 5 || desktopArchive.catalogCount !== '293')
      failures.push('desktop-archive-cards');
    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    await mobile.goto('http://127.0.0.1:8765/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await mobile.locator('#navAchievements').click();
    const mobileStatus = await mobile.evaluate(() => ({
      archivePresent: !!document.getElementById('achievementCenter'),
      visibleIntelligenceChips: document.querySelectorAll('#achievementGrid .ach-intel').length,
      overflow: document.documentElement.scrollWidth > window.innerWidth + 2,
      archiveOverflow: document.getElementById('achievementCenter').scrollWidth > window.innerWidth + 2
    }));
    console.log('mobile', JSON.stringify(mobileStatus));
    await mobile.locator('#achSearch').fill('True Blitzkrieg');
    await mobile.locator('#achievementGrid .ach-intel').first().waitFor({ state: 'visible' });
    await mobile.screenshot({ path: path.join(screenshotDir, 'phase22b-mobile-archive.png'), fullPage: true });
    if (!mobileStatus.archivePresent || mobileStatus.visibleIntelligenceChips !== 5 || mobileStatus.overflow || mobileStatus.archiveOverflow) failures.push('mobile-layout');
    await mobile.close();
    if (failures.length) throw new Error('Failed checks: ' + failures.join(', '));
    console.log('Phase 22B smoke tests passed.');
  } finally {
    await browser.close();
  }
})().catch(err => { console.error(err); process.exitCode = 1; });
