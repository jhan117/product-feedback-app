import { useAppSelector } from "../../../../store/hooks";

import NavRoadmapItem from "./NavRoadmapItem";
import classes from "./NavRoadmapList.module.css";

const NavRoadmapList = () => {
  const statusItems = useAppSelector((state) => state.suggestions.statusItems);

  return (
    <ul className={classes.roadList}>
      {statusItems.map((item) => (
        <NavRoadmapItem key={item.id} name={item.name} length={item.length} />
      ))}
    </ul>
  );
};

export default NavRoadmapList;
