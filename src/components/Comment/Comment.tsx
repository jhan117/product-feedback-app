import { Dispatch, Fragment, ReactNode, SetStateAction, useRef } from "react";
import useHeight from "../../hooks/useHeight";

import CommentHeader from "./CommentHeader";
import classes from "./Comment.module.css";

interface Props {
  children: ReactNode;
  user: User;
  replyingTo?: string;
  setCommentHeight?: Dispatch<SetStateAction<number>>;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  replyingToUserState: [string, Dispatch<SetStateAction<string>>];
}

const Comment = (props: Props) => {
  const { setCommentHeight } = props;

  const commentContentRef = useRef<HTMLParagraphElement>(null);
  useHeight(commentContentRef, setCommentHeight!, 32);

  return (
    <Fragment>
      <CommentHeader
        user={props.user}
        setIsFormOpen={props.setIsFormOpen}
        replyingToUserState={props.replyingToUserState}
      />
      <p className={classes.content} ref={commentContentRef}>
        {props.replyingTo && <span>@{props.replyingTo} </span>}
        {props.children}
      </p>
    </Fragment>
  );
};

export default Comment;
