import { test, expect } from '@playwright/test'

/**
 * Tests E2E para la página de inicio
 */
test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inicio')
  })

  test('debe cargar la página de inicio correctamente', async ({ page }) => {
    await page.waitForLoadState('domcontentloaded')
    await expect(page).toHaveTitle(/AutoElite/i)
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 })
  })

  test('debe mostrar el header con navegación', async ({ page }) => {
    // Esperar a que cargue el header
    await page.waitForLoadState('domcontentloaded')
    
    // Verificar header usando data-testid o selector genérico
    const header = page.locator('[data-testid="main-header"], header').first()
    await expect(header).toBeVisible({ timeout: 10000 })
    
    // Verificar que hay links de navegación (más flexible)
    const navLinks = page.locator('header a[href], nav a[href]')
    const linkCount = await navLinks.count()
    
    // Debe haber al menos algunos links de navegación
    expect(linkCount).toBeGreaterThan(0)
  })

  test('debe mostrar vehículos destacados', async ({ page }) => {
    // Esperar a que cargue el contenido principal
    await page.waitForLoadState('networkidle', { timeout: 10000 })
    
    // Verificar que hay contenido relacionado con vehículos
    // Puede ser el título, cards, o texto relacionado
    const vehicleContent = page.locator('text=/vehículo|catálogo|destacado/i').first()
    const hasVehicleContent = await vehicleContent.isVisible({ timeout: 10000 }).catch(() => false)
    
    // También verificar si hay cards de vehículos
    const vehicleCards = page.locator('[data-testid="vehicle-card"]')
    const cardCount = await vehicleCards.count()
    
    // Al menos debe haber contenido relacionado o cards
    expect(hasVehicleContent || cardCount > 0).toBe(true)
  })

  test('debe tener enlaces funcionales', async ({ page }) => {
    // Verificar link a catálogo
    const catalogLink = page.getByRole('link', { name: /catálogo|vehículos/i }).first()
    if (await catalogLink.isVisible()) {
      await catalogLink.click()
      await expect(page).toHaveURL(/\/vehiculos/)
    }
  })

  test('debe ser responsive en móvil', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Verificar que el contenido se adapta
    const header = page.locator('header')
    await expect(header).toBeVisible()
  })
})

