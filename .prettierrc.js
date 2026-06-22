export default {
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  plugins: ['prettier-plugin-jinja-template'],
  overrides: [
    {
      files: ['*.njk'],
      options: {
        parser: 'jinja-template'
      }
    }
  ]
}
