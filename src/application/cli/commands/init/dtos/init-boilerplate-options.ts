export enum InitBoilerplateOptions {
  PROJECT_NAME = 'name',
}

export type InitBoilerplateAnswers = {
  [InitBoilerplateOptions.PROJECT_NAME]: string;
};
