export const packageConfig = (projectName: string): string => {
  const template = `
{
  "name": "${projectName}",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "lint": "gts lint",
    "lint-clean": "gts clean",
    "lint-fix": "gts fix",
    "compile": "tsc",
    "compile-watch": "tsc -w",
    "test": "npx jest --runInBand --detectOpenHandles --colors --verbose --reporters=default",
    "test-watch": "yarn test --watch",
    "test-coverage": "yarn test --coverage",
    "test-coverage-upload": "yarn test-coverage && codecov",
    "docs": "typedoc src/*.ts src/**/*.ts"
  },
  "devDependencies": {
    "@babel/core": "^7.13.14",
    "@babel/preset-env": "^7.13.12",
    "@babel/preset-typescript": "^7.13.0",
    "@types/jest": "^26.0.22",
    "@types/node": "^14.11.2",
    "babel-jest": "^26.6.3",
    "codecov": "^3.8.1",
    "gts": "^3.1.0",
    "jest": "^26.6.3",
    "jest-junit": "^12.0.0",
    "moq.ts": "^7.3.4",
    "nodemon": "^2.0.7",
    "ts-jest": "^26.5.4",
    "typedoc": "^0.20.35",
    "typescript": "^4.0.3",
    "winston": "^3.3.3"
  },
  "dependencies": {
    "reflect-metadata": "^0.1.13",
    "@types/lodash": "^4.14.168",
    "lodash": "^4.17.21"
  }
}  
`;

  return template.trimStart();
};

export const indexConfig = (): string => {
  const template = `
'use strict';

import 'reflect-metadata';

(async () => {
  try {
    console.log('OK');
  } catch (err) {
    console.log(err.message);
  }
})();
`;

  return template.trimStart();
};