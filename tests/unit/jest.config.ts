import type {Config} from '@jest/types';

import baseConfig from '../jest.config';

const config: Config.InitialOptions = {
  ...baseConfig,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*-bootstrap.ts',
    '!<rootDir>/src/application/entry-point.ts',
  ],
  coverageDirectory: 'coverage/unit',
  testMatch: ['<rootDir>/tests/unit/**/*.spec.ts'],
  detectOpenHandles: true,
};

export default config;
