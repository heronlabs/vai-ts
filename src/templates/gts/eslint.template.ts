export const eslintrcConfig = (): string => {
  const template = `
  {
    "extends": "./node_modules/gts/",
    "rules": {
      "node/no-unpublished-import": 0
    }
  }  
  `;

  return template;
};

export const eslintIgnoreConfig = (): string => {
  const template = `
  build/
  node_modules/
  coverage/
  docs/  
  `;

  return template;
};
