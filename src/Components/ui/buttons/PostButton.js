import classes from "./PostButton.module.css";

function PostButton(props) {
  return (
    <button
      className={classes.postReplyBtn}
      type="submit"
      style={{ width: props.width }}
    >
      {props.children}
    </button>
  );
}

export default PostButton;
