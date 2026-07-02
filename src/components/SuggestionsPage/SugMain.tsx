import { useAppSelector } from "../../store/hooks";
import { useSearchParams } from "react-router-dom";

import MainBar from "./MainBar";
import Loader from "../UI/Loader";
import EmptyContent from "./Suggestion/EmptyContent";
import SuggestionList from "./Suggestion/SuggestionList";
import classes from "./SugMain.module.css";

import { selectSortedSugs } from "../../store/suggestions-slice";

const SugMain = () => {
  const searchParams = useSearchParams()[0];
  const filter = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "most_upvotes";
  const data: Suggestion[] | undefined = useAppSelector((state) =>
    selectSortedSugs(state, filter, sort)
  );

  const isLoading = useAppSelector((state) => state.suggestions.isLoading);
  const error = useAppSelector((state) => state.suggestions.error);

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
