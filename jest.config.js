module.exports = {
  collectCoverageFrom: ['<rootDir>/client/src/**/*.{js,jsx,mjs}'],
  setupFiles: ['<rootDir>/client/config/polyfills.js'],
  coverageDirectory: '<rootDir>/client/coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/nightwatch.conf.js',
    '<rootDir>/gulpfile.babel.js',
    '<rootDir>/node_modules/',
    '<rootDir>/client/scripts/',
    '<rootDir>/server/',
    '<rootDir>/client/config/',
  ],
  setupTestFrameworkScriptFile: '<rootDir>/client/src/setupTests.js',
  testMatch: [
    '<rootDir>/client/src/**/tests/**/*.{js,jsx,mjs}',
    '<rootDir>/client/src/**/?(*.)(spec|test).{js,jsx,mjs}',
  ],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/client/src/tests/__mocks__/',
    '<rootDir>/client/src/tests/setup/',
  ],
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(css|scss)$': '<rootDir>/client/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|css|scss|json)$)': '<rootDir>/client/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
  },
  moduleFileExtensions: ['web.js', 'mjs', 'js', 'json', 'web.jsx', 'jsx', 'node'],
};
