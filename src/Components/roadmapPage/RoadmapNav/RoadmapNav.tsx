import { useState } from "react";
import { useAppSelector } from "../../../store/hooks";

import RoadmapItem from "./RoadmapItem";
import classes from "./RoadmapNav.module.css";

const RoadmapNav = () => {
  const [selectStatus, setSelectStatus] = useState("planned");
  const { statusItems } = useAppSelector((state) => state.suggestions);

  return (
    <nav className={classes.roadmapNav}>
      {statusItems.map(({ id, name, length }) => {
        const lowerName = name.toLowerCase();
        return (
          <RoadmapItem
            key={id}
            name={name}
            length={length}
            setSelectStatus={setSelectStatus}
            className={
              lowerName === selectStatus
                ? `${classes[lowerName]} ${classes.btnClicked}`
                : ""
            }
          />
        );
      })}
    </nav>
  );
};

export default RoadmapNav;
