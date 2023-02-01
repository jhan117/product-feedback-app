import React, { useEffect, useState } from "react";

import classes from "./NewReplyForm.module.css";

interface Props {
  className: string;
  replyingToUser: string;
  onSubmit: () => void;
}

// commentForm과 유사하니 컴포넌트화
const NewReplyForm = (props: Props) => {
  const [replyContent, setReplyContent] = useState("");
  const [isValid, setIsValid] = useState(false);

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

    // side Effect 함수 추가
    console.log("to " + props.replyingToUser, "content " + replyContent);

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
