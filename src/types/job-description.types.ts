// Job Description API Response Types

export interface TextAttribute {
  start: number;
  length: number;
  type: {
    comlinkedinpemberlytextLineBreak?: Record<string, never>;
    comlinkedinpemberlytextBold?: Record<string, never>;
    comlinkedinpemberlytextItalic?: Record<string, never>;
    comlinkedinpemberlytextListItem?: Record<string, never>;
    comlinkedinpemberlytextList?: { ordered: boolean };
  };
  attributeKindUnion: {
    lineBreak?: Record<string, never>;
    bold?: Record<string, never>;
    italic?: Record<string, never>;
    listItem?: Record<string, never>;
    list?: { ordered: boolean };
    underline?: Record<string, never>;
    hyperlink?: { url: string };
    superscript?: Record<string, never>;
    paragraph?: Record<string, never>;
  };
}

export interface JobDescriptionResponse {
  _id: string;
  text: string;
  attributes: Record<string, TextAttribute>;
}

export type JobDescriptionApiResponse = JobDescriptionResponse[];

// Component Props Types
export interface JobDescriptionProps {
  jobId: string;
  className?: string;
}

// Component State Types (kept for potential future use)
export interface JobDescriptionState {
  description: JobDescriptionResponse | null;
  loading: boolean;
  error: string | null;
}