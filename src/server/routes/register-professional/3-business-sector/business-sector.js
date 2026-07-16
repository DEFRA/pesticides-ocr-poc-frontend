import { getHandler, postHandler } from './controller.js'
import { options } from './options.js'

const urlPath = '/register-professional/business-sector'
const getView = 'register-professional/3-business-sector/business-sector'
const postView = `${urlPath}#`

export const registerProfessionalBusinessSector = {
  plugin: {
    name: 'register-professional-business-sector',
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
