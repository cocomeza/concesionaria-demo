/**
 * Helpers para tests
 */

export async function waitForPageLoad(page: any, timeout = 10000) {
  try {
    await page.waitForLoadState('networkidle', { timeout })
  } catch {
    // Si falla networkidle, al menos esperar domcontentloaded
    await page.waitForLoadState('domcontentloaded', { timeout })
  }
}

export async function waitForElement(page: any, selector: string, timeout = 10000) {
  try {
    await page.waitForSelector(selector, { timeout })
    return true
  } catch {
    return false
  }
}

export function isElementVisible(locator: any): Promise<boolean> {
  return locator.isVisible({ timeout: 5000 }).catch(() => false)
}

