export const babelConfig = (): string => {
  const template = `
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
      '@babel/preset-typescript',
    ],
  ],
};
`;

  return template.trimStart();
};
