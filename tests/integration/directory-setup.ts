import {existsSync, rmdirSync} from 'fs';

import {DirectoryFolders} from './directory-folders';

const folderSanitation = () => {
  const path = `./${DirectoryFolders.BOILERPLATE}`;
  if (existsSync(path)) rmdirSync(path, {recursive: true});
};

beforeAll(() => {
  folderSanitation();
});
