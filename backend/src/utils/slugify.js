/**
 * Convert any string into a clean URL-safe slug
 * @param {string} text
 * @returns {string}
 */
export default function slugify(text) {
  if (!text || typeof text !== 'string') {
    throw new Error('slugify: input must be a string');
  }

  return text
    .toString()
    .normalize('NFKD')                 // normalize unicode
    .replace(/[\u0300-\u036f]/g, '')   // remove accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')      // remove special chars
    .replace(/\s+/g, '-')              // spaces to hyphen
    .replace(/-+/g, '-');              // collapse multiple hyphens
}
