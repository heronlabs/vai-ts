import {Inject} from '@nestjs/common';
import {Command, CommandRunner} from 'nest-commander';

import {PackageEntity} from '../../../../core/entities/package-entity';
import {ReadAssets} from '../../../../core/interfaces/read-assets';
import {ReadPackageService} from '../../../../core/services/read-package-service';
import {BaseCommand} from '../base-command';

@Command({name: 'version', description: 'Print current version'})
export class VersionCommand extends BaseCommand implements CommandRunner {
  constructor(
    @Inject(ReadPackageService)
    private readonly readPackageService: ReadAssets<PackageEntity>
  ) {
    super();
  }

  public async run(): Promise<void> {
    const packageFile = this.readPackageService.readFile('./package.json');
    const currentVersion = packageFile.version;

    this.envelope(`Current Version: ${currentVersion}`);
  }
}
