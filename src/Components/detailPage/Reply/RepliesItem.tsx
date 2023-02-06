import { Dispatch, SetStateAction, useRef } from "react";
import useHeight from "../../../hooks/useHeight";

import Comment from "../../Comment/Comment";
import classes from "./RepliesItem.module.css";

interface Props {
  reply: Reply;
  setLastReplyHeight?: Dispatch<SetStateAction<number>>;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  replyingToUserState: [string, Dispatch<SetStateAction<string>>];
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
