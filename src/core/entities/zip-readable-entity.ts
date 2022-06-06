import {Readable} from 'stream';

export class ZipReadableEntity extends Readable {
  private constructor(file: Buffer) {
    super({
      read() {
        this.push(file);
        this.push(null);
      },
    });
  }

  static make(file: Buffer): Readable {
    return new ZipReadableEntity(file);
  }
}
