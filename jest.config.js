module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupTestFrameworkScriptFile: 'jest-extended',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  testPathIgnorePatterns: ['/node_modules/', '.*fixtures.ts'],
}
