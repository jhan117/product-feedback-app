import { useRef } from "react";

import classes from "./NewReplyForm.module.css";
import PostButton from "../ui/PostButton";

function NewReplyForm(props) {
  const contentInputRef = useRef();

  function submitReplyHandler(event) {
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
      <PostButton width="9.7rem">Post Reply</PostButton>
    </form>
  );
}

export default NewReplyForm;
