import { ReactComponent as IconComments } from "../../../assets/shared/icon-comments.svg";
import { Fragment, useState } from "react";

import UpvotesBtn from "./UpvotesBtn";
import StatusDeco from "../../ui/StatusDeco";
import classes from "./SuggestionItem.module.css";

import { categoryToUpper } from "../../../utils/changeName";
import { getAllComments } from "../../../utils/getCnt";

interface Props {
  isRoadmap?: boolean;
  isDetail?: boolean;
  item: Suggestion;
}

const SuggestionItem = (props: Props) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const { id, category, description, status, title, upvotes, comments } =
    props.item;

  const liClass = `${classes.commonLi} ${
    props.isRoadmap ? classes.roadmapLi : classes.sugLi
  }`;
  const roadmapHeader = (
    <Fragment>
      <div className={classes.liBorder} />
      <StatusDeco status={status} />
    </Fragment>
  );

  return (
    <li className={liClass}>
      {props.isRoadmap && roadmapHeader}
      <UpvotesBtn
        sugId={id}
        upvotes={upvotes}
        isRoadmap={props.isRoadmap}
        setIsHover={setIsHover}
      />
      <div className={classes.content}>
        <div className={classes.text}>
          <h3 className={isHover || props.isDetail ? "" : classes.hoverTitle}>
            {title}
          </h3>
          <p>{description}</p>
        </div>
        <div className={classes.category}>
          <p>{categoryToUpper(category)}</p>
        </div>
      </div>
      <div className={classes.commentCon}>
        <IconComments />
        <p>{getAllComments(comments!)}</p>
      </div>
    </li>
  );
};

export default SuggestionItem;
