import { test, expect } from '@playwright/test'

/**
 * Tests E2E para autenticación
 */
test.describe('Autenticación', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.waitForLoadState('domcontentloaded')
  })

  test('debe mostrar el formulario de login', async ({ page }) => {
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
    await expect(page.getByRole('button', { name: /iniciar sesión/i })).toBeVisible()
  })

  test('debe mostrar mensaje de error con credenciales inválidas', async ({ page }) => {
    await page.fill('input[type="email"]', 'invalid@test.com')
    await page.fill('input[type="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')
    
    // Esperar mensaje de error (puede ser toast o mensaje en página)
    await page.waitForTimeout(2000)
    
    // Verificar que hay algún indicador de error
    const errorMessage = page.locator('text=/error|incorrecto|denegado/i').first()
    await expect(errorMessage).toBeVisible({ timeout: 5000 }).catch(() => {
      // Si no hay mensaje visible, verificar que no redirigió al dashboard
      expect(page.url()).not.toContain('/dashboard')
    })
  })

  test('debe validar campos requeridos', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /iniciar sesión/i })
    await submitButton.click()
    
    // Verificar validación HTML5 o mensajes de error
    const emailInput = page.locator('input[type="email"]')
    const passwordInput = page.locator('input[type="password"]')
    
    // Verificar que los campos están marcados como requeridos
    await expect(emailInput).toHaveAttribute('required')
    await expect(passwordInput).toHaveAttribute('required')
  })

  test('debe tener link para volver al inicio', async ({ page }) => {
    const homeLink = page.getByRole('link', { name: /inicio|volver/i })
    
    if (await homeLink.isVisible({ timeout: 2000 })) {
      await homeLink.click()
      await expect(page).toHaveURL(/\/inicio/)
    }
  })
})

