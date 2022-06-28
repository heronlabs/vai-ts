import {readFileSync} from 'fs';
import path = require('path');

import {PackageEntity} from '../entities/package-entity';
import {PackageInteractor} from '../interfaces/package-interactor';

export class PackageInteractorService implements PackageInteractor {
  readSelf(): PackageEntity {
    const filePathFromRoot = path.join(__dirname, '../../../package.json');

    const packageString = readFileSync(filePathFromRoot, 'utf8');
    const packageFile = PackageEntity.make(packageString);

    return packageFile;
  }
}
