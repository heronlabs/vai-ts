import * as fs from 'fs';

import {Git} from '../../../src/commands/init/git.service';
import {gitIgnoreConfig} from '../../../src/templates/git/gitignore.template';

describe('Git', () => {
  it('Should create Git Ignore file', async () => {
    const git = new Git();
    const gitIgnoreFile = gitIgnoreConfig();
    const projectFolder = 'project';
    const writeFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation();

    git.createGitIgnoreFile(projectFolder);

    expect(writeFileSync).toHaveBeenCalledWith(
      `${projectFolder}/.gitignore`,
      gitIgnoreFile
    );
  });
});
