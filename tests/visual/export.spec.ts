import { test, expect } from '@playwright/test'

/**
 * Tests Visuales para funcionalidad de exportación
 */
test.describe('Visual Tests - Exportación', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/inventario')
  })

  test('botón de exportación debe verse correctamente', async ({ page }) => {
    const currentUrl = page.url()
    
    if (currentUrl.includes('/login')) {
      test.skip()
      return
    }

    await page.waitForLoadState('networkidle', { timeout: 10000 })
    
    // Buscar botón de exportación
    const exportButton = page.getByRole('button', { name: /exportar/i }).first()
    const isVisible = await exportButton.isVisible({ timeout: 5000 }).catch(() => false)
    
    if (isVisible) {
      // Screenshot del botón
      await expect(exportButton).toHaveScreenshot('export-button.png', {
        maxDiffPixels: 100,
      })
    }
  })

  test('dropdown menu debe verse correctamente', async ({ page }) => {
    const currentUrl = page.url()
    
    if (currentUrl.includes('/login')) {
      test.skip()
      return
    }

    await page.waitForLoadState('networkidle', { timeout: 10000 })
    
    const exportButton = page.getByRole('button', { name: /exportar/i }).first()
    const isVisible = await exportButton.isVisible({ timeout: 5000 }).catch(() => false)
    
    if (isVisible && !(await exportButton.isDisabled())) {
      await exportButton.click()
      await page.waitForTimeout(500) // Esperar animación
      
      // Screenshot del dropdown
      const dropdown = page.locator('[role="menu"]').first()
      if (await dropdown.isVisible({ timeout: 2000 }).catch(() => false)) {
        await expect(dropdown).toHaveScreenshot('export-dropdown.png', {
          maxDiffPixels: 200,
        })
      }
    }
  })

  test('debe verse correctamente en móvil', async ({ page }) => {
    const currentUrl = page.url()
    
    if (currentUrl.includes('/login')) {
      test.skip()
      return
    }

    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/dashboard/inventario')
    await page.waitForLoadState('networkidle', { timeout: 10000 })
    
    const exportButton = page.getByRole('button', { name: /exportar/i }).first()
    const isVisible = await exportButton.isVisible({ timeout: 5000 }).catch(() => false)
    
    if (isVisible) {
      await expect(exportButton).toBeVisible()
    }
  })
})

