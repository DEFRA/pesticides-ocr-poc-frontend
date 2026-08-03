import { vi } from 'vitest'

// The SameSite=None cookie is required for @defra/hapi-oidc-auth live sign-in
// (cross-site form_post callback). It is tied to isSecure. isSameSite is resolved
// at module load, so re-import with a mocked `session.cookie.secure` each time.
async function loadSessionCache(secure) {
  vi.resetModules()
  vi.doMock('#/config/config.js', async () => {
    const actual = await vi.importActual('#/config/config.js')
    return {
      config: {
        get: (key) =>
          key === 'session.cookie.secure' ? secure : actual.config.get(key)
      }
    }
  })
  const { sessionCache } = await import('./session-cache.js')
  return sessionCache
}

describe('#sessionCache cookie SameSite', () => {
  afterEach(() => {
    vi.doUnmock('#/config/config.js')
    vi.resetModules()
  })

  test('Should be SameSite=None when the cookie is Secure', async () => {
    const sessionCache = await loadSessionCache(true)

    expect(sessionCache.options.cookieOptions.isSecure).toBe(true)
    expect(sessionCache.options.cookieOptions.isSameSite).toBe('None')
  })

  test('Should be SameSite=Lax when the cookie is not Secure', async () => {
    const sessionCache = await loadSessionCache(false)

    expect(sessionCache.options.cookieOptions.isSecure).toBe(false)
    expect(sessionCache.options.cookieOptions.isSameSite).toBe('Lax')
  })
})
