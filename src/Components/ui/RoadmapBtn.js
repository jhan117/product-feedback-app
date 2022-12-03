import { useContext } from "react";

import classes from "./RoadmapBtn.module.css";

import SuggestionsContext from "../../store/suggestions-context";
import StatusContext from "../../store/status-context";

function RoadmapBtn(props) {
  const suggestionsCtx = useContext(SuggestionsContext);
  const statusCtx = useContext(StatusContext);

  let borderColor = {};

  if (props.curStatus === props.status) {
    switch (props.status) {
      case "planned":
        borderColor = { borderBottom: "0.35rem solid var(--scarlet)" };
        break;
      case "in-progress":
        borderColor = { borderBottom: "0.35rem solid var(--purple)" };
        break;
      case "live":
        borderColor = { borderBottom: "0.35rem solid var(--light-blue)" };
        break;

      default:
        break;
    }
  }

  function navClickHandler() {
    props.setCurStatus(props.status);
  }

  return (
    <button
      className={`${classes.roadmapBtn} ${
        props.curStatus === props.status ? classes.btnClicked : null
      }`}
      style={borderColor}
      onClick={navClickHandler}
    >
      {statusCtx.changeStatusName(props.status)} (
      {statusCtx.statusSuggestionsLength(
        props.status,
        suggestionsCtx.suggestions
      )}
      )
    </button>
  );
}

export default RoadmapBtn;
