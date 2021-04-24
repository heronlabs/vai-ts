export const jestConfig = (): string => {
  const template = `module.exports = {
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
      statements: 50,
      branches: 90,
      functions: 0,
      lines: 0,
    },
  },
  setupFiles: ['./jest.setup-file.ts'],
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: ['src/**/*.service.ts'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.test.ts'],
};    
`;

  return template;
};
