/**
 * Formats raw numbers into clean compact strings with K and M suffixes.
 * Examples:
 * 2,400,000 -> "2.4M"
 * 980,000   -> "980K"
 * 11,800    -> "11.8K"
 * 48,000    -> "48K"
 */
export function formatNumber(num?: number): string {
  if (num === null || num === undefined || isNaN(num) || num <= 0) return '';

  if (num >= 1_000_000) {
    const formatted = (num / 1_000_000).toFixed(1);
    return formatted.endsWith('.0') ? `${Math.round(num / 1_000_000)}M` : `${formatted}M`;
  }

  if (num >= 10_000) {
    const formatted = (num / 1_000).toFixed(0);
    return `${formatted}K`;
  }

  if (num >= 1_000) {
    const formatted = (num / 1_000).toFixed(1);
    return formatted.endsWith('.0') ? `${Math.round(num / 1_000)}K` : `${formatted}K`;
  }

  return num.toLocaleString();
}
