import * as fs from 'fs';

import {dest, series, src, task} from 'gulp';

import {task as _task} from 'gulp-shell';
import del from 'del';
import merge from 'merge-stream';
import vinylPaths from 'vinyl-paths';

task('clean-build-folder', () => {
  return src('./build', {read: false, allowEmpty: true}).pipe(vinylPaths(del));
});

task('move-third-parties-templates', () => {
  const thirdParties = fs.readdirSync('src/third-parties');
  const tasks = thirdParties.map(thirdParty => {
    return src([
      `src/third-parties/${thirdParty}/templates/*`,
      `src/third-parties/${thirdParty}/templates/.*`,
    ]).pipe(dest(`./build/src/third-parties/${thirdParty}/templates`));
  });
  return merge(tasks);
});

task('move-skeleton-templates', () => {
  return merge(
    src(['src/skeleton/templates/**/*', 'src/skeleton/templates/**/.*']).pipe(
      dest('./build/src/skeleton/templates')
    ),
    src(['src/skeleton/templates/.vscode/launch.json']).pipe(
      dest('./build/src/skeleton/templates/.vscode/')
    )
  );
});

task('move-dev-ops-templates', () => {
  const providers = fs.readdirSync('src/dev-ops');
  const tasks = providers.map(provider => {
    return src([
      `src/dev-ops/${provider}/templates/*`,
      `src/dev-ops/${provider}/templates/.*`,
    ]).pipe(dest(`./build/src/dev-ops/${provider}/templates`));
  });
  return merge(tasks);
});

task('compile', _task(['yarn compile']));

task(
  'build',
  series(
    'clean-build-folder',
    'compile',
    'move-third-parties-templates',
    'move-skeleton-templates',
    'move-dev-ops-templates'
  )
);
