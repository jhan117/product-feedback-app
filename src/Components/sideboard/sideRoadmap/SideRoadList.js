import classes from "./SideRoadList.module.css";

import SideRoadItem from "./SideRoadItem";

function SideRoadList(props) {
  // nav랑 중복 상수
  const itemList = ["planned", "in-progress", "live"];

  return (
    <ul className={classes.roadList}>
      {itemList.map((road, idx) => (
        <SideRoadItem key={idx} name={road} />
      ))}
    </ul>
  );
}

export default SideRoadList;
