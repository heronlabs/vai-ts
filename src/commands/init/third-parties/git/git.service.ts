import * as fs from 'fs';
import {gitIgnoreConfig} from './gitignore.template';

/**
 * Class responsible Git operations.
 * Should have more options, like:
 * * initGit
 * * deploy
 * * etc
 */
export class Git {
  /**
   * [RANDOM] - Create a git ignore file, with basic rules for Node.
   * @param projectFolder The folder where the project.
   */
  createGitIgnoreFile(projectFolder: string) {
    const gitIgnoreFile = gitIgnoreConfig();
    fs.writeFileSync(`${projectFolder}/.gitignore`, gitIgnoreFile);
  }
}
