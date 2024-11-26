export type SummaryContent = {
  headline: string;
  text: string;
};

export type SummaryType = "soft_summary" | "summary" | "original";

export type Question = {
  id: number;
  question: string;
  soft_summary: SummaryContent;
  summary: SummaryContent;
  original: SummaryContent;
};
