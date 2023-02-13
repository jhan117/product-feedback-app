import { Dispatch, SetStateAction } from "react";

import classes from "./RoadmapItem.module.css";

interface Props {
  name: string;
  length: number;
  setSelectStatus: Dispatch<SetStateAction<string>>;
  className: string;
}

const RoadmapItem = (props: Props) => {
  const { name } = props;

  const navClickHandler = () => {
    props.setSelectStatus(name.toLowerCase());
  };

  return (
    // hover 기능 추가
    <li
      className={`${classes.roadmapLi} ${props.className}`}
      onClick={navClickHandler}
    >
      {name} ({props.length})
    </li>
  );
};

export default RoadmapItem;
