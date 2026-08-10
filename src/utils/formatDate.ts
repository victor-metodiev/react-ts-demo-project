/**
 * Formats ISO date strings into a readable date.
 * Example output: 2026-08-09T15:02:31.452Z -> "August 9, 2026"
 */
export const formatDate = (
  dateString: string,
  fallback: string = "N/A",
): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return fallback;
  }

  return date.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
