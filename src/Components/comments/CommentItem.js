import RepliesList from "./RepliesList";
import CommentHeader from "../ui/CommentHeader";
import NewReplyForm from "./NewReplyForm";
import classes from "./CommentItem.module.css";

import { useContext, useState, useEffect } from "react";
import SuggestionsContext from "../../store/suggestions-context";
import DummyData from "../../data.json";

function CommentItem(props) {
  const suggestionsCtx = useContext(SuggestionsContext);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyingToUser, setReplyingToUser] = useState("");

  function addReplyHandler(ReplyData) {
    suggestionsCtx.addReply(props.suggestionId, props.id, {
      content: ReplyData,
      replyingTo: replyingToUser,
      user: DummyData.currentUser,
    });
  }

  const replies = suggestionsCtx.suggestions
    .find((suggestion) => suggestion.id === props.suggestionId)
    .comments.find((comment) => comment.id === props.id);

  return (
    <li
      className={`${classes.commentCon} ${
        props.idx === 0 ? null : classes.commentBorder
      }`}
    >
      <CommentHeader
        id={props.id}
        user={props.user}
        setIsReplyOpen={setIsReplyOpen}
        isReplyOpen={isReplyOpen}
        setReplyingToUser={setReplyingToUser}
      />
      <p className={classes.commentContent}>{props.content}</p>
      {replies.replies ? (
        <RepliesList
          commentId={props.id}
          replies={replies.replies}
          isReplyOpen={isReplyOpen}
          setIsReplyOpen={setIsReplyOpen}
          setReplyingToUser={setReplyingToUser}
        />
      ) : null}
      <NewReplyForm
        style={{
          display: isReplyOpen ? "grid" : "none",
          marginLeft: replies.replies ? "2.4rem" : null,
        }}
        onAddReply={addReplyHandler}
        setIsReplyOpen={setIsReplyOpen}
      />
    </li>
  );
}

export default CommentItem;
