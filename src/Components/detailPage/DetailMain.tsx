import { Fragment } from "react";
import { useAppSelector } from "../../store/hooks";

import Card from "../ui/Card";
import Loader from "../ui/Loader";
import CommentList from "./Comment/CommentList";
import SuggestionItem from "../suggestionsPage/Suggestion/SuggestionItem";
import classes from "./DetailMain.module.css";

import { getAllComments } from "../../utils/getCnt";
import { selectSugById } from "../../store/suggestions-slice";

interface Props {
  id: string;
}

const DetailMain = (props: Props) => {
  const state = useAppSelector((state) => state);
  const { isLoading } = state.suggestions;
  const suggestion: Suggestion = selectSugById(state)!;

  let content;
  if (isLoading || !suggestion) {
    content = <Loader />;
  } else {
    content = (
      <Fragment>
        <SuggestionItem item={suggestion} isDetail={true} />
        <Card className={classes.card}>
          <h4>{getAllComments(suggestion.comments)} Comments</h4>
          {suggestion.comments && (
            <CommentList
              id={props.id}
              comments={Object.values(suggestion.comments)}
            />
          )}
        </Card>
      </Fragment>
    );
  }

  return <main className={classes.detailMain}>{content}</main>;
};

export default DetailMain;
