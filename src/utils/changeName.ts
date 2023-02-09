export const statusToUpper = (status: string) => {
  if (status.includes("-")) return "In-Progress";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const categoryToUpper = (category: string) => {
  if (category.length > 2) {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }
  return category.toUpperCase();
};

export const queryToName = (query: string) => {
  return query
    .split("_")
    .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
    .join(" ");
};
