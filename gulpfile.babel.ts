import {dest, series, src, task} from 'gulp';

import {task as _task} from 'gulp-shell';
import del from 'del';
import vinylPaths from 'vinyl-paths';

task('clean-build-folder', () => {
  return src('./build', {read: false, allowEmpty: true}).pipe(vinylPaths(del));
});

task('move-babel-templates', () => {
  return src(['src/commands/init/third-parties/babel/templates/*']).pipe(
    dest('./build/src/commands/init/third-parties/babel/templates')
  );
});

task('compile', _task(['yarn compile']));

task('build', series('clean-build-folder', 'compile', 'move-babel-templates'));
