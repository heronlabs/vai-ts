module.exports = {
  preset: 'ts-jest',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'junit-test-unit.xml',
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
  coverageDirectory: 'coverage-unit',
  coverageProvider: 'v8',
  collectCoverageFrom: ['src/**/*.service.ts', 'src/**/*.factory.ts'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
};
