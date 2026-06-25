async function Save(payload) {
  // const url = ''

  // const response = await fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(payload)
  // })

  // return response

  console.log('Payload:', payload)

  return {
    status: 200,
    json: async () => ({
      message: 'Form submitted successfully'
    })
  }

}

export { Save }