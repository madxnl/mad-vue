module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    // 'plugin:vue/essential',
    '@vue/standard',
    // 'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'space-before-function-paren': ['error', 'never'],
    'comma-dangle': ['error', 'only-multiline'],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
