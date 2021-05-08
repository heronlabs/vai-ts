import * as fs from 'fs';
import path = require('path');

import {Command} from '../command.enum';
import {Version} from './version.service';

describe('Version', () => {
  const version = new Version();

  describe('Run', () => {
    it('Should log the version in package.json', async () => {
      const versionNumber = '1.0.0';
      const configPath = '../../../../package.json';
      const pathSpy = jest
        .spyOn(path, 'join')
        .mockImplementation()
        .mockReturnValue(configPath);
      const readFileSpy = jest
        .spyOn(fs, 'readFileSync')
        .mockImplementation()
        .mockReturnValue(`{"version":"${versionNumber}"}`);
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

      await version.run();

      expect(pathSpy).toHaveBeenCalled();
      expect(readFileSpy).toHaveBeenCalledWith(configPath, 'utf8');
      expect(consoleLogSpy).toHaveBeenCalledWith(versionNumber);
    });
  });

  describe('Whoami', () => {
    it('Should return whoami', () => {
      const whoami = version.whoami;

      expect(whoami).toBe(Command.version);
    });
  });

  describe('Get Options', () => {
    it('Should return options', () => {
      const currentOptions = [''];

      const options = version.getOptions().toString();

      expect(options).toBe(currentOptions.toString());
    });
  });
});
