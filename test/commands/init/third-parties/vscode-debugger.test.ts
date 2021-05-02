import * as fs from 'fs';

import {VsCodeDebugger} from '../../../../src/commands/init/third-parties/vscode-debugger.service';
import {vsCodeDebuggerConfig} from '../../../../src/templates/vscode-debugger/vscode-debugger.template';

describe('VsCodeDebugger', () => {
  it('Should create Visual Studio Code Debugger config file', () => {
    const vsCodeDebugger = new VsCodeDebugger();
    const vsCodeDebuggerConfigFile = vsCodeDebuggerConfig();
    const projectFolder = 'project';
    const writeFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation();

    vsCodeDebugger.createVsCodeDebuggerFile(projectFolder);

    expect(writeFileSync).toHaveBeenCalledWith(
      `${projectFolder}/.vscode/launch.json`,
      vsCodeDebuggerConfigFile
    );
  });
});
