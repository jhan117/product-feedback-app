import { useAppSelector } from "../store/hooks";

const useSugById = (sugId: string | number) => {
  const suggestionItems = useAppSelector(
    (state) => state.suggestions.suggestionItems
  );

  return suggestionItems.find((item) => item.id === Number(sugId));
};

export default useSugById;
