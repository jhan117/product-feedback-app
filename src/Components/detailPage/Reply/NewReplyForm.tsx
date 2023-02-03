import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import classes from "./NewReplyForm.module.css";

import { addReply } from "../../../store/suggestions-thunks";

interface Props {
  className: string;
  replyingToUser: string;
  commentId: number;
  onSubmit: () => void;
}

// commentForm과 유사하니 컴포넌트화
const NewReplyForm = (props: Props) => {
  const [replyContent, setReplyContent] = useState("");
  const [isValid, setIsValid] = useState(false);
  const dispatch = useAppDispatch();
  const { sugId, currentUser, curLastIds } = useAppSelector(
    (state) => state.suggestions
  );

  useEffect(() => {
    if (replyContent.trim() === "") {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [replyContent]);

  const valueChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReplyContent(event.target.value);
  };

  const submitReplyHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (replyContent.trim() === "") {
      return;
    }

    const { image, name, username } = currentUser;

    const reply = {
      id: curLastIds.reply + 1,
      user: { image, name, username },
      content: replyContent,
      replyingTo: props.replyingToUser,
    };

    dispatch(
      addReply({
        sugId: sugId,
        commentId: props.commentId,
        reply: reply,
      })
    );

    setReplyContent("");
    props.onSubmit();
  };

  return (
    <form
      className={`${classes.replyForm} ${props.className}`}
      onSubmit={submitReplyHandler}
    >
      <textarea
        name="replyContent"
        placeholder={"@" + props.replyingToUser}
        value={replyContent}
        onChange={valueChangeHandler}
        maxLength={250}
      />
      <button
        disabled={!isValid}
        className={classes.postReplyBtn}
        type="submit"
      >
        Post Reply
      </button>
    </form>
  );
};

export default NewReplyForm;
