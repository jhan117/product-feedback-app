import { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import classes from "./DetailFeedbackPage.module.css";
import SuggestionsContext from "../store/suggestions-context";
import MediaContext from "../store/media-context";

import CommentList from "../Components/comments/CommentList";
import NewCommentForm from "../Components/comments/NewCommentForm";
import SuggestionItem from "../Components/suggestions/SuggestionItem";
import Card from "../Components/ui/Card";
import GoBack from "../Components/ui/GoBack";

import DummyData from "../data.json";

function DetailFeedbackPage() {
  const suggestionsCtx = useContext(SuggestionsContext);
  const mediaCtx = useContext(MediaContext);
  const { requestId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const thisRequest = suggestionsCtx.suggestions.find(
    (req) => String(req.id) === requestId
  );

  const commentsCount = suggestionsCtx.totalComments.find(
    (comment) => comment.id === thisRequest.id
  ).AllCommentsCount;

  function addCommentHandler(commentData) {
    suggestionsCtx.addComment(thisRequest.id, {
      id: suggestionsCtx.curCommentId,
      content: commentData,
      user: DummyData.currentUser,
    });
  }

  let cardStyle = {};

  if (mediaCtx.isTablet) {
    cardStyle = {
      padding: "2.4rem 3.2rem 3.2rem",
      gridColumn: "1 / 13",
    };
  } else {
    cardStyle = {
      padding: "2.4rem",
    };
  }

  return (
    <div className={classes.detailBody}>
      <header className={classes.detailHeader}>
        <GoBack />
        <button className={classes.editBtn}>
          <Link className={classes.editLink} to={`/edit/${thisRequest.id}`}>
            Edit Feedback
          </Link>
        </button>
      </header>
      <SuggestionItem
        id={thisRequest.id}
        title={thisRequest.title}
        description={thisRequest.description}
        category={thisRequest.category}
        upvotes={thisRequest.upvotes}
        commentsNum={commentsCount}
      />
      <Card style={cardStyle}>
        <h4 className={classes.commentH4}>{commentsCount} Comments</h4>
        {thisRequest.comments ? (
          <CommentList
            suggestionId={thisRequest.id}
            comments={thisRequest.comments}
          />
        ) : null}
      </Card>
      <NewCommentForm onAddComment={addCommentHandler} />
    </div>
  );
}

export default DetailFeedbackPage;
