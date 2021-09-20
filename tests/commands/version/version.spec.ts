import * as fs from 'fs';
import path = require('path');

import {Version} from '../../../src/commands/version/version.service';

describe('Given Version command', () => {
  it('Should show package.json version', async () => {
    const filePath = path.join(__dirname, '../../../package.json');
    const packageString = fs.readFileSync(filePath, 'utf8');
    const packageFile = JSON.parse(packageString);

    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementation(() => JSON.stringify({version: packageFile.version}));

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    const version = new Version();
    await version.run();

    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, packageFile.version);
  });
});
