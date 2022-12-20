import { useContext, useEffect, useState } from "react";

import classes from "./SideRoadItem.module.css";
import StatusContext from "../../../store/status-context";

import request from "../../../utils/request";

import StatusDeco from "../../ui/StatusDeco";

function SideRoadItem(props) {
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

  return (
    <li className={classes.roadList}>
      <StatusDeco status={props.name} side={true} />
      <p className={classes.roadmapNum}>
        {statusCtx.statusSuggestionsLength(props.name, loadedData)}
      </p>
    </li>
  );
}

export default SideRoadItem;
