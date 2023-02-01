import { Dispatch, useRef } from "react";
import useHeight from "../../../hooks/useHeight";

import Comment from "../../ui/Comment/Comment";
import classes from "./RepliesItem.module.css";

interface Props {
  reply: Reply;
  setLastReplyHeight?: Dispatch<number>;
  setIsFormOpen: Dispatch<boolean>;
  replyingToUserState: [string, Dispatch<string>];
}

const RepliesItem = (props: Props) => {
  const { setLastReplyHeight } = props;
  const { user, content, replyingTo } = props.reply;

  const replyHeightRef = useRef<HTMLLIElement>(null);
  useHeight(replyHeightRef, setLastReplyHeight!);

  return (
    <li ref={replyHeightRef} className={classes.replyCon}>
      <Comment
        user={user}
        replyingTo={replyingTo}
        replyingToUserState={props.replyingToUserState}
        setIsFormOpen={props.setIsFormOpen}
      >
        {content}
      </Comment>
    </li>
  );
};

export default RepliesItem;
