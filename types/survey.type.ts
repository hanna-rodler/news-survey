import type { SummaryType } from "./question.type";

export type gender = "female" | "male" | "diverse" | "no_indication" | "";
export type age = number | "";
export type emotionalCapacity = 0 | 1 | 2 | 3 | 4 | -1;
export type interest = 0 | 1 | 2 | 3 | 4 | -1;

export type surveyResponseType = {
  gender: gender;
  age: age;
  articles: [articleSelection];
  emotionalCapacity: emotionalCapacity;
};

export type articleSelection = {
  id: string;
  selectedSummary: "" | SummaryType;
  interest: interest;
};
