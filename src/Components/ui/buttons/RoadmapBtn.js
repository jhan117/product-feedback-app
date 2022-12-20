import { useContext, useEffect, useState } from "react";

import classes from "./RoadmapBtn.module.css";

import request from "../../../utils/request";

import StatusContext from "../../../store/status-context";

function RoadmapBtn(props) {
  const statusCtx = useContext(StatusContext);
  const [loadedData, setLoadedData] = useState([]);

  useEffect(() => {
    request
      .get(
        "https://product-feedback-app-33a7d-default-rtdb.firebaseio.com/productRequests.json"
      )
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        const filteredData = data.filter(Boolean);
        setLoadedData(filteredData);
      })
      .catch((err) => console.log(err));
  }, [loadedData]);

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
      {statusCtx.statusSuggestionsLength(props.status, loadedData)})
    </button>
  );
}

export default RoadmapBtn;
