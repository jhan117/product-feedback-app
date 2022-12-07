import { ReactComponent as IconComments } from "../../assets/shared/icon-comments.svg";
import { ReactComponent as IconArrowUp } from "../../assets/shared/icon-arrow-up.svg";
import { useContext } from "react";

import classes from "./SuggestionItem.module.css";
import SuggestionsContext from "../../store/suggestions-context";
import MediaContext from "../../store/media-context";

import Card from "../ui/Card";
import StatusDeco from "../ui/StatusDeco";

function SuggestionItem(props) {
  const suggestionsCtx = useContext(SuggestionsContext);
  const mediaCtx = useContext(MediaContext);

  const idIsUpvote = suggestionsCtx.idIsUpvote(props.id);

  const commentsCount = suggestionsCtx.totalComments.find(
    (comment) => comment.id === props.id
  ).AllCommentsCount;

  let sugCardStyle = {};

  if (mediaCtx.isTablet) {
    sugCardStyle = {
      display: "grid",
      gridTemplate: "repeat(2, auto) / repeat(3, minmax(5rem, auto))",
      rowGap: "1.2rem",
      padding: "2.8rem 3.2rem",
    };
  } else {
    sugCardStyle = {
      padding: "2.4rem",
      display: "flex",
      flexDirection: "column",
    };
  }

  function toggleUpvoteStatusHandler(event) {
    event.preventDefault();
    if (idIsUpvote) {
      suggestionsCtx.removeUpvote(props.id);
    } else {
      suggestionsCtx.addUpvote(props.id);
    }
  }

  let borderColor = {};

  // 색상만 넘겨주는 것도 좋을 것 같으니 생각해보기
  switch (props.status) {
    case "planned":
      borderColor = { backgroundColor: "var(--scarlet)" };
      break;
    case "in-progress":
      borderColor = { backgroundColor: "var(--purple)" };
      break;
    case "live":
      borderColor = { backgroundColor: "var(--light-blue)" };
      break;

    default:
      break;
  }

  return (
    <li className={props.status ? classes.statusLi : classes.sugLi}>
      <Card style={sugCardStyle}>
        {props.status ? (
          <div className={classes.liBorder} style={borderColor} />
        ) : null}
        {props.status ? <StatusDeco status={props.status} /> : null}
        <div className={classes.sugText}>
          <h3 className={classes.suggestionH3}>{props.title}</h3>
          <p className={classes.suggestionDesc}>{props.description}</p>
        </div>
        <div className={classes.suggestionCat}>
          <p>
            {props.category.length === 2
              ? props.category.toUpperCase()
              : props.category.charAt(0).toUpperCase() +
                props.category.slice(1)}
          </p>
        </div>
        <div className={classes.suggestionFooter}>
          <button
            className={classes.upvoteBtn}
            onClick={toggleUpvoteStatusHandler}
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
            <span
              className={classes.upvoteNum}
              style={
                idIsUpvote
                  ? {
                      color: "white",
                    }
                  : null
              }
            >
              {props.upvotes}
            </span>
          </button>
          <div className={classes.commentContainer}>
            <IconComments />
            <p className={classes.commentNum}>{commentsCount}</p>
          </div>
        </div>
      </Card>
    </li>
  );
}

export default SuggestionItem;
