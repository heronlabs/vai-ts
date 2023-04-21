import {Inject} from '@nestjs/common';
import {Command, CommandRunner, Option} from 'nest-commander';

import {RepositoryEntity} from '../../../../core/entities/repository-entity';
import {RepositoryInteractor} from '../../../../core/interfaces/repository-interactor';
import {RepositoryInteractorService} from '../../../../core/services/repository-interactor-service';
import {InitBoilerplateOptions} from '../../../terminal/core/enums/init-boilerplate-options-enum';
import {RunnerOptions} from '../../../terminal/core/enums/runner-options-enum';
import {Terminal} from '../../../terminal/core/interfaces/terminal';
import {TerminalService} from '../../../terminal/core/services/terminal-service';
import {ConsolePresenter} from '../../presenters/console-presenter';

@Command({
  name: 'init-api-store-boilerplate',
  aliases: ['i-api-store'],
  description: 'Initialize Typescript with API Store boilerplate',
})
export class InitApiStoreBoilerplateCommand implements CommandRunner {
  constructor(
    @Inject(RepositoryInteractorService)
    private readonly repositoryInteractor: RepositoryInteractor,
    @Inject(TerminalService)
    private readonly terminal: Terminal,
    @Inject(ConsolePresenter)
    private readonly consolePresenter: ConsolePresenter
  ) {}

  @Option({
    flags: `-n, --name [${InitBoilerplateOptions.PROJECT_NAME}]`,
    description: 'The project name',
    defaultValue: 'my-project',
  })
  public parseProjectName(val: string): string {
    return val;
  }

  @Option({
    flags: `-r, --runner [${InitBoilerplateOptions.RUNNER}]`,
    description: 'Runner for install',
    defaultValue: RunnerOptions.NPM,
  })
  public parseRunner(val: RunnerOptions): RunnerOptions {
    return val;
  }

  public async run(
    _args: string[],
    options: {
      [InitBoilerplateOptions.PROJECT_NAME]: string;
      [InitBoilerplateOptions.RUNNER]: RunnerOptions;
    }
  ): Promise<void> {
    const version = '6.0.0';

    const repositoryEntity = RepositoryEntity.make(
      'vai-ts-api-store-boilerplate',
      `https://github.com/heronlabs/vai-ts-api-store-boilerplate/archive/refs/tags/${version}.zip`,
      version
    );

    await this.repositoryInteractor.clone(
      this.parseProjectName(options[InitBoilerplateOptions.PROJECT_NAME]),
      repositoryEntity
    );

    await this.terminal.installNodePackages(
      options[InitBoilerplateOptions.PROJECT_NAME],
      this.parseRunner(options[InitBoilerplateOptions.RUNNER])
    );

    this.consolePresenter.envelope(
      'API Store Boilerplate initialized successfully! 📦 🃏 📘'
    );
  }
}
