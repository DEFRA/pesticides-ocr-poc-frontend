import Boom from '@hapi/boom'
import { statusCodes } from '#/server/common/constants/status-codes.js'
import { save } from '#/server/data/register-professional-api.js'

export const getHandler = (getView) => ({
  handler: (request, h) => {
    const registerProfessional = request.yar.get('registerProfessional')

    if (!registerProfessional) {
      request.yar.set('registerProfessional', null)
    }

    const values = {
      businessSectors: registerProfessional?.sectors ?? [],
      otherSector: registerProfessional?.otherSector
    }

    return h.view(getView, { values })
  }
})

export const postHandler = (postView) => ({
  handler: async (request, h) => {
    const { businessSectors, otherSector } = request.payload

    const sectors = [businessSectors].flat()

    const registerProfessional = request.yar.get('registerProfessional') ?? {}

    request.yar.set('registerProfessional', {
      ...registerProfessional,
      sectors,
      otherSector: sectors.includes('other') ? otherSector : null
    })

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
