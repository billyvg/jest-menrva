module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2018
  },
  rules: {
    "no-console": ["off"]
  }
};
