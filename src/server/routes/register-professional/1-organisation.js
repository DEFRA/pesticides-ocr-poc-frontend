import Joi from 'joi'
import { viewFailAction } from '#/server/common/helpers/view-fail-action.js'

const basePath = 'register-professional'
const getView = `${basePath}/1-organisation`
const postView = `/${basePath}/organisation-address#`

export const registerProfessionalOrganisation = {
  plugin: {
    name: 'register-professional-organisation',
    register (server) {
      server.route([
        {
          method: 'GET',
          path: `/${basePath}/organisation`,
          handler: (request, h) => {
            const registerProfessional = request.yar.get('registerProfessional')

            if (!registerProfessional) {
              request.yar.set('registerProfessional', null)
            }

            const values = {
              organisationName: registerProfessional?.organisation?.name,
              organisationType: registerProfessional?.organisation?.type
            }

            return h.view(getView, { values })
          }
        },
        {
          method: 'POST',
          path: `/${basePath}/organisation`,
          handler: async (request, h) => {
            const { organisationName, organisationType } = request.payload
            const registerProfessional =
              request.yar.get('registerProfessional') ?? {}

            request.yar.set('registerProfessional', {
              ...registerProfessional,
              organisation: { name: organisationName, type: organisationType }
            })

            return h.redirect(postView)
          },
          options: {
            validate: {
              payload: Joi.object({
                organisationName: Joi.string().required().messages({
                  'string.empty': 'Enter the name of your organisation',
                  'any.required': 'Enter the name of your organisation'
                }),
                organisationType: Joi.string().required().messages({
                  'string.empty': 'Select your organisation type',
                  'any.required': 'Select your organisation type'
                })
              }),
              options: {
                abortEarly: false
              },
              failAction: viewFailAction(getView)
            }
          }
        }
      ])
    }
  }
}
