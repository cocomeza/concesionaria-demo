import { test, expect } from '@playwright/test'

/**
 * Tests Visuales - Comparación de screenshots
 */
test.describe('Visual Regression Tests', () => {
  test('homepage debe verse correctamente', async ({ page }) => {
    await page.goto('/inicio')
    await page.waitForLoadState('networkidle', { timeout: 15000 })
    
    // Esperar a que las imágenes carguen
    await page.waitForTimeout(2000)
    
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      maxDiffPixels: 500, // Más tolerante a diferencias menores
      threshold: 0.3, // 30% de diferencia permitida
    })
  })

  test('catálogo de vehículos debe verse correctamente', async ({ page }) => {
    await page.goto('/vehiculos')
    await page.waitForLoadState('networkidle', { timeout: 15000 })
    await page.waitForTimeout(2000)
    
    await expect(page).toHaveScreenshot('vehicles-catalog.png', {
      fullPage: true,
      maxDiffPixels: 500,
      threshold: 0.3,
    })
  })

  test('página de login debe verse correctamente', async ({ page }) => {
    await page.goto('/login')
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(1000)
    
    await expect(page).toHaveScreenshot('login.png', {
      fullPage: true,
      maxDiffPixels: 300,
      threshold: 0.2,
    })
  })

  test('debe ser responsive en móvil', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/inicio')
    await page.waitForLoadState('networkidle')
    
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      maxDiffPixels: 100,
    })
  })

  test('debe ser responsive en tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/inicio')
    await page.waitForLoadState('networkidle')
    
    await expect(page).toHaveScreenshot('homepage-tablet.png', {
      fullPage: true,
      maxDiffPixels: 100,
    })
  })
})

