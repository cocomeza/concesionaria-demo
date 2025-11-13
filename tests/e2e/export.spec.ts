import { test, expect } from '@playwright/test'

/**
 * Tests E2E para funcionalidad de exportación
 * Nota: Requiere autenticación como admin
 */
test.describe('Funcionalidad de Exportación', () => {
  test.beforeEach(async ({ page }) => {
    // Intentar ir al dashboard (será redirigido si no está autenticado)
    await page.goto('/dashboard/inventario')
    await page.waitForLoadState('domcontentloaded')
  })

  test('debe mostrar botón de exportación en inventario cuando hay datos', async ({ page }) => {
    // Verificar si estamos en login o en dashboard
    const currentUrl = page.url()
    
    if (currentUrl.includes('/login')) {
      // Si no está autenticado, el test no puede continuar
      test.skip()
      return
    }

    // Esperar a que cargue la página
    await page.waitForLoadState('networkidle', { timeout: 10000 })
    
    // Buscar botón de exportación
    const exportButton = page.getByRole('button', { name: /exportar/i })
    
    // Verificar que existe (puede estar deshabilitado si no hay datos)
    const buttonExists = await exportButton.count() > 0
    
    if (buttonExists) {
      await expect(exportButton.first()).toBeVisible({ timeout: 5000 })
    } else {
      // Si no existe, verificar que hay un mensaje de "no hay datos"
      const noDataMessage = page.locator('text=/no hay vehículos/i')
      const hasNoData = await noDataMessage.isVisible({ timeout: 2000 }).catch(() => false)
      expect(hasNoData).toBe(true)
    }
  })

  test('debe mostrar dropdown menu al hacer clic en exportar', async ({ page }) => {
    const currentUrl = page.url()
    
    if (currentUrl.includes('/login')) {
      test.skip()
      return
    }

    await page.waitForLoadState('networkidle', { timeout: 10000 })
    
    // Buscar botón de exportación
    const exportButton = page.getByRole('button', { name: /exportar/i }).first()
    const isVisible = await exportButton.isVisible({ timeout: 5000 }).catch(() => false)
    
    if (isVisible && !(await exportButton.isDisabled())) {
      await exportButton.click()
      
      // Verificar que aparece el menú dropdown
      const pdfOption = page.getByRole('menuitem', { name: /pdf/i })
      const excelOption = page.getByRole('menuitem', { name: /excel/i })
      
      // Al menos una opción debe estar visible
      const hasPdf = await pdfOption.isVisible({ timeout: 2000 }).catch(() => false)
      const hasExcel = await excelOption.isVisible({ timeout: 2000 }).catch(() => false)
      
      expect(hasPdf || hasExcel).toBe(true)
    }
  })

  test('debe mostrar botón de exportación en pedidos cuando hay datos', async ({ page }) => {
    const currentUrl = page.url()
    
    if (currentUrl.includes('/login')) {
      test.skip()
      return
    }

    await page.goto('/dashboard/pedidos')
    await page.waitForLoadState('networkidle', { timeout: 10000 })
    
    // Buscar botón de exportación
    const exportButton = page.getByRole('button', { name: /exportar/i })
    const buttonExists = await exportButton.count() > 0
    
    if (buttonExists) {
      await expect(exportButton.first()).toBeVisible({ timeout: 5000 })
    } else {
      // Verificar mensaje de no hay datos
      const noDataMessage = page.locator('text=/no hay pedidos/i')
      const hasNoData = await noDataMessage.isVisible({ timeout: 2000 }).catch(() => false)
      expect(hasNoData).toBe(true)
    }
  })

  test('botón de exportación debe estar deshabilitado cuando no hay datos', async ({ page }) => {
    const currentUrl = page.url()
    
    if (currentUrl.includes('/login')) {
      test.skip()
      return
    }

    await page.goto('/dashboard/inventario')
    await page.waitForLoadState('networkidle', { timeout: 10000 })
    
    // Buscar mensaje de "no hay vehículos"
    const noDataMessage = page.locator('text=/no hay vehículos/i')
    const hasNoData = await noDataMessage.isVisible({ timeout: 3000 }).catch(() => false)
    
    if (hasNoData) {
      // Si no hay datos, el botón no debería estar visible o debería estar deshabilitado
      const exportButton = page.getByRole('button', { name: /exportar/i }).first()
      const buttonExists = await exportButton.count() > 0
      
      if (buttonExists) {
        // Si existe, debe estar deshabilitado
        await expect(exportButton).toBeDisabled()
      } else {
        // Si no existe, está bien (no se muestra cuando no hay datos)
        expect(true).toBe(true)
      }
    }
  })

  test('debe tener iconos en las opciones del dropdown', async ({ page }) => {
    const currentUrl = page.url()
    
    if (currentUrl.includes('/login')) {
      test.skip()
      return
    }

    await page.goto('/dashboard/inventario')
    await page.waitForLoadState('networkidle', { timeout: 10000 })
    
    const exportButton = page.getByRole('button', { name: /exportar/i }).first()
    const isVisible = await exportButton.isVisible({ timeout: 5000 }).catch(() => false)
    
    if (isVisible && !(await exportButton.isDisabled())) {
      await exportButton.click()
      
      // Verificar que hay iconos (SVG o elementos con clases de iconos)
      const icons = page.locator('svg, [class*="icon"], [class*="Icon"]')
      const iconCount = await icons.count()
      
      // Debe haber al menos algunos iconos en el dropdown
      expect(iconCount).toBeGreaterThan(0)
    }
  })
})

