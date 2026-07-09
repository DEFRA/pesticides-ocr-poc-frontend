import Joi from 'joi'
import { viewFailAction } from '#/server/common/helpers/view-fail-action.js'

export const options = (getView) => ({
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
})
