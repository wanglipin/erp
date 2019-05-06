module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    // '@vue/standard'
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-unused-vars': [0, {
      'vars': 'all',
      'args': 'none'
    }],
    'semi': 0,
    'eqeqeq': 0,
    'one-var': 0,
    'camelcase': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
