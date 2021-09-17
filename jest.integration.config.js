module.exports = {
  preset: 'ts-jest',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'junit-test-integration.xml',
      },
    ],
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  setupFiles: ['./jest.setup-file.ts'],
  clearMocks: true,
  coverageDirectory: 'coverage-integration',
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/commands/**/*.service.ts',
    'src/commands/**/*.factory.ts',
  ],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.spec.ts'],
  testTimeout: 300000,
};
