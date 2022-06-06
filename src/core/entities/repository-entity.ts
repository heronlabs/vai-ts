export class RepositoryEntity {
  name: string;
  zipUri: string;
  branch: string;

  static make(name: string, zipUri: string, branch: string): RepositoryEntity {
    const repository = new RepositoryEntity();
    repository.name = name;
    repository.zipUri = zipUri;
    repository.branch = branch;
    return repository;
  }
}
