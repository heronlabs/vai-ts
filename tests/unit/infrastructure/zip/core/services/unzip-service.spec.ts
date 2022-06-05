import {faker} from '@faker-js/faker';
import {Mock} from 'moq.ts';

import {ZipReadableEntity} from '../../../../../../src/infrastructure/zip/core/entities/zip-readable-entity';
import {CompressedFile} from '../../../../../../src/infrastructure/zip/core/interfaces/compressed-file';
import {UnzipService} from '../../../../../../src/infrastructure/zip/core/services/unzip-service';
import {readableMock, readableMoq} from '../../../../__mocks__/readable-mock';

describe('Given Unzip Service', () => {
  let service: CompressedFile;

  beforeEach(() => {
    service = new UnzipService();
  });

  describe('Given unzip method', () => {
    it('Should pipe readable with extract in current directory', async () => {
      readableMock.on.mockImplementation((event, callback) => {
        if (event === 'finish') {
          callback();
        }

        return readableMoq.object();
      });

      jest
        .spyOn(ZipReadableEntity, 'make')
        .mockReturnValue(readableMoq.object());

      const buffer = new Mock<Buffer>().object();

      const finish = await service.unzip(buffer);

      expect(finish).toBeUndefined();
    });

    it('Should throw error when fail', async () => {
      const errorMessage = faker.lorem.words();
      readableMock.on.mockImplementation((event, callback) => {
        if (event === 'error') {
          callback(errorMessage);
        }

        return readableMoq.object();
      });

      jest
        .spyOn(ZipReadableEntity, 'make')
        .mockReturnValue(readableMoq.object());

      const buffer = new Mock<Buffer>().object();

      await expect(() => service.unzip(buffer)).rejects.toEqual(errorMessage);
    });
  });
});
