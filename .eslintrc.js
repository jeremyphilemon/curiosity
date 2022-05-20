module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'next/core-web-vitals',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'require-jsdoc': 0,
    'no-unused-vars': 0,
    '@next/next/no-sync-scripts': 0,
    'no-invalid-this': 0,
    'new-cap': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
  },
};
