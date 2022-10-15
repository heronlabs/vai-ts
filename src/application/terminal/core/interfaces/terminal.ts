export interface Terminal {
  installNodePackages(targetDirectory: string): Promise<boolean>;
}
