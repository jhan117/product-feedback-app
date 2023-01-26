import { useAppSelector } from "../../store/hooks";

import MainBar from "./MainBar";
import SuggestionList from "./Suggestion/SuggestionList";
import Loader from "../ui/Loader";
import EmptyContent from "./Suggestion/EmptyContent";
import classes from "./SugMain.module.css";

import { selectSortedSugs } from "../../store/suggestions-slice";

const SugMain = () => {
  const state = useAppSelector((state) => state);
  const data: Suggestion[] = selectSortedSugs(state)!;
  const isLoading = useAppSelector((state) => state.suggestions.isLoading);

  const dataLength = data.length;

  let content = <EmptyContent />;

  if (dataLength > 0) {
    content = <SuggestionList items={data} />;
  }
  // error 컴포넌트 추가
  if (isLoading) {
    content = <Loader />;
  }

  return (
    <main className={classes.sugMain}>
      <MainBar length={dataLength} />
      {content}
    </main>
  );
};

export default SugMain;
