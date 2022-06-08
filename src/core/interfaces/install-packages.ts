export interface InstallPackages {
  /**
   * Install NodeJs packages.
   * @param targetDirectory The name of the folder to clone into.
   * @returns
   */
  install(targetDirectory: string): Promise<boolean>;
}
