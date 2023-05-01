module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:@next/next/recommended',
  ],
  settings: {
    'import/resolver': {
      // project: './client/tsconfig.json',
      node: { extensions: ['.ts', '.tsx'] },
      typescript: { alwaysTryTypes: true },   
    },
    react: {
      version: '18.2.0',
    },
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    'no-underscore-dangle': 0,
    semi: [2, 'never'],
    'arrow-parens': [2, 'as-needed'],
    'no-plusplus': 0,
    'lines-between-class-members': 0,
    'import/prefer-default-export': 0,
    'react/jsx-one-expression-per-line': 0,
    'no-restricted-syntax': 0,
    'no-continue': 0,
    'no-use-before-define': 0,
    'no-await-in-loop': 0,
    'no-labels': 0,
    'react/destructuring-assignment': 0,
    'react/button-has-type': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/no-array-index-key': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/no-autofocus': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': ['error'],
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'import/extensions': [
      2,
      'never',
      {
        'json': 'always',
        'tsx': 'never',
        'ts': 'never',
        'jsx': 'never',
        'js': 'never',
        'css': 'always',
      }
    ],
    'max-len': ['error', {
      code: 120,
      ignoreComments: true,
      ignoreTrailingComments: true,
      ignoreUrls: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
    }],
    'no-nested-ternary': 0,
  },
  overrides: [
    {
      files: [
        '*.stories.tsx',
      ],
      rules: {
        'react/function-component-definition': 0,
      },
    },
    {
      files: [
        '*.test.ts',
      ],
      rules: {
        'import/no-extraneous-dependencies': 0,
      },
    },
  ],
}

