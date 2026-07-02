import { useAppSelector } from "../../../store/hooks";
import { Dispatch, SetStateAction } from "react";

import RoadmapNavItem from "./RoadmapNavItem";
import classes from "./RoadmapNav.module.css";

import { selectSugsByStatusAll } from "../../../store/suggestions-slice";

const RoadmapNav = (props: {
  selectStatus: string;
  setSelectStatus: Dispatch<SetStateAction<string>>;
}) => {
  const statusItems = useAppSelector(selectSugsByStatusAll);
  const { selectStatus, setSelectStatus } = props;

  return (
    <nav className={classes.roadmapNav}>
      {statusItems.map((items) => {
        const lowerName = items.name.toLowerCase();
        return (
          <RoadmapNavItem
            key={items.id}
            items={items}
            setSelectStatus={setSelectStatus}
            className={
              items.id === selectStatus
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
