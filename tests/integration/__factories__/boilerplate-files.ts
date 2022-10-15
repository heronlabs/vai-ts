import {existsSync, mkdirSync, rmdirSync} from 'fs';

export class BoilerplateFiles {
  public static readonly OUTPUT_FOLDER = '__output__';

  static clean(): void {
    const path = `./${BoilerplateFiles.OUTPUT_FOLDER}`;

    if (existsSync(path)) rmdirSync(path, {recursive: true});

    mkdirSync(path);
  }
}
