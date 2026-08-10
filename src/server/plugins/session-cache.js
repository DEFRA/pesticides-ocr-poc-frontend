import yar from '@hapi/yar'

import { config } from '#/config/config.js'

const sessionConfig = config.get('session')

/**
 * Set options.maxCookieSize to 0 to always use server-side storage
 */
export const sessionCache = {
  plugin: yar,
  options: {
    name: sessionConfig.cache.name,
    cache: {
      cache: sessionConfig.cache.name,
      expiresIn: sessionConfig.cache.ttl
    },
    maxCookieSize: 0,
    storeBlank: false,
    errorOnCacheNotReady: true,
    cookieOptions: {
      password: sessionConfig.cookie.password,
      ttl: sessionConfig.cookie.ttl,
      isSecure: config.get('session.cookie.secure'),
      // @defra/hapi-oidc-auth live sign-in uses response_mode=form_post, so the
      // IdP returns via a cross-site POST to the callback. A Lax/Strict cookie is
      // not sent on that request, losing the OIDC state/nonce/PKCE verifier and
      // 422-ing the callback. Browsers drop a SameSite=None cookie that is not
      // Secure, so keep the two tied (local HTTP stays Lax, which is fine).
      isSameSite: config.get('session.cookie.secure') ? 'None' : 'Lax',
      clearInvalid: true
    }
  }
}
