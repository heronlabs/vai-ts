import {Inject} from '@nestjs/common';
import {Command, CommandRunner, Option} from 'nest-commander';

import {RepositoryEntity} from '../../../../core/entities/repository-entity';
import {RepositoryInteractor} from '../../../../core/interfaces/repository-interactor';
import {RepositoryInteractorService} from '../../../../core/services/repository-interactor-service';
import {Terminal} from '../../../terminal/core/interfaces/terminal';
import {TerminalService} from '../../../terminal/core/services/terminal-service';
import {ConsolePresenter} from '../../presenters/console-presenter';
import {
  InitBoilerplateAnswers,
  InitBoilerplateOptions,
} from './dtos/init-boilerplate-options';

@Command({
  name: 'init-cms-boilerplate',
  aliases: ['i-cms'],
  description: 'Initialize Typescript with CMS Headless boilerplate',
})
export class InitCmsBoilerplateCommand implements CommandRunner {
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

  public async run(
    _args: string[],
    options: InitBoilerplateAnswers
  ): Promise<void> {
    const repositoryEntity = RepositoryEntity.make(
      'vai-ts-cms-boilerplate',
      'https://github.com/heronlabs/vai-ts-cms-boilerplate/archive/refs/tags/1.9.0.zip',
      '1.9.0'
    );

    await this.repositoryInteractor.clone(
      this.parseProjectName(options[InitBoilerplateOptions.PROJECT_NAME]),
      repositoryEntity
    );

    await this.terminal.installNodePackages(
      options[InitBoilerplateOptions.PROJECT_NAME]
    );

    this.consolePresenter.envelope(
      'CMS Headless Boilerplate initialized successfully! 📦 🃏 📘'
    );
  }
}