// Case-officer landing page — guarded by requireCaseOfficer from
// @defra/hapi-oidc-auth. Minimal placeholder for the OCR Register admin view;
// proves the case-officer (Entra) sign-in lands on a real, role-protected page.

import { requireCaseOfficer, getAuthSession } from '@defra/hapi-oidc-auth'

export const adminController = {
  options: { pre: [{ method: requireCaseOfficer }] },
  handler(request, h) {
    return h.view('admin/index', {
      pageTitle: 'OCR Register',
      heading: 'OCR Register',
      caption: 'Case officer',
      session: getAuthSession(request)
    })
  }
}
