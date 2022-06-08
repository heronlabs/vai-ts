import {readFileSync} from 'fs';
import path = require('path');

import {PackageEntity} from '../entities/package-entity';
import {ReadAssets} from '../interfaces/read-assets';

export class ReadPackageService implements ReadAssets<PackageEntity> {
  readFile(filePath: string): PackageEntity {
    const filePathFromRoot = path.join(__dirname, `../../../${filePath}`);

    const packageString = readFileSync(filePathFromRoot, 'utf8');
    const packageFile = PackageEntity.make(packageString);

    return packageFile;
  }
}
