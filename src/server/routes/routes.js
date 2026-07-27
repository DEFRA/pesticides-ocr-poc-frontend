import { home } from './home/index.js'
import { admin } from './admin/index.js'
import { registerProfessionalOrganisation } from './register-professional/1-organisation/organisation.js'
import { registerProfessionalOrganisationAddress } from './register-professional/2-organisation-address/organisation-address.js'

const routes = [
  home,
  admin,
  registerProfessionalOrganisation,
  registerProfessionalOrganisationAddress
]

export default routes
