import * as fs from 'fs';
import {gitIgnoreConfig} from '../../templates/git/gitignore.template';

export class Git {
  createGitIgnoreFile(projectFolder: string) {
    const gitIgnoreFile = gitIgnoreConfig();
    fs.writeFileSync(`${projectFolder}/.gitignore`, gitIgnoreFile);
  }
}
