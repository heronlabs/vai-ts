import {RepositoryEntity} from '../entities/repository-entity';

export interface RepositoryInteractor {
  clone(
    targetDirectory: string,
    repository: RepositoryEntity
  ): Promise<boolean>;
}
