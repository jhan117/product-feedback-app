import { useRef, useState } from "react";

import classes from "./NewCommentForm.module.css";

import useMediaQuery from "../../utils/useMediaQuery";
import Card from "../ui/Card";
import PostButton from "../ui/PostButton";

function NewCommentForm(props) {
  const contentInputRef = useRef();
  const [textLength, setTextLength] = useState(250);
  const isTablet = useMediaQuery("tablet");

  function submitCommentHandler(event) {
    event.preventDefault();
    const enteredContent = contentInputRef.current.value;
    props.onAddComment(enteredContent);
    event.target.querySelector("textarea").value = "";
    setTextLength(250);
  }

  let cardStyle = {};

  if (isTablet) {
    cardStyle = {
      padding: "2.4rem",
      display: "flex",
      flexDirection: "column",
      rowGap: "2.4rem",
      gridColumn: "1 / 13",
    };
  } else {
    cardStyle = {
      padding: "2.4rem",
      display: "flex",
      flexDirection: "column",
      rowGap: "2.4rem",
    };
  }

  return (
    <Card style={cardStyle}>
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
