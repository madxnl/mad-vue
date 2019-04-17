module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/standard',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'space-before-function-paren': ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'vue/html-self-closing': ['error', {'html': { 'void': 'never', 'normal': 'never', 'component': 'always' }}],
    'vue/max-attributes-per-line': ['error', {'singleline': 5, 'multiline': {'max': 1}}],
    'vue/no-v-html': ['off'],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/require-prop-types': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
