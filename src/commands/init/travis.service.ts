import * as fs from 'fs';
import {travisConfig} from '../../templates/travis/travis.template';

export class Travis {
  createTravisFile(projectName: string) {
    const travisConfigFile = travisConfig();
    fs.writeFileSync(`${projectName}/.travis.yml`, travisConfigFile);
  }
}
