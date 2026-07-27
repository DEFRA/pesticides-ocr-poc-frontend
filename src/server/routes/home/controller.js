import { getAuthSession } from '@defra/hapi-oidc-auth'

/**
 * Home / sign-in chooser. Shows the signed-in state (name/role + account/sign-out)
 * or the two sign-in options (case officer via Entra, applicant via Defra ID).
 */
export const homeController = {
  handler(request, h) {
    return h.view('home/index', {
      pageTitle: 'Home',
      heading: 'OCR Register',
      session: getAuthSession(request)
    })
  }
}
