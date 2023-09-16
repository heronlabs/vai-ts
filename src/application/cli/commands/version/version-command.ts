import {Inject} from '@nestjs/common';
import {Command, CommandRunner} from 'nest-commander';

import {PackageInteractor} from '../../../../core/interfaces/package-interactor';
import {PackageInteractorService} from '../../../../core/services/package-interactor-service';
import {ConsolePresenter} from '../../presenters/console-presenter';

@Command({name: 'version', description: 'Print current version'})
export class VersionCommand extends CommandRunner {
  constructor(
    @Inject(PackageInteractorService)
    private readonly packageInteractor: PackageInteractor,
    @Inject(ConsolePresenter)
    private readonly consolePresenter: ConsolePresenter
  ) {
    super();
  }

  public async run(): Promise<void> {
    const packageFile = this.packageInteractor.readSelf();
    const currentVersion = packageFile.version;

    this.consolePresenter.envelope(`Current Version: ${currentVersion}`);
  }
}
