export const getProductImageAlt = (productTitle: string, index: number = 0): string => {
  if (index === 0) {
    return `${productTitle} - Professional cleaning supplies`;
  }
  return `${productTitle} - Product image ${index + 1}`;
};

export const getCategoryImageAlt = (categoryName: string): string => {
  return `${categoryName} cleaning supplies - Shop by category`;
};

export const getHeroImageAlt = (title: string): string => {
  return `${title} - Hyper Cleaning Supplies hero image`;
};