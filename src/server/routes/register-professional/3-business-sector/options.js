import Joi from 'joi'
import { viewFailAction } from '#/server/common/helpers/view-fail-action.js'

export const options = (getView) => ({
  options: {
    validate: {
      payload: Joi.object({
        businessSectors: Joi.array()
          .items(Joi.string().valid('agriculture', 'horticulture', 'forestry', 'public maintenance', 'water management', 'other'))
          .single()
          .required()
          .messages({
            'any.required': 'Select the sectors your business operates in',
            'any.only': 'Select the sectors your business operates in'
          }),
        otherSector: Joi.when('businessSectors', {
          is: Joi.array().single().has(Joi.string().valid('other')).required(),
          then: Joi.string().required().messages({
            'string.empty': 'Enter the sector your business operates in',
            'any.required': 'Enter the sector your business operates in'
          }),
          otherwise: Joi.string().allow('').optional()
        })
      }),
      options: {
        abortEarly: false
      },
      failAction: viewFailAction(getView)
    }
  }
})
