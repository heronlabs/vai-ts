export interface CompressedFile {
  unzip(compress: Buffer): Promise<void>;
}
