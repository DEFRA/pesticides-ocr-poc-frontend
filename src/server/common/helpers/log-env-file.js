import { readFileSync } from 'node:fs'
import { parseEnv } from 'node:util'

// Logs which environment variables the local .env file overrides, to help
// diagnose local runs. Logs only the variable NAMES, never their values: the
// .env file can hold secrets (e.g. SESSION_COOKIE_PASSWORD, ENTRA_CLIENT_SECRET)
// and CDP ships application logs centrally.
export function logEnvFile(logger) {
  let contents
  try {
    contents = readFileSync('.env', 'utf8')

    if (contents === '') {
      logger.info('No env overrides found')
      return
    }
  } catch {
    logger.info('No .env file found')
    return
  }

  const overriddenKeys = Object.keys(parseEnv(contents))
  logger.info({ overriddenKeys }, 'Overridden environment variables')
}
