import { useEffect, useState, useRef } from "react";

import classes from "./RepliesList.module.css";

import useMediaQuery from "../../hooks/useMediaQuery";

import RepliesItem from "./RepliesItem";

function RepliesList(props) {
  const lastIdx = props.replies.length - 1;
  const allReplyHeightRef = useRef(null);
  const isTablet = useMediaQuery("tablet");
  const [heights, setHeights] = useState([]);
  const [curHeight, setCurHeight] = useState(0);

  // tablet부터 32 + comment content
  useEffect(() => {
    const commonExpression =
      allReplyHeightRef.current.clientHeight - (heights.slice(-1) - 20);

    if (isTablet) {
      setCurHeight((commonExpression + props.commentHeight + 32) / 10 + "rem");
    } else {
      setCurHeight(commonExpression / 10 + "rem");
    }
  }, [heights, isTablet, props.commentHeight, allReplyHeightRef]);

  return (
    <ul ref={allReplyHeightRef} className={`replies ${classes.repliesUl}`}>
      <div
        className={classes.leftBorder}
        style={{
          height: curHeight,
          top: isTablet ? -((props.commentHeight + 32) / 10) + "rem" : 0,
        }}
      ></div>
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
