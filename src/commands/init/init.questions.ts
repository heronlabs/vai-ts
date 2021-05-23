export enum InitQuestions {
  PROJECT_NAME = 'projectName',
}

export interface InitQuestion {
  [InitQuestions.PROJECT_NAME]: string;
}
