import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import catalog from '../data/catalog.json';

export async function GET(context: APIContext) {
  const articles = await getCollection('articles');

  // Build discussion items
  const discussionItems = articles
    .sort((a, b) =>
      new Date(b.data.date + 'T12:00:00').getTime() - new Date(a.data.date + 'T12:00:00').getTime()
    )
    .map(article => ({
      title: `[Discussion] ${article.data.title}`,
      description: article.data.edition
        ? `${article.data.edition} - Commentary and analysis on TTA-UC research developments.`
        : 'Commentary and analysis on TTA-UC research developments.',
      link: `/discussion/${article.id}`,
      pubDate: new Date(article.data.date + 'T12:00:00'),
    }));

  // Build paper items (recent 30 to keep the feed manageable)
  const paperItems = [...catalog]
    .sort((a, b) =>
      new Date(b.date + 'T12:00:00').getTime() - new Date(a.date + 'T12:00:00').getTime()
    )
    .slice(0, 30)
    .map(paper => {
      const authors = paper.authors.slice(0, 3).join(', ') +
        (paper.authors.length > 3 ? ' et al.' : '');
      const journal = paper.journal ? ` in ${paper.journal}` : '';

      return {
        title: `[Paper] ${paper.title}`,
        description: `${authors}${journal}. ${paper.abstract_summary}`,
        link: paper.url || `/catalog`,
        pubDate: new Date(paper.date + 'T12:00:00'),
      };
    });

  // Merge and sort by date
  const allItems = [...discussionItems, ...paperItems]
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'TTA-UC Research Tracker',
    description: 'Curated catalog and commentary on Triplet-Triplet Annihilation Upconversion research.',
    site: context.site || 'https://tta-uc-tracker.pages.dev',
    items: allItems,
    customData: '<language>en-us</language>',
  });
}
