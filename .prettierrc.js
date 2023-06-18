module.exports = {
  semi: true,
  printWidth: 120,
  trailingComma: 'all',
  tabWidth: 2,
  singleQuote: true,
  bracketSameLine: false,
  jsxSingleQuote: true,
  quoteProps: 'preserve',
  arrowParens: 'always',
  proseWrap: 'never',
  bracketSpacing: true,
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'auto',
  overrides: [
    {
      'files': ['*.md'],
      'options': {
        embeddedLanguageFormatting: 'off',
      },
    },
    { 'files': '.prettierrc', 'options': { 'parser': 'json' } },
  ],
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-packagejson'],
}
