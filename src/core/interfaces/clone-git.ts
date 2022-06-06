import {RepositoryEntity} from '../entities/repository-entity';

export interface CloneGit {
  /**
   * Clone git repository without git history.
   * @param targetDirectory The name of the folder to clone into.
   * @param repository The repository to clone.
   */
  clone(targetDirectory: string, repository: RepositoryEntity): Promise<string>;
}
