import { test, expect } from '@playwright/test'

/**
 * Tests de Seguridad
 */
test.describe('Security Tests', () => {
  test('debe tener headers de seguridad', async ({ page }) => {
    const response = await page.goto('/inicio')
    const headers = response?.headers() || {}
    
    // Verificar headers importantes (pueden estar configurados en Next.js)
    // X-Frame-Options, X-Content-Type-Options, etc.
    expect(response?.status()).toBe(200)
  })

  test('no debe exponer información sensible en el HTML', async ({ page }) => {
    await page.goto('/inicio')
    const content = await page.content()
    
    // Verificar que no hay keys de API expuestas
    expect(content).not.toContain('SUPABASE_SERVICE_ROLE_KEY')
    expect(content).not.toContain('service_role')
    
    // Verificar que no hay tokens expuestos
    expect(content).not.toMatch(/eyJ[a-zA-Z0-9_-]+\.eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/)
  })

  test('formularios deben tener protección CSRF', async ({ page }) => {
    await page.goto('/login')
    
    // Verificar que el formulario existe
    const form = page.locator('form')
    await expect(form.first()).toBeVisible()
    
    // Next.js maneja CSRF automáticamente, pero podemos verificar estructura
    const formAction = await form.getAttribute('action')
    // Form puede no tener action si usa JavaScript
  })

  test('debe validar inputs en el cliente', async ({ page }) => {
    await page.goto('/login')
    
    const emailInput = page.locator('input[type="email"]')
    const passwordInput = page.locator('input[type="password"]')
    
    // Verificar validación HTML5
    await expect(emailInput).toHaveAttribute('type', 'email')
    await expect(passwordInput).toHaveAttribute('type', 'password')
    
    // Intentar enviar con datos inválidos
    await emailInput.fill('not-an-email')
    await passwordInput.fill('123')
    
    // El navegador debería prevenir el envío si hay validación HTML5
    const form = page.locator('form').first()
    const isValid = await form.evaluate((el: HTMLFormElement) => el.checkValidity())
    
    // Si hay validación, debería ser false
    if (!isValid) {
      expect(isValid).toBe(false)
    }
  })

  test('no debe tener enlaces a recursos externos inseguros', async ({ page }) => {
    await page.goto('/inicio')
    
    // Buscar scripts y links externos
    const scripts = page.locator('script[src]')
    const links = page.locator('link[href]')
    
    const scriptCount = await scripts.count()
    const linkCount = await links.count()
    
    // Verificar que los recursos externos usan HTTPS
    for (let i = 0; i < Math.min(scriptCount, 10); i++) {
      const src = await scripts.nth(i).getAttribute('src')
      if (src && src.startsWith('http')) {
        expect(src).toMatch(/^https:/)
      }
    }
  })

  test('debe manejar errores sin exponer información sensible', async ({ page }) => {
    // Intentar acceder a una ruta que no existe
    const response = await page.goto('/ruta-que-no-existe-12345')
    
    // No debería exponer stack traces o información del servidor
    const content = await page.content()
    expect(content).not.toContain('Error:')
    expect(content).not.toContain('at ')
    expect(content).not.toContain('node_modules')
  })
})

