
export const extractImagesFromResult = (crawlResult: any): string[] => {
  if (!crawlResult?.data?.pages) return [];
  
  const images: string[] = [];
  crawlResult.data.pages.forEach((page: any) => {
    if (page.images && Array.isArray(page.images)) {
      page.images.forEach((img: string) => {
        if (!images.includes(img)) {
          images.push(img);
        }
      });
    }
  });
  
  return images;
};

export const extractColorsFromResult = (crawlResult: any): string[] => {
  if (!crawlResult?.data?.pages) return [];
  
  const colors = new Set<string>();
  crawlResult.data.pages.forEach((page: any) => {
    if (page.styles) {
      const colorRegex = /#[0-9A-Fa-f]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\)/g;
      const matches = page.styles.match(colorRegex);
      if (matches) {
        matches.forEach((color: string) => colors.add(color));
      }
    }
  });
  
  return Array.from(colors);
};
