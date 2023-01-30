import { Fragment } from "react";

import SuggestionItem from "../suggestionsPage/Suggestion/SuggestionItem";
import classes from "./DetailMain.module.css";

import useSugById from "../../hooks/useSugByID";

interface Props {
  id: string;
}

const DetailMain = (props: Props) => {
  const suggestion = useSugById(props.id)!;

  const mainContent = (
    <Fragment>
      <SuggestionItem item={suggestion} isDetail={true} />
      <CommentsContainer
        id={loadedDetailData.id}
        comments={loadedCommentsData}
        commentsCnt={commentsCount}
        setIsReplySubmit={setIsReplySubmit}
      />
    </Fragment>
  );

  return <main className={classes.detailMain}>{mainContent}</main>;
};

export default DetailMain;
