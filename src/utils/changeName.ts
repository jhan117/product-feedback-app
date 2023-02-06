import { sortList, statusList, optionTagList } from "./nameList";

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

export const listIdToName = (
  state: string,
  idOrName: string,
  reverse: boolean = false
) => {
  let list;
  if (state === "sort") list = sortList;
  else if (state === "status") list = statusList;
  else list = optionTagList;

  for (const item of list) {
    if (reverse) {
      if (item.name === idOrName) {
        return item.id;
      }
    }
    if (item.id === idOrName) {
      return item.name;
    }
  }
};
