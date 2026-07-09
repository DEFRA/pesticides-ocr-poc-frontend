export function addFormErrors(fieldMessages) {
  const errors = {}
  const errorList = []
  for (const [key, message] of Object.entries(fieldMessages)) {
    errors[key] = { text: message }
    errorList.push({ text: message, href: `#${key}` })
  }
  return { errors, errorList }
}
