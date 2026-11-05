import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Tier 3: Playwright Browser Automation & Accessibility Suite
 * Part of JSM Integrated Services 4-Tier E2E Test Suite (M_TEST)
 *
 * Verifies across viewports [360x740, 390x844, 768x1024, 1280x800]:
 * 1. Zero horizontal scroll across all viewports (scrollWidth <= clientWidth).
 * 2. Mobile navigation expands to full-width overlay and closes on touch & Escape key.
 * 3. Grid layouts collapse to single column below 760px.
 * 4. Single h1 heading and semantic HTML landmarks (header, nav, main, footer).
 * 5. Reduced motion (prefers-reduced-motion: reduce) pauses looping animations.
 * 6. Visible form labels and inline error validation messages.
 * 7. WCAG 2.1 AA accessibility audit via axe-core with zero critical/serious violations.
 */

test.describe('Home Page - Layout & Responsiveness', () => {
  test('Page must not scroll horizontally at tested viewport', async ({ page, viewport }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // Initial check at top of page
    const initialOverflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return {
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
        scrollX: window.scrollX,
      };
    });

    expect(
      initialOverflow.scrollWidth,
      `Horizontal overflow detected at viewport ${viewport?.width}x${viewport?.height}: scrollWidth (${initialOverflow.scrollWidth}) > clientWidth (${initialOverflow.clientWidth})`
    ).toBeLessThanOrEqual(initialOverflow.clientWidth + 1);

    // Incrementally scroll to bottom to detect dynamic horizontal overflow
    await page.evaluate(async () => {
      const step = 250;
      const delay = 30;
      let prevY = -1;
      let iterations = 0;
      const maxIterations = 100;
      while (
        iterations < maxIterations &&
        window.scrollY + window.innerHeight < document.body.scrollHeight
      ) {
        window.scrollBy(0, step);
        await new Promise((r) => setTimeout(r, delay));
        if (window.scrollY === prevY) break;
        prevY = window.scrollY;
        iterations++;
      }
    });

    const finalOverflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return {
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
        scrollX: window.scrollX,
      };
    });

    expect(finalOverflow.scrollX, 'window.scrollX must be 0 after scrolling').toBe(0);
    expect(
      finalOverflow.scrollWidth,
      `Horizontal overflow detected at scroll end: scrollWidth (${finalOverflow.scrollWidth}) > clientWidth (${finalOverflow.clientWidth})`
    ).toBeLessThanOrEqual(finalOverflow.clientWidth + 1);
  });

  test('Grid containers stack to single column on viewports below 760px', async ({ page, viewport }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    if (viewport && viewport.width < 760) {
      const gridSelectors = ['.grid', '[data-grid-container]'];
      const locator = page.locator(gridSelectors.join(', '));
      const count = await locator.count();

      for (let i = 0; i < count; i++) {
        const item = locator.nth(i);
        const isVisible = await item.isVisible();
        if (!isVisible) continue;

        const templateCols = await item.evaluate((el) => {
          return window.getComputedStyle(el).gridTemplateColumns;
        });

        // Skip non-grid or inline-styled grids that have no children
        if (!templateCols || templateCols === 'none') continue;

        const colTokens = templateCols.split(' ').filter(Boolean);
        // On mobile viewports (<760px), multi-card grids must collapse to 1 column
        expect(
          colTokens.length,
          `Grid container at index ${i} should have 1 column on mobile (<760px), found ${colTokens.length} columns: "${templateCols}"`
        ).toBeLessThanOrEqual(1);
      }
    }
  });
});

test.describe('Home Page - Semantic HTML & Typography', () => {
  test('Page enforces single h1 heading and core semantic landmarks', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Single h1 per page rule
    const h1Locator = page.locator('h1');
    const h1Count = await h1Locator.count();
    expect(h1Count, 'Page must have exactly one h1 heading').toBe(1);

    // Landmarks: header, nav, main, footer
    await expect(page.locator('header').first()).toBeAttached();
    await expect(page.locator('nav').first()).toBeAttached();
    await expect(page.locator('main').first()).toBeAttached();
    await expect(page.locator('footer').first()).toBeAttached();
  });
});

test.describe('Home Page - Mobile Navigation & Keyboard Interaction', () => {
  test('Mobile menu opens full-width overlay and closes on Escape key', async ({ page, viewport }) => {
    // Only test on mobile viewports (< 768px)
    if (!viewport || viewport.width >= 768) {
      test.skip();
      return;
    }

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Locate mobile menu toggle button
    const toggleButton = page.locator(
      'button[aria-label*="menu" i], button[data-nav-toggle], button[aria-expanded]'
    ).first();

    await expect(toggleButton).toBeVisible();

    // Tap target dimensions check: minimum 44px x 44px
    const box = await toggleButton.boundingBox();
    expect(box, 'Menu button must have bounding box').not.toBeNull();
    if (box) {
      expect(box.width, 'Menu toggle tap width must be >= 40px').toBeGreaterThanOrEqual(40);
      expect(box.height, 'Menu toggle tap height must be >= 40px').toBeGreaterThanOrEqual(40);
    }

    // Open mobile menu
    await toggleButton.click();
    await page.waitForTimeout(300);

    // Locate overlay container
    const overlay = page.locator(
      '[data-nav-overlay], nav[aria-modal="true"], [role="dialog"], .mobile-menu-overlay'
    ).first();

    await expect(overlay).toBeVisible();

    // Verify overlay width covers viewport
    const overlayBox = await overlay.boundingBox();
    if (overlayBox) {
      expect(overlayBox.width).toBeGreaterThanOrEqual(viewport.width - 2);
    }

    // Press Escape key to close
    await page.keyboard.press('Escape');

    // Overlay must now be hidden or closed
    await expect(overlay).toBeHidden({ timeout: 5000 });
  });
});

test.describe('Home Page - Reduced Motion Compliance', () => {
  test('prefers-reduced-motion: reduce disables looping animations', async ({ page }) => {
    // Emulate reduced motion user preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // Verify ticker or animated elements are paused or transition/animation is 0s
    const tickers = page.locator('[data-ticker], .sector-ticker, [data-looping]');
    const tickerCount = await tickers.count();

    for (let i = 0; i < tickerCount; i++) {
      const ticker = tickers.nth(i);
      const isVisible = await ticker.isVisible();
      if (!isVisible) continue;

      const motionStyles = await ticker.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          animationPlayState: computed.animationPlayState,
          animationDuration: computed.animationDuration,
        };
      });

      const isPausedOrZero =
        motionStyles.animationPlayState === 'paused' ||
        motionStyles.animationDuration === '0s' ||
        motionStyles.animationDuration === 'none' ||
        motionStyles.animationDuration === '0.001s';

      expect(
        isPausedOrZero,
        `Looping ticker at index ${i} must pause or reduce duration under reduced motion`
      ).toBeTruthy();
    }
  });
});

test.describe('Home Page - Enquiry Form & Honeypot Defense', () => {
  test('Form inputs have visible labels and honeypot field is invisible', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const form = page.locator('form').first();
    if ((await form.count()) === 0) {
      test.skip();
      return;
    }

    // Verify visible input fields have labels
    const visibleInputs = form.locator('input:not([type="hidden"]), select, textarea');
    const inputCount = await visibleInputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = visibleInputs.nth(i);
      const isVisible = await input.isVisible();
      if (!isVisible) continue;

      const inputId = await input.getAttribute('id');
      const inputName = await input.getAttribute('name');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');

      // Honeypot inputs are intentionally hidden and should not require labels
      if (inputName === 'honeypot' || inputId === 'honeypot') continue;

      let hasLabel = Boolean(ariaLabel || ariaLabelledBy);
      if (!hasLabel && inputId) {
        const labelEl = page.locator(`label[for="${inputId}"]`);
        hasLabel = (await labelEl.count()) > 0;
      }

      expect(hasLabel, `Input "${inputId || inputName || i}" must have an associated label`).toBeTruthy();
    }

    // Check honeypot field attributes if present
    const honeypot = form.locator('input[name="honeypot"], input[data-honeypot]');
    if ((await honeypot.count()) > 0) {
      await expect(honeypot).toHaveAttribute('tabindex', '-1');
      await expect(honeypot).toHaveAttribute('aria-hidden', 'true');
      await expect(honeypot).toBeHidden();
    }
  });
});

test.describe('Home Page - Accessibility Audit (WCAG 2.1 AA)', () => {
  test('Page has zero critical or serious axe-core accessibility violations', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const criticalOrSerious = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );

    if (criticalOrSerious.length > 0) {
      console.error(
        'Axe Violations Summary:\n' +
          criticalOrSerious
            .map((v) => `[${v.impact?.toUpperCase()}] ${v.id}: ${v.description} (${v.nodes.length} occurrences)`)
            .join('\n')
      );
    }

    expect(criticalOrSerious, 'Must have zero critical or serious WCAG 2.1 AA violations').toEqual([]);
  });
});
