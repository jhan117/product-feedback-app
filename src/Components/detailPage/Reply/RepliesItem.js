import { useEffect, useRef } from "react";

import Comment from "../../ui/Comment/Comment";
import classes from "./RepliesItem.module.css";

function RepliesItem(props) {
  const replyHeightRef = useRef(null);

  useEffect(() => {
    props.setHeights((prevHeight) => {
      return prevHeight.concat(replyHeightRef.current.clientHeight);
    });
  }, [replyHeightRef]);

  return (
    <li ref={replyHeightRef} className={classes.replyCon}>
      <Comment user={props.user} replyingTo={props.replyingTo}>
        {props.content}
      </Comment>
    </li>
  );
}

export default RepliesItem;
