
export const extractImagesFromHtml = (html: string): string[] => {
  if (!html) return [];
  
  const imgRegex = /<img[^>]+src="([^">]+)"/g;
  const images: string[] = [];
  let match;
  
  while ((match = imgRegex.exec(html)) !== null) {
    if (match[1] && !images.includes(match[1])) {
      images.push(match[1]);
    }
  }
  
  return images;
};

export const extractColorsFromCss = (css: string): string[] => {
  if (!css) return [];
  
  const colorRegex = /#[0-9A-Fa-f]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\)/g;
  const colors = new Set<string>();
  const matches = css.match(colorRegex);
  
  if (matches) {
    matches.forEach((color: string) => colors.add(color));
  }
  
  return Array.from(colors);
};

export const extractLinksFromHtml = (html: string): string[] => {
  if (!html) return [];
  
  const linkRegex = /<a[^>]+href="([^">]+)"/g;
  const links: string[] = [];
  let match;
  
  while ((match = linkRegex.exec(html)) !== null) {
    if (match[1] && !links.includes(match[1])) {
      links.push(match[1]);
    }
  }
  
  return links;
};
