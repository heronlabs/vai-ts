import {Inject} from '@nestjs/common';

import {RepositoryEntity} from '../../../../core/entities/repository-entity';
import {CloneGit} from '../../../../core/interfaces/clone-git';
import {InstallPackages} from '../../../../core/interfaces/install-packages';
import {CloneBoilerplateService} from '../../../../core/services/clone-boilerplate-service';
import {InstallBoilerplatePackagesService} from '../../../../core/services/install-boilerplate-packages-service';
import {InitBoilerplateAnswers} from '../../../terminal/answers/init-boilerplate-answers';
import {Commands} from '../../enums/commands';
import {QuestionType} from '../../enums/question-type';
import {Command} from '../../interfaces/command';
import {Options} from '../../interfaces/options';
import {Question} from '../../interfaces/question/question';
import {InitBoilerplateQuestions} from './init-boilerplate-questions';

export class InitBoilerplateCommand
  implements Command, Options<InitBoilerplateQuestions>
{
  constructor(
    @Inject(CloneBoilerplateService)
    private readonly cloneBoilerplateService: CloneGit,
    @Inject(InstallBoilerplatePackagesService)
    private readonly installBoilerplatePackagesService: InstallPackages
  ) {}

  getName(): string {
    return Commands.INIT_BOILERPLATE;
  }

  getQuestions(): Question<InitBoilerplateQuestions>[] {
    return [
      {
        name: InitBoilerplateQuestions.PROJECT_NAME,
        type: QuestionType.INPUT,
        message: 'What is the name of the project?',
        default: 'my-project',
      },
    ];
  }

  async run(answers: InitBoilerplateAnswers): Promise<void> {
    const repositoryEntity = RepositoryEntity.make(
      'vai-ts-boilerplate',
      'https://github.com/heronlabs/vai-ts-boilerplate/archive/refs/tags/2.3.0.zip',
      '2.3.0'
    );

    await this.cloneBoilerplateService.clone(
      answers.projectName,
      repositoryEntity
    );

    await this.installBoilerplatePackagesService.install(answers.projectName);
  }
}
