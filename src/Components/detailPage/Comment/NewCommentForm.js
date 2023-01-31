import { useRef, useState } from "react";

import classes from "./NewCommentForm.module.css";

import useMediaQuery from "../../../hooks/useMediaQuery";

import Card from "../../ui/Card";
import PostButton from "../../ui/Button/PostButton";

function NewCommentForm(props) {
  const contentInputRef = useRef();
  const isTablet = useMediaQuery("tablet");
  const [textLength, setTextLength] = useState(250);

  let cardStyle = {
    padding: isTablet ? "2.4rem 3.2rem 3.2rem" : "2.4rem",
    display: "flex",
    flexDirection: "column",
    rowGap: "2.4rem",
  };

  function submitCommentHandler(event) {
    event.preventDefault();
    props.setIsCommentSubmit(true);

    const enteredContent = contentInputRef.current.value;
    props.onAddComment(enteredContent);

    event.target.querySelector("textarea").value = "";
    setTextLength(250);
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
          <PostButton width={isTablet ? "14.2rem" : "11.9rem"}>
            Post Comment
          </PostButton>
        </div>
      </form>
    </Card>
  );
}

export default NewCommentForm;
