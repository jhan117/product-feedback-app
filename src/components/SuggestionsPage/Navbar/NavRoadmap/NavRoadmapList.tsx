import { useAppSelector } from "../../../../store/hooks";

import NavRoadmapItem from "./NavRoadmapItem";
import classes from "./NavRoadmapList.module.css";

import { selectSugsByStatusAll } from "../../../../store/suggestions-slice";

const NavRoadmapList = () => {
  const statusItems = useAppSelector(selectSugsByStatusAll);

  return (
    <ul className={classes.roadList}>
      {statusItems.map((item) => (
        <NavRoadmapItem key={item.id} name={item.name} length={item.length} />
      ))}
    </ul>
  );
};

export default NavRoadmapList;
