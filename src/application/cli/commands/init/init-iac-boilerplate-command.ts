import {Inject} from '@nestjs/common';
import {Command, CommandRunner, Option} from 'nest-commander';

import {RepositoryEntity} from '../../../../core/entities/repository-entity';
import {RepositoryInteractor} from '../../../../core/interfaces/repository-interactor';
import {RepositoryInteractorService} from '../../../../core/services/repository-interactor-service';
import {InitBoilerplateOptions} from '../../enums/init-boilerplate-options-enum';
import {ConsolePresenter} from '../../presenters/console-presenter';

@Command({
  name: 'init-iac-boilerplate',
  aliases: ['i-iac'],
  description: 'Initialize Typescript with IaC boilerplate',
})
export class InitIacBoilerplateCommand extends CommandRunner {
  constructor(
    @Inject(RepositoryInteractorService)
    private readonly repositoryInteractor: RepositoryInteractor,
    @Inject(ConsolePresenter)
    private readonly consolePresenter: ConsolePresenter
  ) {
    super();
  }

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
    options: {
      [InitBoilerplateOptions.PROJECT_NAME]: string;
    }
  ): Promise<void> {
    const version = '8.0.0';

    const repositoryEntity = RepositoryEntity.make(
      'vai-ts-iac-boilerplate',
      `https://github.com/heronlabs/vai-ts-iac-boilerplate/archive/refs/tags/${version}.zip`,
      version
    );

    await this.repositoryInteractor.clone(
      this.parseProjectName(options[InitBoilerplateOptions.PROJECT_NAME]),
      repositoryEntity
    );

    this.consolePresenter.envelope(
      'IaC Boilerplate initialized successfully! 📦 🃏 📘'
    );
  }
}
