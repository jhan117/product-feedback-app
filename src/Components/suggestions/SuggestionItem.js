import { ReactComponent as IconComments } from "../../assets/shared/icon-comments.svg";
import { Fragment, useState } from "react";

import classes from "./SuggestionItem.module.css";

import catToUpper from "../../utils/catToUpper";

import StatusDeco from "../ui/StatusDeco";
import UpvotesBtn from "./UpvotesBtn";

function SuggestionItem(props) {
  const [isHover, setIsHover] = useState(false);

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
    <li
      className={`${classes.commonLi} ${
        props.status ? classes.statusLi : classes.sugLi
      }`}
    >
      {props.status ? (
        <Fragment>
          <div className={classes.liBorder} style={borderColor} />
          <StatusDeco status={props.status} />
        </Fragment>
      ) : null}
      <UpvotesBtn
        id={props.id}
        upvotes={props.upvotes}
        isRoad={props.status ? true : false}
        setIsHover={setIsHover}
      />
      <div
        className={`${classes.commonContent} ${
          props.status ? classes.statusContent : classes.sugContent
        }`}
      >
        <div
          className={`${classes.commonText} ${
            props.status ? classes.statusText : classes.sugText
          }`}
        >
          <h3 className={isHover ? null : classes.haveTitle}>{props.title}</h3>
          <p>{props.description}</p>
        </div>
        <div className={classes.sugCatCon}>
          <p>{catToUpper(props.category)}</p>
        </div>
      </div>
      <div
        className={`${classes.commentContainer} ${
          props.status ? classes.statusComCon : null
        }`}
      >
        <IconComments />
        <p className={classes.commentNum}>{props.commentsCnt}</p>
      </div>
    </li>
  );
}

export default SuggestionItem;
