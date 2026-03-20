/**
 * Estimate reading time from raw markdown content.
 * Uses 200 wpm for academic/technical content (slower than casual 250 wpm).
 */
export function getReadingTime(markdown: string): string {
  // Strip frontmatter
  const content = markdown.replace(/^---[\s\S]*?---/, '');

  // Strip markdown syntax (headers, links, images, bold, etc.)
  const plainText = content
    .replace(/!\[.*?\]\(.*?\)/g, '')      // images
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1') // links (keep text)
    .replace(/#{1,6}\s*/g, '')             // headers
    .replace(/[*_~`]/g, '')               // emphasis/code markers
    .replace(/>\s*/gm, '')                // blockquotes
    .replace(/-{3,}/g, '')                // horizontal rules
    .replace(/\|.*\|/g, '')               // table rows
    .trim();

  const words = plainText.split(/\s+/).filter(w => w.length > 0).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
