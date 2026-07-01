import { config } from '#/config/config.js'

async function save(payload) {
  console.log('Payload:', payload)
  const url = config.get('backendUrl') + '/api/v1/register-professional'

  if (config.get('simulateBackend') && config.get('isDevelopment')) {
    console.log('Simulating 201 response for development.')
    const response = {
      status: 201,
      ok: true,
      json: async () => ({ message: 'Backend is down, Simulating a successful response.' })
    }
    return response
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
