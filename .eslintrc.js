// @ts-ignore
module.exports = {
  "env": {
    "browser": true
  },
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "modules": true,
    },
    "project": "./tsconfig.json"
  },
  "rules": {
    "prettier/prettier": [
      "warn",
      {
        "singleQuote": true,
        "printWidth": 100,
        "trailingComma": "es5",
        "semi": false
      }
    ],
    "indent": "off",
    "@typescript-eslint/indent": ["warn", 2],
    "@typescript-eslint/interface-name-prefix": ["warn", "always"],
    "@typescript-eslint/member-delimiter-style": ["warn", {
      multiline: {delimiter: "none"},
      singleline: {delimiter: "comma"}
    }],
    "@typescript-eslint/indent": 0,
    "@typescript-eslint/camelcase": 1
  },
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [
        ".ts"
      ]
    },
    "import/resolver": {
      "typescript": {},
    }
  },
  "plugins": [
    "@typescript-eslint",
    "prettier"
  ]
};