import Joi from 'joi'
import { statusCodes } from '#/server/common/constants/status-codes.js'
import { viewFailAction } from '#/server/common/helpers/view-fail-action.js'
import { save } from '#/server/data/register-professional-api.js'

const getView = 'register-professional/1-organisation'
const postView = 'register-professional/1-organisation'

export const registerProfessionalOrganisation = {
  plugin: {
    name: 'register-professional-organisation',
    register (server) {
      server.route([
        {
          method: 'GET',
          path: '/register-professional/organisation',
          handler: (request, h) => {
            request.yar.set('registerProfessional', null)

            return h.view(getView)
          }
        },
        {
          method: 'POST',
          path: '/register-professional/organisation',
          handler: async (request, h) => {
            const { organisationName, organisationType } = request.payload
            const registerProfessional =
              request.yar.get('registerProfessional') ?? {}

            request.yar.set('registerProfessional', {
              ...registerProfessional,
              organisation: { name: organisationName, type: organisationType }
            })

            await save(request.yar.get('registerProfessional'))
              .then((response) => {
                if (response.ok) {
                  return h.view(postView)
                }

                return h.response({ message: 'Save failed' })
                  .code(statusCodes.badRequest)
              })
              .catch((error) =>
                h.response({ message: error.message })
                  .code(statusCodes.badRequest)
              )
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
