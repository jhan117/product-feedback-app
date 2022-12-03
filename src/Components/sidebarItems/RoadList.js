import classes from "./RoadList.module.css";
import RoadItem from "./RoadItem";

function RoadList(props) {
  return (
    <ul className={classes.roadList}>
      {props.roads.map((road, idx) => (
        <RoadItem key={idx} name={road} />
      ))}
    </ul>
  );
}

export default RoadList;
