import { useRef } from "react";

import classes from "./NewReplyForm.module.css";

import useMediaQuery from "../../utils/useMediaQuery";

import PostButton from "../ui/buttons/PostButton";

function NewReplyForm(props) {
  const contentInputRef = useRef();
  const isTablet = useMediaQuery("tablet");

  function submitReplyHandler(event) {
    props.setIsReplySubmit(true);
    event.preventDefault();

    const enteredContent = contentInputRef.current.value;
    props.onAddReply(enteredContent);

    event.target.querySelector("textarea").value = "";
    props.setIsReplyOpen(false);
  }

  return (
    <form
      style={props.style}
      onSubmit={submitReplyHandler}
      className={classes.replyForm}
    >
      <textarea
        type="text"
        required
        placeholder="Type your reply here"
        ref={contentInputRef}
        maxLength={250}
      />
      <PostButton width={isTablet ? "11.7rem" : "9.7rem"}>
        Post Reply
      </PostButton>
    </form>
  );
}

export default NewReplyForm;
