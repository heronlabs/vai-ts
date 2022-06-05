import {Inject} from '@nestjs/common';

import {RepositoryEntity} from '../../../../core/entities/repository-entity';
import {CloneGit} from '../../../../core/interfaces/clone-git';
import {Command} from '../../interfaces/command';
import {Commands} from '../commands';

export class InitBoilerplateCommand implements Command {
  constructor(
    @Inject('CloneBoilerplate')
    private readonly cloneBoilerplateService: CloneGit
  ) {}

  getName(): string {
    return Commands.INIT;
  }

  async run(): Promise<void> {
    const repositoryEntity = RepositoryEntity.make(
      'vai-ts-boilerplate',
      'https://github.com/heronlabs/vai-ts-boilerplate/archive/refs/tags/2.0.0.zip',
      '2.0.0'
    );

    await this.cloneBoilerplateService.clone(
      '.temp/boilerplate',
      repositoryEntity
    );
  }
}
