import {faker} from '@faker-js/faker';
import * as fs from 'fs';

import {PackageEntity} from '../../../../src/core/entities/package-entity';
import {PackageInteractor} from '../../../../src/core/interfaces/package-interactor';
import {PackageInteractorService} from '../../../../src/core/services/package-interactor-service';

describe('Given Package Interactor Service', () => {
  let service: PackageInteractor;

  beforeEach(() => {
    service = new PackageInteractorService();
  });

  describe('Given read self package file from root', () => {
    it('Should read package.json file', () => {
      const packageFileStringify = JSON.stringify({
        version: faker.system.semver(),
      });
      const expectedPackageFile = PackageEntity.make(packageFileStringify);
      jest
        .spyOn(fs, 'readFileSync')
        .mockReturnValue(JSON.stringify(expectedPackageFile));

      const packageFile = service.readSelf();

      expect(packageFile).toEqual(expectedPackageFile);
    });
  });
});
