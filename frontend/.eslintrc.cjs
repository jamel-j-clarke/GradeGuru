module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: 'detect' } },
  plugins: ['react-refresh', 'import'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-console': 'warn',
    'no-eval': 'error',
    'import/first': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/button-has-type': 'warn',
    'react/prop-types': 'warn',
    'react/require-default-props': 'warn',
    'react/no-array-index-key': 'warn',
    'react/react-in-jsx-scope': 'warn',
    'react/jsx-uses-react': 'warn',
    'react/display-name': 'warn',
    'react/no-children-prop': 'warn',
    'react/no-danger-with-children': 'warn',
    'react/jsx-no-bind': 'warn',
    'react/react-in-jsx-scope': 'off',
  },
};
