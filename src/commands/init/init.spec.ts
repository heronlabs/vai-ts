import {Babel} from '../../third-parties/babel/babel.service';
import {Command} from '../command.enum';
import {GTS} from '../../third-parties/gts/gts.service';
import {Init} from './init.service';
import {Jest} from '../../third-parties/jest/jest.service';
import {Mock} from 'moq.ts';
import {Skeleton} from '../../skeleton/skeleton.service';
import {Travis} from '../../dev-ops/travis/travis.service';
import {InitQuestions} from './init.questions';
import inquirer = require('inquirer');

describe('Init', () => {
  const babelMock = new Mock<Babel>();
  babelMock.setup(instance => instance.init).returns(jest.fn());
  const babel = babelMock.object();

  const gtsMock = new Mock<GTS>();
  gtsMock.setup(instance => instance.init).returns(jest.fn());
  const gts = gtsMock.object();

  const jestMock = new Mock<Jest>();
  jestMock.setup(instance => instance.init).returns(jest.fn());
  const _jest = jestMock.object();

  const travisMock = new Mock<Travis>();
  travisMock.setup(instance => instance.init).returns(jest.fn());
  const travis = travisMock.object();

  const skeletonMock = new Mock<Skeleton>();
  skeletonMock.setup(instance => instance.init).returns(jest.fn());
  const skeleton = skeletonMock.object();

  const init = new Init(babel, gts, _jest, travis, skeleton);

  describe('Ask questions', () => {
    it('Should ask the project name', async () => {
      jest
        .spyOn(inquirer, 'prompt')
        .mockImplementation()
        .mockResolvedValue({[InitQuestions.PROJECT_NAME]: 'project-name'});

      const answers = await init.askQuestions();

      expect(answers).toEqual({[InitQuestions.PROJECT_NAME]: 'project-name'});
    });
  });

  describe('Run', () => {
    it('Should run with my-test-project', async () => {
      const projectName = 'my-test-project';
      const answersSpy = jest
        .spyOn(init, 'askQuestions')
        .mockImplementation()
        .mockResolvedValue({[InitQuestions.PROJECT_NAME]: projectName});

      const skeletonSpy = jest.spyOn(skeleton, 'init').mockImplementation();
      const babelSpy = jest.spyOn(babel, 'init').mockImplementation();
      const gtsSpy = jest.spyOn(gts, 'init').mockImplementation();
      const jestSpy = jest.spyOn(_jest, 'init').mockImplementation();
      const travisSpy = jest.spyOn(travis, 'init').mockImplementation();

      await init.run();

      expect(answersSpy).toHaveBeenCalledWith();
      expect(skeletonSpy).toHaveBeenCalledWith(projectName);
      expect(babelSpy).toHaveBeenCalledWith(projectName);
      expect(gtsSpy).toHaveBeenCalledWith(projectName);
      expect(jestSpy).toHaveBeenCalledWith(projectName);
      expect(travisSpy).toHaveBeenCalledWith(projectName);
    });
  });

  describe('Whoami', () => {
    it('Should return whoami', () => {
      const whoami = init.whoami;

      expect(whoami).toBe(Command.init);
    });
  });
});
