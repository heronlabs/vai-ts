import faker from '@faker-js/faker';
import * as fs from 'fs';

import {PackageEntity} from '../../../../src/core/entities/package-entity';
import {ReadAssets} from '../../../../src/core/interfaces/read-assets';
import {ReadPackageService} from '../../../../src/core/services/read-package-service';

describe('Given Read Package Service', () => {
  let service: ReadAssets<PackageEntity>;

  beforeEach(() => {
    service = new ReadPackageService();
  });

  describe('Given read file from root', () => {
    it('Should read package.json file', () => {
      const packageFileStringify = JSON.stringify({
        version: faker.system.semver(),
      });
      const expectedPackageFile = PackageEntity.make(packageFileStringify);
      jest
        .spyOn(fs, 'readFileSync')
        .mockReturnValue(JSON.stringify(expectedPackageFile));

      const packageFile = service.readFile(faker.system.filePath());

      expect(packageFile).toEqual(expectedPackageFile);
    });
  });
});
