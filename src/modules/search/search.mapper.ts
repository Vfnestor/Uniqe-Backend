import type {
  SearchResult,
  SearchResultInput,
} from "./search.types";

export function mapSearchResult(
  input: SearchResultInput,
): SearchResult {
  return {
    id: input.id,

    type: input.type,

    title: input.title,

    description: input.description,

    ...(input.category
      ? {
          category: input.category,
        }
      : {}),

    href: input.href,

    ...(input.icon
      ? {
          icon: input.icon,
        }
      : {}),

    updatedAt:
      input.updatedAt.toISOString(),
  };
}