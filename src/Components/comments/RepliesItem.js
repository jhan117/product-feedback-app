import { useEffect, useRef } from "react";

import CommentHeader from "../ui/CommentHeader";
import classes from "./RepliesItem.module.css";

function RepliesItem(props) {
  const replyHeightRef = useRef(null);

  useEffect(() => {
    props.setHeights((prevHeight) => {
      return prevHeight.concat(replyHeightRef.current.clientHeight);
    });
  }, []);

  return (
    <li ref={replyHeightRef} className={classes.replyCon}>
      <CommentHeader
        id={props.commentId}
        user={props.user}
        isReplyOpen={props.isReplyOpen}
        setIsReplyOpen={props.setIsReplyOpen}
        setReplyingToUser={props.setReplyingToUser}
      />
      <p className={classes.replyText}>
        <span>@{props.replyingTo} </span>
        {props.content}
      </p>
    </li>
  );
}

export default RepliesItem;
