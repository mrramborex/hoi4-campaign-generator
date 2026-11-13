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
    // Phase 22C Batch 16: difficulty filter combines with search and keeps unrated records discoverable.
    const archiveFilter = page.locator('#achDifficulty');
    if (await archiveFilter.count() !== 1) failures.push('difficulty-filter-missing');
    else {
      await archiveFilter.selectOption('hard');
      await page.locator('#achSearch').fill('True Blitzkrieg');
      const hardMatches = await page.locator('#achievementGrid .ach').count();
      await archiveFilter.selectOption('easy');
      const easyMatches = await page.locator('#achievementGrid .ach').count();
      await page.locator('#achSearch').fill('');
      await archiveFilter.selectOption('unrated');
      const unrated = await page.evaluate(() => ({
        count: document.querySelectorAll('#achievementGrid .ach').length,
        chips: document.querySelectorAll('#achievementGrid .ach-intel').length,
        visible: document.getElementById('visibleCount')?.textContent
      }));
      await archiveFilter.selectOption('');
      const resetCount = await page.locator('#achievementGrid .ach').count();
      console.log('difficulty-filter', JSON.stringify({ hardMatches, easyMatches, unrated, resetCount }));
      if (hardMatches !== 1 || easyMatches !== 0 || unrated.count !== 120 ||
          unrated.chips !== 0 || unrated.visible !== '120' || resetCount !== 293) failures.push('difficulty-filter-behavior');
    }
    // A completed achievement must retain the exact same difficulty badge colors
    // as its uncompleted counterpart. Historically whole-card opacity/filter
    // desaturated these badges despite identical classes.
    // Wait for the Archive entrance animation before checking steady-state opacity.
    await page.waitForFunction(() => {
      const card = [...document.querySelectorAll('#achievementGrid .ach')]
        .find(el => el.textContent.includes('True Blitzkrieg'));
      return card && getComputedStyle(card).opacity === '1';
    }, { timeout: 6000 });
    const completedBadge = await page.evaluate(() => {
      const card = [...document.querySelectorAll('#achievementGrid .ach')]
        .find(el => el.textContent.includes('True Blitzkrieg'));
      const badge = card?.querySelector('.ach-intel-pill.difficulty-hard');
      if (!card || !badge) return { present: false };
      const getStyles = () => ({
        bg: getComputedStyle(badge).backgroundColor,
        color: getComputedStyle(badge).color,
        opacity: getComputedStyle(card).opacity,
        filter: getComputedStyle(card).filter
      });
      const before = getStyles();
      card.classList.add('is-completed');
      const after = getStyles();
      card.classList.remove('is-completed');
      return { present: true, before, after };
    });
    console.log('completed-badge', JSON.stringify(completedBadge));
    if (!completedBadge.present ||
        completedBadge.before.bg !== completedBadge.after.bg ||
        completedBadge.before.color !== completedBadge.after.color ||
        completedBadge.after.opacity !== '1' ||
        completedBadge.after.filter !== 'none') failures.push('completed-badge-color');
    // Capture a single reviewed achievement so the images are readable in PR review.
    await page.locator('#achSearch').fill('True Blitzkrieg');
    await page.locator('#achievementGrid .ach-intel').first().waitFor({ state: 'visible' });
    await page.screenshot({ path: path.join(screenshotDir, 'phase22b-desktop-archive.png'), fullPage: true });
    await page.locator('#achSearch').fill('The Pope? How many Divisions does he have?');
    await page.locator('#achievementGrid img.ach-icon').first().waitFor({ state: 'attached' });
    await page.waitForTimeout(1800);
    const popeIcon = await page.locator('#achievementGrid img.ach-icon').first().evaluate(img => ({
      loaded: img.complete && img.naturalWidth > 0,
      url: img.currentSrc,
      fallback: img.nextElementSibling?.style.display,
      retry: img.dataset.popeIconRetry || ''
    }));
    console.log('pope-icon', JSON.stringify(popeIcon));
    if (!popeIcon.loaded) failures.push('pope-achievement-icon');
    await page.locator('#achSearch').fill('');
    if (desktopArchive.visibleIntelligenceChips !== 173 || desktopArchive.editorialLabels !== 173 || desktopArchive.catalogCount !== '293')
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
    await mobile.locator('#achDifficulty').selectOption('unrated');
    const mobileUnrated = await mobile.evaluate(() => ({
      count: document.querySelectorAll('#achievementGrid .ach').length,
      chips: document.querySelectorAll('#achievementGrid .ach-intel').length,
      overflow: document.documentElement.scrollWidth > innerWidth + 2
    }));
    await mobile.locator('#achDifficulty').selectOption('');
    if (mobileUnrated.count !== 120 || mobileUnrated.chips || mobileUnrated.overflow)
      failures.push('mobile-difficulty-filter');
    await mobile.locator('#achSearch').fill('True Blitzkrieg');
    await mobile.locator('#achievementGrid .ach-intel').first().waitFor({ state: 'visible' });
    await mobile.screenshot({ path: path.join(screenshotDir, 'phase22b-mobile-archive.png'), fullPage: true });
    if (!mobileStatus.archivePresent || mobileStatus.visibleIntelligenceChips !== 173 || mobileStatus.overflow || mobileStatus.archiveOverflow) failures.push('mobile-layout');
    await mobile.close();
    if (failures.length) throw new Error('Failed checks: ' + failures.join(', '));
    console.log('Phase 22B smoke tests passed.');
  } finally {
    await browser.close();
  }
})().catch(err => { console.error(err); process.exitCode = 1; });
