import {PackageEntity} from '../entities/package-entity';

export interface PackageInteractor {
  readSelf(): PackageEntity;
}
