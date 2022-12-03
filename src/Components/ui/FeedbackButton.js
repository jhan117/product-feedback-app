import classes from "./FeedbackButton.module.css";
import { Link } from "react-router-dom";

function Button() {
  return (
    <button className={classes.feedbackBtn}>
      <Link className={classes.feedbackBtnText} to="/add">
        + Add Feedback
      </Link>
    </button>
  );
}

export default Button;
