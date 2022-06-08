export interface ReadAssets<T> {
  readFile(filePath: string): T;
}
