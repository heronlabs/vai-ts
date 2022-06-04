import {RepositoryEntity} from '../entities/repository-entity';

export interface CloneGit {
  /**
   * Clone git repository without git history.
   * @param targetFolderName The name of the folder to clone into.
   * @param repository The repository to clone.
   */
  clone(
    targetFolderName: string,
    repository: RepositoryEntity
  ): Promise<string>;
}
