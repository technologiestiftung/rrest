module.exports = {
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testEnvironment: 'node',
  testRegex: '/__tests__/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  "collectCoverage": true,
  "coverageReporters": ["lcov"],
  "collectCoverageFrom": ["node-app/src/**/*.{js,jsx,ts,tsx}"],

};
