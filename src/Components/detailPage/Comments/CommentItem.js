import { useContext, useEffect, useRef, useState } from "react";

import classes from "./CommentItem.module.css";
import SuggestionsContext from "../../../store/suggestions-context";

import RepliesList from "../../replies/RepliesList";
import CommentHeader from "./CommentHeader";
import NewReplyForm from "../../replies/NewReplyForm";
import useMediaQuery from "../../../hooks/useMediaQuery";

function CommentItem(props) {
  const suggestionsCtx = useContext(SuggestionsContext);
  const isTablet = useMediaQuery("tablet");
  const commentHeightRef = useRef(null);
  const [commentHeight, setCommentHeight] = useState(0);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyingToUser, setReplyingToUser] = useState("");

  useEffect(() => {
    setCommentHeight(commentHeightRef.current.clientHeight);
  }, [commentHeightRef]);

  function addReplyHandler(ReplyData) {
    suggestionsCtx.addReply(
      props.suggestionId,
      props.idx,
      props.replies?.length || 0,
      {
        content: ReplyData,
        replyingTo: replyingToUser,
        user: suggestionsCtx.user,
      }
    );
  }

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
      <p className={classes.commentContent} ref={commentHeightRef}>
        {props.content}
      </p>
      {props.replies ? (
        <RepliesList
          commentId={props.id}
          replies={props.replies}
          isReplyOpen={isReplyOpen}
          setIsReplyOpen={setIsReplyOpen}
          setReplyingToUser={setReplyingToUser}
          commentHeight={commentHeight}
        />
      ) : null}
      <NewReplyForm
        style={{
          display: isReplyOpen ? "flex" : "none",
          marginLeft: props.replies ? (isTablet ? "11.7rem" : "2.4rem") : null,
        }}
        onAddReply={addReplyHandler}
        setIsReplyOpen={setIsReplyOpen}
        setIsReplySubmit={props.setIsReplySubmit}
      />
    </li>
  );
}

export default CommentItem;
