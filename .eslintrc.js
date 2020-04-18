module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier', 'plugin:prettier/recommended'],
  rules: {
    eqeqeq: ['error', 'always'],
    'no-console': 'error',
    'react-native/no-inline-styles': 'off',
  },
};
