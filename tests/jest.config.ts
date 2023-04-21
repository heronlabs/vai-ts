import type {Config} from '@jest/types';

const baseConfig: Config.InitialOptions = {
  roots: ['src', 'tests'],
  rootDir: '../../',
  preset: 'ts-jest',
  reporters: ['default'],
  clearMocks: true,
  // silent: true,
  // coverageThreshold: {
  //   global: {
  //     statements: 100,
  //     branches: 100,
  //     functions: 100,
  //     lines: 100,
  //   },
  // },
};

export default baseConfig;
