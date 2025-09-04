export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // spaces → dashes
    .replace(/[^\w-]+/g, ''); // remove special chars
}