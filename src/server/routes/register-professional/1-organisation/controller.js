export const getHandler = (getView) => ({
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
})

export const postHandler = (postView) => ({
  handler: async (request, h) => {
    const { organisationName, organisationType } = request.payload
    const registerProfessional =
              request.yar.get('registerProfessional') ?? {}

    request.yar.set('registerProfessional', {
      ...registerProfessional,
      organisation: { name: organisationName, type: organisationType }
    })

    return h.redirect(postView)
  }
})
