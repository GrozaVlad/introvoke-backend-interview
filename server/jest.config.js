/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: ['app/**/*.ts'],
  coverageDirectory: 'reports',
  watchPathIgnorePatterns: ['/node_modules/'],

};