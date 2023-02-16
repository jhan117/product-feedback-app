import { useAppSelector } from "../../../store/hooks";
import { Dispatch, SetStateAction } from "react";

import RoadmapNavItem from "./RoadmapNavItem";
import classes from "./RoadmapNav.module.css";

import { selectSugsByStatusAll } from "../../../store/suggestions-slice";

const RoadmapNav = (props: {
  selectStatusState: [string, Dispatch<SetStateAction<string>>];
}) => {
  const sugs = useAppSelector((state) => state.suggestions.suggestionItems);
  const statusItems = selectSugsByStatusAll(sugs);
  const [selectStatus, setSelectStatus] = props.selectStatusState;

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
