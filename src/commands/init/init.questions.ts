export enum InitQuestions {
  PROJECT_NAME = 'projectName',
  THIRD_PARTY_GTS = 'gts',
  THIRD_PARTY_JEST = 'jest',
  DEV_OPS_TRAVIS = 'travis',
}

export interface InitAnswers {
  [InitQuestions.PROJECT_NAME]: string;
  [InitQuestions.THIRD_PARTY_GTS]: boolean;
  [InitQuestions.THIRD_PARTY_JEST]: boolean;
  [InitQuestions.DEV_OPS_TRAVIS]: boolean;
}
