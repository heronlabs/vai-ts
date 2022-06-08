export class PackageEntity {
  version: string;

  static make(file: string): PackageEntity {
    const packageFile: PackageEntity = JSON.parse(file);

    const repository = new PackageEntity();
    repository.version = packageFile.version;
    return repository;
  }
}
