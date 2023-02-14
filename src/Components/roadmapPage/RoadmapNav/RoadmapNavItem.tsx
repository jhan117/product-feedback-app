import { Dispatch, SetStateAction } from "react";

import classes from "./RoadmapNavItem.module.css";

interface Props {
  items: StatusItem;
  setSelectStatus: Dispatch<SetStateAction<string>>;
  className: string;
}

const RoadmapNavItem = (props: Props) => {
  const { id, name, length } = props.items;

  const navClickHandler = () => {
    props.setSelectStatus(id);
  };

  return (
    <li
      className={`${classes.roadmapLi} ${props.className}`}
      onClick={navClickHandler}
    >
      {name} ({length})
    </li>
  );
};

export default RoadmapNavItem;
