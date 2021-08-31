module.exports = {
  verbose: true,
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.svg$': '<rootDir>/tests/unit/transforms/svg-transform.js',
  },
  globals: {
    NODE_ENV: 'test',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'vue'],
};
