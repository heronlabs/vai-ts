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

export const execInProjectFolder = async (folder: string, command: string) => {
  return new Promise((resolve, reject) => {
    cp.exec(command, {cwd: `./${folder}`}, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }

      resolve({stdout, stderr});
    });
  });
};
