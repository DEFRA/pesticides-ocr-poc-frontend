import { statusCodes } from '#/server/common/constants/status-codes.js'

export const registerProfessionalOrganisation = {
  plugin: {
    name: 'register-professional-organisation',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/register-professional/organisation',
          handler: (request, h) => {
            
            request.yar.set('registerProfessional', null)

            return h.view('register-professional/1-organisation')
          }
        },
        {
          method: 'POST',
          path: '/register-professional/organisation',
          handler: (request, h) => {
            const { organisationName, organisationType } = request.payload
            const registerProfessional = request.yar.get('registerProfessional') ?? {}
          
            request.yar.set('registerProfessional', {
              ...registerProfessional,
              organisation: { name: organisationName, type: organisationType }
            })

            return h.response({ message: 'Form submitted successfully' }).code(statusCodes.ok)
          }
        }
      ])
    }
  }
}
