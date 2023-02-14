import { useAppSelector } from "../../../store/hooks";

import RoadmapItem from "./RoadmapItem";
import classes from "./RoadmapList.module.css";

const RoadmapList = () => {
  const { statusItems } = useAppSelector((state) => state.suggestions);

  return (
    <ul className={classes.roadmapUl}>
      {statusItems.map((statusItem) => {
        return <RoadmapItem key={statusItem.id} statusItem={statusItem} />;
      })}
    </ul>
  );
};

export default RoadmapList;
