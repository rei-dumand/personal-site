const baseConfig = require('../.eslintrc')

module.exports = {
  ...baseConfig,
  env: { browser: true },
  extends: [
    ...baseConfig.extends,
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'airbnb-typescript',
    'prettier',
  ],
  parserOptions: {
    ...baseConfig.parserOptions,
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    ...baseConfig.settings,
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      typescript: { alwaysTryTypes: true },
    },
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  plugins: [
    ...baseConfig.plugins,
    'react',
    'jsx-a11y',
    'react-hooks',
  ],
  rules: {
    ...baseConfig.rules,
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    '@typescript-eslint/semi': 0,
    'react/destructuring-assignment': 0,
    'react/button-has-type': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/no-array-index-key': 0,
    'react/jsx-indent': ['error', 2],
  },
}
