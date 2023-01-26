import { ReactComponent as IconArrowUp } from "../../../assets/shared/icon-arrow-up.svg";
import React, { useState } from "react";

import classes from "./UpvotesBtn.module.css";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { updateUpvoteData } from "../../../store/suggestions-thunks";

interface Props {
  sugId: number;
  upvotes: number;
  isRoadmap?: boolean;
  setIsHover: (value: boolean) => void;
}

const UpvotesBtn = (props: Props) => {
  const sugId = props.sugId - 1;

  const upvoteItems = useAppSelector((state) => state.suggestions.upvoteItems);
  const dispatch = useAppDispatch();
  const [isUpvoted, setIsUpvoted] = useState<boolean>(
    upvoteItems.includes(sugId)
  );

  const toggleUpvoteStatusHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setIsUpvoted((state) => !state);
    dispatch(
      updateUpvoteData({
        sugId,
        upvotes: props.upvotes,
        isUpvoted: isUpvoted,
      })
    );
  };

  const btnClass = `${classes.upvoteBtn} ${
    props.isRoadmap ? classes.roadmapBtn : classes.sugBtn
  } ${isUpvoted ? classes.isUpvoted : ""}`;

  return (
    <button
      className={btnClass}
      onClick={toggleUpvoteStatusHandler}
      onMouseEnter={() => {
        props.setIsHover(true);
      }}
      onMouseLeave={() => {
        props.setIsHover(false);
      }}
    >
      <IconArrowUp className={isUpvoted ? classes.isUpvoteIcon : ""} />
      <p>{props.upvotes}</p>
    </button>
  );
};

export default UpvotesBtn;