import { Fragment, ReactNode } from "react";

import CommentHeader from "./CommentHeader";
import classes from "./Comment.module.css";

interface Props {
  children: ReactNode;
  user: User;
  replyingTo?: string;
  onClickBtn: () => void;
}

const Comment = (props: Props) => {
  return (
    <Fragment>
      <CommentHeader user={props.user} onClickBtn={props.onClickBtn} />
      <p className={classes.content}>
        {props.replyingTo && <span>@{props.replyingTo} </span>}
        {props.children}
      </p>
    </Fragment>
  );
};

export default Comment;
