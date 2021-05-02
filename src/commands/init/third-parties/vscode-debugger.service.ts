import * as fs from 'fs';
import {vsCodeDebuggerConfig} from '../../../templates/vscode-debugger/vscode-debugger.template';

/**
 * Class responsible for Visual Studio Code configuration.
 */
export class VsCodeDebugger {
  /**
   * [RANDOM] - Create the VSCode debugger file.
   * @param projectName The project name.
   */
  createVsCodeDebuggerFile(projectName: string) {
    const vsCodeDebuggerConfigFile = vsCodeDebuggerConfig();
    fs.writeFileSync(
      `${projectName}/.vscode/launch.json`,
      vsCodeDebuggerConfigFile
    );
  }
}
