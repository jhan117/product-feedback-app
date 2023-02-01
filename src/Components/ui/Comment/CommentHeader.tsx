import { Dispatch, useEffect, useState } from "react";
import images from "../../../assets/user-images";

import classes from "./CommentHeader.module.css";

interface Props {
  user: User;
  setIsFormOpen: Dispatch<boolean>;
  replyingToUserState: [string, Dispatch<string>];
}

const CommentHeader = (props: Props) => {
  const [replyingToUser, setReplyingToUser] = props.replyingToUserState;
  const { image, name, username } = props.user;
  const userImageName = image.slice(27, -4);

  const replyClickHandler = () => {
    if (replyingToUser === username) {
      props.setIsFormOpen(false);
      setReplyingToUser("");
    } else {
      props.setIsFormOpen(true);
      setReplyingToUser(username);
    }
  };

  return (
    <div className={classes.commentHCon}>
      <div className={classes.userCon}>
        <img
          className={classes.userIcon}
          src={images[userImageName]}
          alt={name}
        />
        <div className={classes.userTxt}>
          <h4>{name}</h4>
          <p>@{username}</p>
        </div>
      </div>
      <button className={classes.replyBtn} onClick={replyClickHandler}>
        Reply
      </button>
    </div>
  );
};

export default CommentHeader;
