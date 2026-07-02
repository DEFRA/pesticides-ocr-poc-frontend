import Boom from '@hapi/boom'
import Joi from 'joi'
import { statusCodes } from '#/server/common/constants/status-codes.js'
import { viewFailAction } from '#/server/common/helpers/view-fail-action.js'
import { addFormErrors } from '../../common/helpers/add-form-errors.js'
import { save } from '#/server/data/register-professional-api.js'
import { find } from '#/server/data/postcode-api.js'

const basePath = 'register-professional'
const getView = `${basePath}/2-organisation-address`
const postView = `/${basePath}/organisation-address#`

export const registerProfessionalOrganisationAddress = {
  plugin: {
    name: 'register-professional-organisation-address',
    register (server) {
      server.route([
        {
          method: 'GET',
          path: `/${basePath}/organisation-address`,
          handler: (request, h) => {
            const registerProfessional = request.yar.get('registerProfessional')

            if (!registerProfessional) {
              request.yar.set('registerProfessional', null)
            }

            const values = {
              addressLine1: registerProfessional?.addresses?.[0]?.addressLine1,
              addressLine2: registerProfessional?.addresses?.[0]?.addressLine2,
              addressCity: registerProfessional?.addresses?.[0]?.addressCity,
              addressCounty: registerProfessional?.addresses?.[0]?.addressCounty,
              addressPostcode: registerProfessional?.addresses?.[0]?.addressPostcode
            }

            return h.view(getView, { values })
          }
        },
        {
          method: 'POST',
          path: `/${basePath}/organisation-address`,
          handler: async (request, h) => {
            const { addressLine1, addressLine2, addressCity, addressCounty, addressPostcode } = request.payload

            const registerProfessional = request.yar.get('registerProfessional') ?? {}

            request.yar.set('registerProfessional', {
              ...registerProfessional,
              addresses: [{
                addressLine1,
                addressLine2,
                addressCity,
                addressCounty,
                addressPostcode
              }]
            })

            const postcode = await find(addressPostcode)

            if (!postcode.ok) {
              return h.view(getView, {
                values: request.payload,
                ...addFormErrors({
                  addressPostcode: 'Enter a valid UK postcode'
                })
              })
            }

            try {
              const response = await save(request.yar.get('registerProfessional'))

              if (response.ok) {
                return h.redirect(postView)
              }

              return h.response({ message: 'Save failed' })
                .code(statusCodes.badRequest)
            } catch (error) {
              throw Boom.internal(error.message, error)
            }
          },
          options: {
            validate: {
              payload: Joi.object({
                addressLine1: Joi.string().required().messages({
                  'string.empty': 'Enter the first line of your address',
                  'any.required': 'Enter the first line of your address'
                }),
                addressLine2: Joi.string().allow('').optional(),
                addressCity: Joi.string().required().messages({
                  'string.empty': 'Enter a town or city',
                  'any.required': 'Enter a town or city'
                }),
                addressCounty: Joi.string().allow('').optional(),
                addressPostcode: Joi.string().required().messages({
                  'string.empty': 'Enter a full UK postcode',
                  'any.required': 'Enter a full UK postcode'
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
