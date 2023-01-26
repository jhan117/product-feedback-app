import classes from "./CommentsContainer.module.css";

import useMediaQuery from "../../hooks/useMediaQuery";

import Card from "../ui/Card";
import CommentList from "./CommentList";

function CommentsContainer(props) {
  const isTablet = useMediaQuery("tablet");

  let cardStyle = {};

  if (isTablet) {
    cardStyle = {
      display: "flex",
      flexDirection: "column",
      rowGap: "2.8rem",
      padding: "2.4rem 3.2rem 3.2rem",
    };
  } else {
    cardStyle = {
      display: "flex",
      flexDirection: "column",
      rowGap: "2.4rem",
      padding: "2.4rem",
    };
  }

  return (
    <Card style={cardStyle}>
      <h4 className={classes.commentH4}>{props.commentsCnt} Comments</h4>
      {props.comments ? (
        <CommentList
          suggestionId={props.id}
          comments={props.comments}
          setIsReplySubmit={props.setIsReplySubmit}
        />
      ) : null}
    </Card>
  );
}

export default CommentsContainer;
