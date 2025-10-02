import {type Cat} from '../types/index';

export function getTopTags(cats: Cat[], limit: number = 3) {
  const tagCount: Record<string, number> = {};
  
  cats.forEach(cat => {
    cat.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag, count]) => ({ tag, count }));
}