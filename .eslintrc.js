module.exports = {
  root: true,
  env: {
    node: true,
  },
  // extends: ['plugin:vue/essential', '@vue/prettier'],
  extends: ['plugin:vue/essential'],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  // "rules": {
  //   "generator-star-spacing": "off",
  //   "no-tabs": "off",
  //   "no-unused-vars": "off",
  //   "no-console": "off",
  //   "no-irregular-whitespace": "off",
  //   "no-debugger": "off"
  // },
}
