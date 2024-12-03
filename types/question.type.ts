export type SummaryContent = {
  headline: string;
  text: string;
};

export type SummaryType = "soft_summary" | "softer_summary" | "original";

export type Question = {
  id: number;
  question: string;
  softer_summary: SummaryContent;
  soft_summary: SummaryContent;
  original: SummaryContent;
};
