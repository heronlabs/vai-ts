export const jestSetupConfig = (): string => {
  const template = `
import * as winston from 'winston';

winston.remove(winston.transports.Console);
winston.remove(winston.transports.File);
`;

  return template.trimStart();
};
