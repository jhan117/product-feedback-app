import { useEffect, useState, useRef } from "react";
import RepliesItem from "./RepliesItem";
import classes from "./RepliesList.module.css";

function RepliesList(props) {
  const lastIdx = props.replies.length - 1;
  const allReplyHeightRef = useRef(null);
  const [heights, setHeights] = useState([]);
  const [curHeight, setCurHeight] = useState(0);

  useEffect(() => {
    setCurHeight(
      (allReplyHeightRef.current.clientHeight - (heights.slice(-1) - 20)) / 10 +
        "rem"
    );
  }, [heights]);

  return (
    <ul ref={allReplyHeightRef} className={`replies ${classes.repliesUl}`}>
      <div className={classes.leftBorder} style={{ height: curHeight }}></div>
      {props.replies.map((reply, idx) => (
        <RepliesItem
          key={idx}
          idx={idx}
          lastIdx={lastIdx}
          commentId={props.commentId}
          content={reply.content}
          replyingTo={reply.replyingTo}
          user={reply.user}
          isReplyOpen={props.isReplyOpen}
          setIsReplyOpen={props.setIsReplyOpen}
          setReplyingToUser={props.setReplyingToUser}
          setHeights={setHeights}
        />
      ))}
    </ul>
  );
}

export default RepliesList;
