module.exports = {
  'package.json': ['prettier-package-json --write', 'git add'],
  '{src,__tests__}/**/*.{ts,json}': [
    'yarn format',
    'git add',
    'jest --findRelatedTests',
  ],
  'src/**/*.ts': ['yarn lint --fix', 'git add'],
  '__tests__/**/*.ts': ['yarn lint:test --fix', 'git add'],
}
