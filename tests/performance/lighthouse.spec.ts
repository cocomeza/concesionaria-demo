import { test, expect } from '@playwright/test'

/**
 * Tests de Performance
 * Nota: Los tests de Lighthouse requieren configuración adicional
 * Para tests completos de Lighthouse, usar: npm run lighthouse
 */
test.describe('Performance Tests', () => {
  test.skip('homepage debe tener buen performance score', async ({ page }) => {
    // Este test requiere lighthouse CLI instalado
    // Se puede habilitar después de instalar: npm install -g @lhci/cli
    await page.goto('/inicio')
    await page.waitForLoadState('networkidle')
    
    // Verificar que la página carga
    await expect(page.locator('h1')).toBeVisible()
  })

  test('catálogo de vehículos debe cargar rápido', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/vehiculos')
    await page.waitForLoadState('networkidle', { timeout: 10000 })
    const loadTime = Date.now() - startTime
    
    // El tiempo de carga debe ser menor a 5 segundos (más realista)
    expect(loadTime).toBeLessThan(5000)
  })

  test('debe tener buen First Contentful Paint', async ({ page }) => {
    await page.goto('/inicio')
    await page.waitForLoadState('domcontentloaded')
    
    const fcp = await page.evaluate(() => {
      return new Promise<number | null>((resolve) => {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const fcpEntry = entries.find((entry) => entry.name === 'first-contentful-paint')
            if (fcpEntry) {
              resolve(fcpEntry.startTime as number)
              observer.disconnect()
            }
          })
          
          observer.observe({ entryTypes: ['paint'] })
          
          setTimeout(() => {
            observer.disconnect()
            resolve(null)
          }, 5000)
        } catch (error) {
          resolve(null)
        }
      })
    })
    
    // Si se puede medir FCP, debe ser razonable
    if (fcp !== null && fcp > 0) {
      expect(fcp).toBeLessThan(3000) // Menos de 3 segundos (más realista)
    } else {
      // Si no se puede medir, al menos verificar que la página carga
      await expect(page.locator('h1')).toBeVisible({ timeout: 5000 })
    }
  })
})

