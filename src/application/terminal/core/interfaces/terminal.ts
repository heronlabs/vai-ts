import {RunnerOptions} from '../enums/runner-options-enum';

export interface Terminal {
  installNodePackages(
    targetDirectory: string,
    runnerOption: RunnerOptions
  ): Promise<boolean>;
}
