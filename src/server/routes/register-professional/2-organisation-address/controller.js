import Boom from '@hapi/boom'
import { statusCodes } from '#/server/common/constants/status-codes.js'
import { addFormErrors } from '../../../common/helpers/add-form-errors.js'
import { save } from '#/server/data/register-professional-api.js'
import { find } from '#/server/data/postcode-api.js'

export const getHandler = (getView) => ({
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
})

export const postHandler = (getView, postView) => ({
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
  }
})
