import { home } from './home/index.js'
import { registerProfessionalOrganisation } from './register-professional/1-organisation/organisation.js'
import { registerProfessionalOrganisationAddress } from './register-professional/2-organisation-address/organisation-address.js'
import { registerProfessionalBusinessSector } from './register-professional/3-business-sector/business-sector.js'

const routes = [
  home,
  registerProfessionalOrganisation,
  registerProfessionalOrganisationAddress,
  registerProfessionalBusinessSector
]

export default routes
