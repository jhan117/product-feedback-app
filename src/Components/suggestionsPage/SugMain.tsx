import { useAppSelector } from "../../store/hooks";

import MainBar from "./MainBar";
import Loader from "../ui/Loader";
import EmptyContent from "./Suggestion/EmptyContent";
import SuggestionList from "./Suggestion/SuggestionList";
import classes from "./SugMain.module.css";

import { selectSortedSugs } from "../../store/suggestions-slice";

const SugMain = () => {
  const state = useAppSelector((state) => state);
  const data: Suggestion[] = selectSortedSugs(state)!;
  const errorMessage = useAppSelector(
    (state) => state.suggestions.errorMessage
  );
  const isLoading = useAppSelector((state) => state.suggestions.isLoading);

  const dataLength = data.length;

  let content = <EmptyContent />;
  if (dataLength > 0) {
    content = <SuggestionList items={data} />;
  }
  if (isLoading) {
    if (errorMessage) {
      content = <p>{errorMessage}</p>;
    } else {
      content = <Loader />;
    }
  }

  return (
    <main className={classes.sugMain}>
      <MainBar length={dataLength} />
      {content}
    </main>
  );
};

export default SugMain;
