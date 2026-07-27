import { adminController } from './controller.js'

/**
 * Case-officer admin area (OCR Register). Registered in src/server/routes/routes.js.
 */
export const admin = {
  plugin: {
    name: 'admin',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/admin/applications',
          ...adminController
        }
      ])
    }
  }
}
