import { ReactComponent as IconComments } from "../../assets/shared/icon-comments.svg";

import classes from "./SuggestionItem.module.css";

import catToUpper from "../../utils/catToUpper";

import StatusDeco from "../ui/StatusDeco";
import UpvotesBtn from "./UpvotesBtn";
import { Fragment } from "react";

function SuggestionItem(props) {
  let borderColor = {};
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
      {props.status ? (
        <Fragment>
          <div className={classes.liBorder} style={borderColor} />
          <StatusDeco status={props.status} />
        </Fragment>
      ) : null}
      <UpvotesBtn id={props.id} upvotes={props.upvotes} />
      <div className={classes.sugContent}>
        <div className={classes.sugText}>
          <h3>{props.title}</h3>
          <p>{props.description}</p>
        </div>
        <div className={classes.sugCatCon}>
          <p>{catToUpper(props.category)}</p>
        </div>
      </div>
      <div className={classes.commentContainer}>
        <IconComments />
        <p className={classes.commentNum}>{props.commentsCnt}</p>
      </div>
    </li>
  );
}

export default SuggestionItem;
