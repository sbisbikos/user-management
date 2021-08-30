module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-underscore-dangle': ["error", { "allow": ["_id"] }],
    'no-unused-expressions': 'off',
    'func-names': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        'test/**', // nightwatch tests
        '**/vue.config.js', // vue-cli config
      ],
    }],
    'no-control-regex': 0,
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'linebreak-style': 0,
    'max-len': ['error', {
      comments: 200,
      code: 250,
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': ['error', {
      args: 'after-used',
      ignoreRestSiblings: true,
    }],
    'no-param-reassign': 0,
    'no-plusplus': ['error', {
      allowForLoopAfterthoughts: true,
    }],
    'vue/name-property-casing': ['error', 'kebab-case'],
    'vue/component-definition-name-casing': ['error', 'kebab-case'],
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        ignores: [
          'b-loading',
          'b-modal',
          'b-tooltip',
          'component',
          'template',
          'transition',
          'transition-group',
          'keep-alive',
          'slot',
          'router-view',
          'router-link',
        ],
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 4,
        multiline: {
          max: 1,
          allowFirstLine: true,
        },
      },
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        multiline: 'never',
      },
    ],
    radix: ['error', 'as-needed'],
    'no-shadow': [
      'error',
      {
        allow: ['state', 'getters'],
      },
    ],
    'import/extensions': ['error', {
      svg: 'always',
      api: 'always',
      vue: 'never',
      js: 'never',
    }],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
