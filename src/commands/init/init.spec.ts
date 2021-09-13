import {Command} from '../command.enum';
import {GTS} from '../../options/third-parties/gts/gts.service';
import {IPrint} from '../../services/print/print.interface';
import {IPrompt} from '../../services/prompt/prompt.interface';
import {Init} from './init.service';
import {InitQuestions} from './init.questions';
import {Jest} from '../../options/third-parties/jest/jest.service';
import {Mock} from 'moq.ts';
import {Skeleton} from '../../options/skeleton/skeleton.service';
import {Travis} from '../../options/dev-ops/travis/travis.service';

describe('Init', () => {
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

  const printMock = new Mock<IPrint>();
  printMock.setup(instance => instance.log).returns(jest.fn());
  const print = printMock.object();

  const promptMock = new Mock<IPrompt>();

  const prompt = promptMock.object();

  const init = new Init(gts, _jest, travis, skeleton, print, prompt);

  describe('Run', () => {
    it('Should run with my-test-project with GTS with Jest', async () => {
      const projectName = 'my-test-project';

      promptMock
        .setup(instance => instance.askQuestions)
        .returns(
          jest.fn().mockResolvedValue({
            [InitQuestions.PROJECT_NAME]: projectName,
            [InitQuestions.THIRD_PARTY_GTS]: true,
            [InitQuestions.THIRD_PARTY_JEST]: true,
            [InitQuestions.DEV_OPS_TRAVIS]: true,
          })
        );

      const skeletonSpy = jest.spyOn(skeleton, 'init').mockImplementation();
      const gtsSpy = jest.spyOn(gts, 'init').mockImplementation();
      const jestSpy = jest.spyOn(_jest, 'init').mockImplementation();
      const travisSpy = jest.spyOn(travis, 'init').mockImplementation();

      await init.run();

      expect(skeletonSpy).toHaveBeenCalledWith(projectName);
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
