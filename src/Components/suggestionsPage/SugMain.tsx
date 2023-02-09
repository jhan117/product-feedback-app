import { useAppSelector } from "../../store/hooks";
import { useSearchParams } from "react-router-dom";

import MainBar from "./MainBar";
import Loader from "../ui/Loader";
import EmptyContent from "./Suggestion/EmptyContent";
import SuggestionList from "./Suggestion/SuggestionList";
import classes from "./SugMain.module.css";

import { selectSortedSugs } from "../../store/suggestions-slice";

const SugMain = () => {
  const searchParams = useSearchParams()[0];
  const state = useAppSelector((state) => state);
  const data: Suggestion[] | undefined = selectSortedSugs(
    state,
    searchParams.get("category") || "all",
    searchParams.get("sort") || "most_upvotes"
  );

  const { isLoading, error } = state.suggestions;

  let content;
  if (data) {
    if (data.length > 0) {
      content = <SuggestionList items={data} />;
    } else {
      content = <EmptyContent />;
    }
  }
  if (isLoading) {
    content = <Loader />;
  }

  return (
    <main className={classes.sugMain}>
      <MainBar length={data?.length || 0} />
      {error !== "Failed to get data" && content}
    </main>
  );
};

export default SugMain;
