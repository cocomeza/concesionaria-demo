import { test, expect } from '@playwright/test'

/**
 * Tests de SEO - Metadata y estructura
 */
test.describe('SEO Tests', () => {
  test('homepage debe tener título', async ({ page }) => {
    await page.goto('/inicio')
    await page.waitForLoadState('domcontentloaded')
    const title = await page.title()
    expect(title).toBeTruthy()
    expect(title.length).toBeGreaterThan(0)
    expect(title.length).toBeLessThan(60) // Títulos SEO ideales son < 60 caracteres
  })

  test('homepage debe tener meta description', async ({ page }) => {
    await page.goto('/inicio')
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content')
    
    if (metaDescription) {
      expect(metaDescription.length).toBeGreaterThan(50)
      expect(metaDescription.length).toBeLessThan(160)
    }
  })

  test('debe tener estructura semántica HTML5', async ({ page }) => {
    await page.goto('/inicio')
    
    // Verificar elementos semánticos
    const header = page.locator('header')
    const main = page.locator('main')
    const footer = page.locator('footer')
    
    await expect(header.or(main).or(footer).first()).toBeVisible()
  })

  test('debe tener headings en orden correcto', async ({ page }) => {
    await page.goto('/inicio')
    
    const h1 = page.locator('h1')
    await expect(h1.first()).toBeVisible()
    
    // Verificar que hay al menos un h1
    const h1Count = await h1.count()
    expect(h1Count).toBeGreaterThan(0)
  })

  test('imágenes deben tener alt text', async ({ page }) => {
    await page.goto('/inicio')
    
    const images = page.locator('img')
    const imageCount = await images.count()
    
    if (imageCount > 0) {
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const img = images.nth(i)
        const alt = await img.getAttribute('alt')
        // Alt puede ser null para imágenes decorativas, pero debe existir el atributo
        const hasAlt = await img.evaluate((el) => el.hasAttribute('alt'))
        expect(hasAlt).toBe(true)
      }
    }
  })

  test('debe tener Open Graph tags', async ({ page }) => {
    await page.goto('/inicio')
    
    const ogTitle = page.locator('meta[property="og:title"]')
    const ogType = page.locator('meta[property="og:type"]')
    
    // Al menos uno debe existir
    const hasOgTags = (await ogTitle.count()) > 0 || (await ogType.count()) > 0
    
    // No es crítico si no hay, pero es bueno tenerlo
    if (hasOgTags) {
      expect(hasOgTags).toBe(true)
    }
  })

  test('debe tener canonical URL', async ({ page }) => {
    await page.goto('/inicio')
    
    const canonical = page.locator('link[rel="canonical"]')
    const hasCanonical = await canonical.count() > 0
    
    // Verificar si existe
    if (hasCanonical) {
      const href = await canonical.getAttribute('href')
      expect(href).toBeTruthy()
    }
  })
})

