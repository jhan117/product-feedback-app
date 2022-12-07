import classes from "./RoadmapList.module.css";

import RoadmapItem from "./RoadmapItem";

function RoadmapList(props) {
  // nav랑 중복 상수
  const itemList = ["planned", "in-progress", "live"];

  return (
    <ul className={classes.roadList}>
      {itemList.map((road, idx) => (
        <RoadmapItem key={idx} name={road} />
      ))}
    </ul>
  );
}

export default RoadmapList;
