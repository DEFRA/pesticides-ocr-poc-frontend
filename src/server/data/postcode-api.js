async function find(postcode) {
  const url = 'https://api.postcodes.io/postcodes/' + postcode

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return response
}

export { find }
