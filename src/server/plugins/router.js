import inert from '@hapi/inert'
import { hapiOidcAuth } from '@defra/hapi-oidc-auth'
import routes from '../routes/routes.js'
import { health } from '../routes/health/index.js'
import { serveStaticFiles } from './serve-static-files.js'
import { config } from '#/config/config.js'

export const router = {
  plugin: {
    name: 'router',
    async register(server) {
      await server.register([inert])

      // Health-check route. Used by platform to check if service is running, do not remove!
      await server.register([health])

      // Shared DEFRA sign-in (applicant + case officer) via @defra/hapi-oidc-auth.
      // Config comes from the host; the plugin holds no secrets. defraId runs in
      // mock for now; entra (case officer) is live per environment.
      await server.register({
        plugin: hapiOidcAuth,
        options: {
          defraId: config.get('auth.defraId'),
          entra: config.get('auth.entra'),
          redirects: {
            applicant: '/register-professional/organisation',
            caseOfficer: '/admin/applications',
            signOut: '/'
          }
        }
      })

      // Application specific routes, add your own routes here
      await server.register(routes)

      // Static assets
      if (!config.get('isProduction') && !config.get('isTest')) {
        await (async () => {
          const createViteServer = (await import('vite')).createServer
          const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'custom'
          })

          await server.register({
            plugin: (await import('@defra/hapi-connect')).default,
            options: {
              path: '/public',
              middleware: [vite.middlewares]
            }
          })
        })()
      } else {
        server.register(serveStaticFiles)
      }
    }
  }
}
