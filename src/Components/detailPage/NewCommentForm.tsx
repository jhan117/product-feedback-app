import React, { useEffect, useState, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import classes from "./NewCommentForm.module.css";

import { addComment, addReply } from "../../store/suggestions-thunks";

interface Props {
  className?: string;
  replyingToUser?: string;
  commentId?: number;
  isComment?: boolean;
  onSubmit?: () => void;
}

const PostBtn = (props: {
  children: ReactNode;
  isValid: boolean;
  className: string;
}) => {
  return (
    <button
      disabled={!props.isValid}
      className={`${classes.formBtn} ${props.className}`}
      type="submit"
    >
      {props.children}
    </button>
  );
};

const NewCommentForm = (props: Props) => {
  const [content, setContent] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [textLength, setTextLength] = useState(250);
  const { sugId, currentUser, curLastIds } = useAppSelector(
    (state) => state.suggestions
  );
  const dispatch = useAppDispatch();
  const { isComment } = props;

  useEffect(() => {
    if (content.trim() === "") {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [content]);

  const valueChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setContent(value);
    if (isComment) setTextLength(250 - value.length);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (content.trim() === "") {
      return;
    }

    const { image, name, username } = currentUser;
    const id = (isComment ? curLastIds.comment : curLastIds.reply) + 1;
    const user = { image, name, username };

    if (isComment) {
      dispatch(
        addComment({
          sugId,
          comment: { id, user, content },
        })
      );
      setTextLength(250);
    } else {
      dispatch(
        addReply({
          sugId,
          commentId: props.commentId!,
          reply: { id, user, content, replyingTo: props.replyingToUser! },
        })
      );
      props.onSubmit!();
    }

    setContent("");
  };

  const formFooter = isComment ? (
    <div className={classes.commentFooter}>
      <p>{textLength} characters left</p>
      <PostBtn className={classes.postCommentBtn} isValid={isValid}>
        Post Comment
      </PostBtn>
    </div>
  ) : (
    <PostBtn className={classes.postReplyBtn} isValid={isValid}>
      Post Reply
    </PostBtn>
  );

  const formClass = ` ${isComment ? classes.commentForm : classes.replyForm} ${
    props.className
  }`;
  const placeholder = isComment
    ? "Type your comment here"
    : "@" + props.replyingToUser;

  return (
    <form className={formClass} onSubmit={submitHandler}>
      <textarea
        name="content"
        placeholder={placeholder}
        value={content}
        onChange={valueChangeHandler}
        maxLength={isComment ? 250 : undefined}
      />
      {formFooter}
    </form>
  );
};

export default NewCommentForm;
