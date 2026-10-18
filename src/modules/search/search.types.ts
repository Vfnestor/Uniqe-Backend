export type SearchResultType =
  | "uapp"
  | "course"
  | "category"
  | "knowledge";

export type SearchResult = {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  category?: string;
  href: string;
  icon?: string;
  updatedAt: string;
};

export type SearchResultInput = {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  category?: string;
  href: string;
  icon?: string;
  updatedAt: Date;
};