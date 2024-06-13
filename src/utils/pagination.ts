export const DEFAULT_LIMIT = 10;

type PaginationApiModel = {
  skip: number;
  limit: number;
};

export function pageToOffLim(
  page: number,
  count = DEFAULT_LIMIT,
): PaginationApiModel {
  const limit = count;
  const skip = (page - 1) * limit;
  return { skip, limit };
}
