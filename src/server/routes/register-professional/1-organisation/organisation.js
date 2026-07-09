import { getHandler, postHandler } from './controller.js'
import { options } from './options.js'

const urlPath = '/register-professional/organisation'
const getView = 'register-professional/1-organisation/organisation'
const postView = '/register-professional/organisation-address#'

export const registerProfessionalOrganisation = {
  plugin: {
    name: 'register-professional-organisation',
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
          ...postHandler(postView),
          ...options(getView)
        }
      ])
    }
  }
}
