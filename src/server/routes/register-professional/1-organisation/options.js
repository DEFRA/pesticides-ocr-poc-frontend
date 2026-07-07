import Joi from 'joi'
import { viewFailAction } from '#/server/common/helpers/view-fail-action.js'

export const options = (getView) => ({
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
})
