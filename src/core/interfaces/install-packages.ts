export interface InstallPackages {
  install(targetDirectory: string): Promise<void>;
}
