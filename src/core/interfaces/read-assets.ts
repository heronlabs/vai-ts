export interface ReadAssets<T> {
  /**
   * Read file given path and type.
   * @param filePath The file path to read.
   */
  readFile(filePath: string): T;
}
