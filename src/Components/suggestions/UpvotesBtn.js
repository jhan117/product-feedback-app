import { ReactComponent as IconArrowUp } from "../../assets/shared/icon-arrow-up.svg";
import { useContext } from "react";

import classes from "./UpvotesBtn.module.css";
import SuggestionsContext from "../../store/suggestions-context";

function UpvotesBtn(props) {
  const suggestionsCtx = useContext(SuggestionsContext);

  const idIsUpvote = suggestionsCtx.idIsUpvote(props.id);

  function toggleUpvoteStatusHandler(event) {
    event.preventDefault();
    if (idIsUpvote) {
      suggestionsCtx.removeUpvote(props.id, props.upvotes);
    } else {
      suggestionsCtx.addUpvote(props.id, props.upvotes);
    }
  }

  return (
    <button
      className={`${classes.upvoteBtn} ${
        props.isRoad ? classes.roadBtn : classes.sugBtn
      }`}
      onClick={toggleUpvoteStatusHandler}
      onMouseEnter={() => {
        props.setIsHover(true);
      }}
      onMouseLeave={() => {
        props.setIsHover(false);
      }}
      style={
        idIsUpvote
          ? {
              backgroundColor: "var(--blue)",
              color: "white",
            }
          : null
      }
    >
      <IconArrowUp className={idIsUpvote ? classes.isUpvoteIcon : null} />
      <p style={idIsUpvote ? { color: "white" } : null}>{props.upvotes}</p>
    </button>
  );
}

export default UpvotesBtn;
