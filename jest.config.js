module.exports = {
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testEnvironment: 'node',
  testRegex: '/__tests__/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  "collectCoverage": true,
  "coverageReporters": [
    "lcov",
  "text",
  "text-summary"],
  "collectCoverageFrom": [
    "node-app/src/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/build/**",
    "!**/coverage/**",
   "!**/test-tools/**",
  "!**/r-scripts/**"],
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  },
};
