import * as fs from 'fs';
import {exec} from '../../../../lib/exec';
import {vsCodeDebuggerConfig} from './vscode-debugger.template';

/**
 * Class responsible for Visual Studio Code configuration.
 */
export class VsCodeDebugger {
  /**
   * [RANDOM] - Create the VSCode debugger file.
   * @param projectName The project name.
   */
  async createVsCodeDebuggerFile(projectName: string) {
    await exec(`mkdir ${projectName}/.vscode`);
    const vsCodeDebuggerConfigFile = vsCodeDebuggerConfig();
    fs.writeFileSync(
      `${projectName}/.vscode/launch.json`,
      vsCodeDebuggerConfigFile
    );
  }
}
