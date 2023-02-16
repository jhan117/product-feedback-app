import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import useMediaQuery from "../../../hooks/useMediaQuery";
import useHeight from "../../../hooks/useHeight";

import classes from "./RepliesList.module.css";

import RepliesItem from "./RepliesItem";

interface Props {
  replies: Reply[];
  commentHeight: number;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  replyingToUserState: [string, Dispatch<SetStateAction<string>>];
}

const RepliesList = (props: Props) => {
  const lastIdx = props.replies.length - 1;
  const { commentHeight } = props;

  const repliesRef = useRef<HTMLUListElement>(null);
  const isTablet = useMediaQuery("tablet");
  const [lastReplyHeight, setLastReplyHeight] = useState(0);
  const [borderHeight, setBorderHeight] = useState(0);
  const [repliesHeight, setRepliesHeight] = useState(0);
  useHeight(repliesRef, setRepliesHeight!);

  useEffect(() => {
    const mobileHeight = repliesHeight - lastReplyHeight + 20;

    if (isTablet) {
      setBorderHeight(mobileHeight + commentHeight);
    } else {
      setBorderHeight(mobileHeight);
    }
  }, [isTablet, lastReplyHeight, commentHeight, repliesHeight]);

  return (
    <ul className={`replies ${classes.repliesUl}`} ref={repliesRef}>
      <div
        className={classes.leftBorder}
        style={{
          height: borderHeight / 10 + "rem",
          top: isTablet ? -(commentHeight / 10) + "rem" : 0,
        }}
      ></div>
      {props.replies.map((reply, idx) => (
        <RepliesItem
          key={idx}
          reply={reply}
          setLastReplyHeight={idx === lastIdx ? setLastReplyHeight : undefined}
          replyingToUserState={props.replyingToUserState}
          setIsFormOpen={props.setIsFormOpen}
        />
      ))}
    </ul>
  );
};

export default RepliesList;
