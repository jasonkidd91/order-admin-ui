module.exports = {
  root: true,
  extends: [
    // 'react-app',
    'airbnb-typescript',
    // 'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'only-warn'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/destructuring-assignment': 'off',
    'react/prop-types': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'react/jsx-indent': ['warn'],
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-curly-newline': ['warn'],
    'react/jsx-tag-spacing': ['warn'],
    'react/self-closing-comp': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-multi-spaces': ['warn'],
    'react/jsx-fragments': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-curly-newline': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': ['warn'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/comma-dangle': ['warn'],
    '@typescript-eslint/semi': ['warn'],
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/keyword-spacing': ['warn'],
    '@typescript-eslint/space-infix-ops': ['warn'],
    '@typescript-eslint/object-curly-spacing': ['warn'],
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/dot-notation': ['warn'],
    '@typescript-eslint/quotes': 'off',
    'eqeqeq': ['warn'],
    'arrow-body-style': 'off',
    'no-confusing-arrow': 'off',
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'import/order': 'off',
    'implicit-arrow-linebreak': 'off',
    'class-methods-use-this': 'off',
    'object-curly-newline': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'no-unused-vars': ['warn'],
    'no-trailing-spaces': ['warn'],
    'eol-last': 'off',
    'max-len': 'off',
    'key-spacing': ['warn'],
    'no-param-reassign': 'off',
    'operator-linebreak': 'off',
    'function-paren-newline': 'off',
    'no-multi-spaces': ['warn'],
    'no-multiple-empty-lines': 'off',
    'prefer-const': 'off',
    'prefer-template': 'off',
    'no-console': 'off',
    'no-empty-pattern': ['warn'],
    'jsx-a11y/alt-text': ['warn'],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'arrow-parens': 'off',
    'react/jsx-boolean-value': 'off',
    'prefer-destructuring': 'off',
    'object-shorthand': ['warn'],
    'eslint-disable-next-line': 'off',
    'linebreak-style': 'off',
  },
};
