export enum InitBoilerplateOptions {
  PROJECT_NAME = 'projectName',
}

export type InitBoilerplateAnswers = {
  [InitBoilerplateOptions.PROJECT_NAME]: string;
};
