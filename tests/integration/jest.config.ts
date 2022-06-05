import type {Config} from '@jest/types';

import baseConfig from '../../jest.config';

const config: Config.InitialOptions = {
  ...baseConfig,
  testTimeout: 10000,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage/integration',
  testMatch: ['<rootDir>/tests/integration/**/*.spec.ts'],
};

export default config;
