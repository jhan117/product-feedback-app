export const categoryToUpper = (category: string) => {
  if (category.length > 2) {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }
  return category.toUpperCase();
};

export const listIdToName = (list: Item[], id: string) => {
  for (const item of list) {
    if (item.id === id) {
      return item.name;
    }
  }
};
