module.exports = {
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module",
    "ecmaFeatures": {
      "impliedStrict": true,
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "jquery": true,
    "node": true,
    "jest": true
  },
  "plugins": [
    "react"
  ],
  "extends": ["standard", "standard-react"],
  "rules": {
    "react/no-multi-comp": ["error", { "ignoreStateless": true }]
  },
  "globals": {
    'API_PORT': true
  }
}
