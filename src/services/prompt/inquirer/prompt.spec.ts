import inquirer = require('inquirer');

import {InquirerService} from './prompt.service';
import {Question} from '../question.model';
import {QuestionType} from '../question.enum';

enum Questions {
  NAME = 'name',
  HUMAN = 'human',
}

interface Answers {
  [Questions.NAME]: string;
  [Questions.HUMAN]: boolean;
}

describe('Given prompt ask service', () => {
  const questions: Question<Questions>[] = [
    {
      name: Questions.NAME,
      type: QuestionType.INPUT,
      message: 'What is your name?',
      default: 'no-name',
    },
  ];

  const askService = new InquirerService();

  it('Should ask questions and return answers', async () => {
    const answeredName = 'James';

    jest.spyOn(inquirer, 'prompt').mockResolvedValue({
      name: answeredName,
    });

    const answers = await askService.askQuestions<Questions, Answers>(
      questions
    );

    const answer = answers[Questions.NAME];

    expect(answer).toEqual(answeredName);
  });
});
