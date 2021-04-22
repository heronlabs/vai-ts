export const prettierConfig = (): string => {
  const template = `
  module.exports = {
    ...require('gts/.prettierrc.json')
  }
  `;

  return template;
};
