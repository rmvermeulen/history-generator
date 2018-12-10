module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupTestFrameworkScriptFile: 'jest-extended',
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  }
}
