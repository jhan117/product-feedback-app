import { useAppSelector } from "../../../store/hooks";

import RoadmapItem from "./RoadmapItem";
import classes from "./RoadmapList.module.css";

import { selectSugsByStatusAll } from "../../../store/suggestions-slice";

const RoadmapList = () => {
  const { suggestionItems } = useAppSelector((state) => state.suggestions);
  const statusItems = selectSugsByStatusAll(suggestionItems);

  return (
    <ul className={classes.roadmapUl}>
      {statusItems.map((statusItem) => {
        return <RoadmapItem key={statusItem.id} statusItem={statusItem} />;
      })}
    </ul>
  );
};

export default RoadmapList;
