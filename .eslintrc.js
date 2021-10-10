module.exports = {
  root: true,
  env: {
    'jest/globals': true,
  },
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  globals: {
    AbortController: 'readonly',
  },
  rules: {
    // General
    camelcase: [2, {properties: 'always'}],
    'no-duplicate-imports': ['error', {includeExports: true}],
    // Jest
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
};
