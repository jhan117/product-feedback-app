import { useRef, useState } from "react";

import Card from "../ui/Card";
import PostButton from "../ui/PostButton";
import classes from "./NewCommentForm.module.css";

function NewCommentForm(props) {
  const contentInputRef = useRef();
  const [textLength, setTextLength] = useState(250);

  function submitCommentHandler(event) {
    event.preventDefault();
    const enteredContent = contentInputRef.current.value;
    props.onAddComment(enteredContent);
    event.target.querySelector("textarea").value = "";
    setTextLength(250);
  }

  return (
    <Card
      style={{
        padding: "2.4rem",
        display: "flex",
        flexDirection: "column",
        rowGap: "2.4rem",
      }}
    >
      <h4 className={classes.addCommentH4}>Add Comment</h4>
      <form className={classes.addCommentForm} onSubmit={submitCommentHandler}>
        <textarea
          type="text"
          required
          placeholder="Type your comment here"
          ref={contentInputRef}
          maxLength={250}
          onChange={(e) => setTextLength(250 - e.target.value.length)}
        />
        <div className={classes.addCommentFooter}>
          <p className={classes.leftCha}>{textLength} characters left</p>
          <PostButton width="11.9rem">Post Comment</PostButton>
        </div>
      </form>
    </Card>
  );
}

export default NewCommentForm;
