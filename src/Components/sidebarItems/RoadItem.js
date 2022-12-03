import { useContext } from "react";

import classes from "./RoadItem.module.css";
import StatusContext from "../../store/status-context";
import SuggestionsContext from "../../store/suggestions-context";

import StatusDeco from "../ui/StatusDeco";

function RoadItem(props) {
  const statusCtx = useContext(StatusContext);
  const suggestionsCtx = useContext(SuggestionsContext);

  return (
    <li className={classes.roadList}>
      <StatusDeco status={props.name} side={true} />
      <p className={classes.roadmapNum}>
        {statusCtx.statusSuggestionsLength(
          props.name,
          suggestionsCtx.suggestions
        )}
      </p>
    </li>
  );
}

export default RoadItem;
