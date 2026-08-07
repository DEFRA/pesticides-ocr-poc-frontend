import { config } from '#/config/config.js'

async function save(payload) {
  const url = config.get('backendUrl') + '/api/v1/register-professional'

  if (config.get('simulateBackend') && config.get('isDevelopment')) {
    return {
      status: 201,
      ok: true,
      json: async () => ({ message: 'Backend is down, Simulating a successful response.' })
    }
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  return response
}

export { save }
