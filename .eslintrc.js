module.exports = {
  'extends': 'standard',
  'env': {
    'browser': true,
    'node': true
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
      'impliedStrict': true
    }
  },
  'rules': {
    'no-trailing-spaces': 'off',
    'react/jsx-uses-vars': 1
  },
  'plugins': ['react']
}
