import { vi } from 'vitest'

import { adminController } from './controller.js'
import { requireCaseOfficer } from '@defra/hapi-oidc-auth'

describe('#adminController', () => {
  test('Should be guarded by requireCaseOfficer', () => {
    expect(adminController.options.pre).toEqual([{ method: requireCaseOfficer }])
  })

  test('Should render the OCR Register page with the auth session', () => {
    const session = {
      isAuthenticated: true,
      name: 'Test Officer',
      role: 'case_officer',
      roleLabel: 'Case officer'
    }
    const mockRequest = { yar: { get: vi.fn(() => session) } }
    const mockView = vi.fn().mockReturnThis()
    const mockToolkit = { view: mockView }

    adminController.handler(mockRequest, mockToolkit)

    expect(mockView).toHaveBeenCalledWith(
      'admin/index',
      expect.objectContaining({
        pageTitle: 'OCR Register',
        heading: 'OCR Register',
        caption: 'Case officer',
        session: expect.objectContaining({
          isAuthenticated: true,
          name: 'Test Officer',
          role: 'case_officer'
        })
      })
    )
  })
})
