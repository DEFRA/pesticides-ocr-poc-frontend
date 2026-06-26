import { config } from '#/config/config.js'

async function Save(payload) {
  // console.log('Payload:', payload)
  const url = config.get('backendUrl') + '/api/v1/register-professional'

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  return response
}

export { Save }
