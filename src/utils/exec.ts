import * as cp from 'child_process';

export const exec = async (command: string) => {
  return new Promise((resolve, reject) => {
    cp.exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }

      resolve({stdout, stderr});
    });
  });
};

export const execInProjectFolder = async (
  projectFolder: string,
  command: string
) => {
  return new Promise((resolve, reject) => {
    cp.exec(command, {cwd: `./${projectFolder}`}, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }

      resolve({stdout, stderr});
    });
  });
};

export const copyInProjectFolder = async (
  projectFolder: string,
  sourceFolder: string
) => {
  await execInProjectFolder(projectFolder, `rsync -r ${sourceFolder}/. ./`);
};
