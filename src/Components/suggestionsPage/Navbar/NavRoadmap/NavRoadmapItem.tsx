import StatusDeco from "../../../ui/StatusDeco";
import classes from "./NavRoadmapItem.module.css";

interface Props {
  name: string;
  length: number;
}

const NavRoadmapItem = (props: Props) => {
  return (
    <li className={classes.roadList}>
      <StatusDeco status={props.name} isNav={true} />
      <p className={classes.roadmapNum}>{props.length}</p>
    </li>
  );
};

export default NavRoadmapItem;
