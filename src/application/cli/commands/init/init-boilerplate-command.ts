import {Inject} from '@nestjs/common';
import {Command, CommandRunner, Option} from 'nest-commander';

import {RepositoryEntity} from '../../../../core/entities/repository-entity';
import {CloneGit} from '../../../../core/interfaces/clone-git';
import {InstallPackages} from '../../../../core/interfaces/install-packages';
import {CloneBoilerplateService} from '../../../../core/services/clone-boilerplate-service';
import {InstallBoilerplatePackagesService} from '../../../../core/services/install-boilerplate-packages-service';
import {BaseCommand} from '../base-command';
import {
  InitBoilerplateAnswers,
  InitBoilerplateOptions,
} from './init-boilerplate-options';

@Command({
  name: 'init-boilerplate',
  description: 'Initialize typescript boilerplate',
})
export class InitBoilerplateCommand
  extends BaseCommand
  implements CommandRunner
{
  constructor(
    @Inject(CloneBoilerplateService)
    private readonly cloneBoilerplateService: CloneGit,
    @Inject(InstallBoilerplatePackagesService)
    private readonly installBoilerplatePackagesService: InstallPackages
  ) {
    super();
  }

  @Option({
    flags: `-p, --project-name [${InitBoilerplateOptions.PROJECT_NAME}]`,
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
      'vai-ts-boilerplate',
      'https://github.com/heronlabs/vai-ts-boilerplate/archive/refs/tags/2.5.0.zip',
      '2.5.0'
    );

    await this.cloneBoilerplateService.clone(
      this.parseProjectName(options.projectName),
      repositoryEntity
    );

    await this.installBoilerplatePackagesService.install(options.projectName);

    this.envelope('Boilerplate initialized successfully! 📦 🃏 📘');
  }
}
