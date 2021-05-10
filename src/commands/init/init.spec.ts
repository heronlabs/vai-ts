import {Babel} from '../../third-parties/babel/babel.service';
import {Command} from '../command.enum';
import {GTS} from '../../third-parties/gts/gts.service';
import {Init} from './init.service';
import {InitOptions} from './options.enum';
import {Jest} from '../../third-parties/jest/jest.service';
import {Mock} from 'moq.ts';
import {Skeleton} from '../../skeleton/skeleton.service';
import {Travis} from '../../dev-ops/travis/travis.service';

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

  describe('Run', () => {
    const run = async (options: string[], projectName: string) => {
      const skeletonSpy = jest.spyOn(skeleton, 'init').mockImplementation();
      const babelSpy = jest.spyOn(babel, 'init').mockImplementation();
      const gtsSpy = jest.spyOn(gts, 'init').mockImplementation();
      const jestSpy = jest.spyOn(_jest, 'init').mockImplementation();
      const travisSpy = jest.spyOn(travis, 'init').mockImplementation();

      await init.run(options);

      expect(skeletonSpy).toHaveBeenCalledWith(projectName);

      expect(babelSpy).toHaveBeenCalledWith(projectName);
      expect(gtsSpy).toHaveBeenCalledWith(projectName);
      expect(jestSpy).toHaveBeenCalledWith(projectName);

      expect(travisSpy).toHaveBeenCalledWith(projectName);
    };

    it('Should run with my-test-project', async () => {
      const options = ['--name=my-test-project'];

      await run(options, 'my-test-project');
    });

    it('Should run with my-project', async () => {
      const options = [''];

      await run(options, 'my-project');
    });
  });

  describe('Whoami', () => {
    it('Should return whoami', () => {
      const whoami = init.whoami;

      expect(whoami).toBe(Command.init);
    });
  });

  describe('Get Options', () => {
    it('Should return options', () => {
      const currentOptions = Object.values(InitOptions);

      const options = init.getOptions().toString();

      expect(options).toBe(currentOptions.toString());
    });
  });
});
