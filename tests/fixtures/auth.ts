/**
 * Fixtures para autenticación en tests
 */

export const testAdminUser = {
  email: 'admin@test.com',
  password: 'Test123!',
  id: 'test-user-id',
  nombre: 'Test Admin',
}

export const testCredentials = {
  valid: {
    email: 'admin@test.com',
    password: 'Test123!',
  },
  invalid: {
    email: 'invalid@test.com',
    password: 'wrongpassword',
  },
}

