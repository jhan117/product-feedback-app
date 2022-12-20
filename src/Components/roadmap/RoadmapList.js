import { useContext } from "react";

import classes from "./RoadmapList.module.css";
import StatusContext from "../../store/status-context";

import RoadmapItem from "./RoadmapItem";

function RoadmapList(props) {
  const statusCtx = useContext(StatusContext);

  return (
    <ul className={classes.roadmapUl}>
      {props.statusList.map((curStatusDic) => {
        const curStatus = curStatusDic.name;
        const curSug = statusCtx.totalStatusSuggestions(
          curStatus.toLowerCase(),
          props.data
        );

        return (
          <RoadmapItem
            key={curStatusDic.id}
            title={curStatus}
            length={curSug.length}
            desc={props.getFunc(curStatus.toLowerCase())}
            status={curStatus.toLowerCase()}
            requests={curSug}
          />
        );
      })}
    </ul>
  );
}

export default RoadmapList;
