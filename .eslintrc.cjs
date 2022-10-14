/* eslint-env node */

const getNamingConventionsRule = (isTestFileOverride = false) => {
  const value = [
    'error',
    // Default selector
    {
      selector: 'default',
      format: ['strictCamelCase'],
    },
    // Group selectors
    {
      selector: 'property',
      format: ['strictCamelCase', 'StrictPascalCase'],
    },
    {
      selector: 'method',
      format: ['strictCamelCase'],
    },
    {
      selector: 'memberLike',
      format: ['strictCamelCase'],
    },
    {
      selector: 'typeLike',
      format: ['PascalCase'],
    },
    // Individual selectors
    {
      selector: 'variable',
      format: ['strictCamelCase', 'UPPER_CASE'],
    },
    {
      selector: 'function',
      format: ['strictCamelCase'],
    },
    {
      selector: 'parameter',
      format: ['strictCamelCase'],
    },
    {
      selector: 'objectLiteralProperty',
      modifiers: ['requiresQuotes'],
      format: null,
    },
    {
      selector: 'objectLiteralMethod',
      modifiers: ['requiresQuotes'],
      format: null,
    },
  ];

  if (isTestFileOverride) {
    const variableIndex = value.findIndex(selector => {
      return typeof selector === 'object' && selector.selector === 'variable';
    });

    if (variableIndex > -1) {
      value.splice(variableIndex, 1, {
        selector: 'variable',
        format: ['strictCamelCase', 'StrictPascalCase', 'UPPER_CASE'],
      });
    }
  }

  return value;
};

module.exports = {
  root: true,
  settings: {
    'import/resolver': {
      typescript: {
        project: 'tsconfig.json',
      },
    },
  },
  plugins: [
    '@programic',
  ],
  extends: [
    '@programic/eslint-config-vue3-typescript',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
    project: './tsconfig.json',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        '@programic/vue-dom-id-no-capital-letters': 'error',
        '@programic/vue-dom-class-no-capital-letters': 'error',
        '@typescript-eslint/naming-convention': getNamingConventionsRule(),
      },
    },
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/naming-convention': getNamingConventionsRule(),
      },
    },
    {
      files: ['**/*.spec.ts'],
      parser: '@typescript-eslint/parser',
      plugins: [
        '@typescript-eslint',
      ],
      extends: [
        '@programic/eslint-config-typescript',
      ],
      rules: {
        'no-promise-executor-return': 'off',
        '@typescript-eslint/naming-convention': getNamingConventionsRule(true),
        '@typescript-eslint/explicit-function-return-type': 'off',
        'unicorn/prevent-abbreviations': ['error', {
          checkShorthandProperties: true,
          checkProperties: true,
          ignore: [
            /^src$/i,
            // Vue specific ignores
            /attrs|params|prop|props|ref|refs/i,
          ],
        }],
        'vue/one-component-per-file': 'off',
      },
    },
  ],
  rules: {
    'no-multiple-empty-lines': ['error', {
      max: 1,
    }],
    'no-bitwise': ['error', {
      allow: ['&'],
    }],
    'vue/multi-word-component-names': 'off',
    '@programic/vue-newline-after-component-option': 'error',
    '@programic/vue-computed-property-return-type': 'error',
    '@programic/vue-method-return-type': 'error',
  },
};
