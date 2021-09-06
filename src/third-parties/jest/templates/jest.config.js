module.exports = {
  preset: 'ts-jest',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'junit-TEST.xml',
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
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: ['src/**/*.service.ts'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
};
