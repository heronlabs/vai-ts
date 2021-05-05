import * as cp from '../../../../src/lib/exec';
import * as fs from 'fs';

import {VsCodeDebugger} from '../../../../src/commands/init/third-parties/vscode-debugger.service';
import {vsCodeDebuggerConfig} from '../../../../src/templates/vscode-debugger/vscode-debugger.template';

describe('VsCodeDebugger', () => {
  it('Should create Visual Studio Code Debugger config file', async () => {
    const vsCodeDebugger = new VsCodeDebugger();
    const vsCodeDebuggerConfigFile = vsCodeDebuggerConfig();
    const projectFolder = 'project';
    const execSpy = jest.spyOn(cp, 'exec').mockImplementation();
    const writeFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation();

    await vsCodeDebugger.createVsCodeDebuggerFile(projectFolder);

    expect(execSpy).toHaveBeenCalledWith(`mkdir ${projectFolder}/.vscode`);
    expect(writeFileSync).toHaveBeenCalledWith(
      `${projectFolder}/.vscode/launch.json`,
      vsCodeDebuggerConfigFile
    );
  });
});
