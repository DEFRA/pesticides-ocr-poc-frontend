import { getHandler, postHandler } from './controller.js'
import { options } from './options.js'

const urlPath = '/register-professional/organisation-address'
const getView = 'register-professional/2-organisation-address/organisation-address'
const postView = `${urlPath}#`

export const registerProfessionalOrganisationAddress = {
  plugin: {
    name: 'register-professional-organisation-address',
    register (server) {
      server.route([
        {
          method: 'GET',
          path: urlPath,
          ...getHandler(getView)
        },
        {
          method: 'POST',
          path: urlPath,
          ...postHandler(getView, postView),
          ...options(getView)
        }
      ])
    }
  }
}
