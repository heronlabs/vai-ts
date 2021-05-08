import * as fs from 'fs';

import {Git} from './git.service';
import {gitIgnoreConfig} from '../../../templates/git/gitignore.template';

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
