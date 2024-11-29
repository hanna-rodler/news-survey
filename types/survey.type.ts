import type { SummaryType } from "./question.type";

export type gender = "female" | "male" | "diverse" | "no_indication" | "";
export type age = number | "";
export type emotionalCapacity = 0 | 25 | 50 | 75 | 100 | undefined;

export type surveyResponseType = {
  gender: gender;
  age: age;
  articles: [articleSelection];
  emotionalCapacity: emotionalCapacity;
};

export type articleSelection = {
  id: string;
  selectedSummary: "" | SummaryType;
};
