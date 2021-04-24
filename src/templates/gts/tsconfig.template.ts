export const tsConfig = (): string => {
  const template = `
{
  "extends": "./node_modules/gts/tsconfig-google.json",
  "compilerOptions": {
    "rootDir": ".",
    "outDir": "build",
  },
  "include": [
    "src/**/*.ts",
    "test/**/*.ts"
  ],
}
  `;

  return template;
};
