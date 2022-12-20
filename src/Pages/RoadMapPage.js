import { Fragment, useContext, useState, useEffect } from "react";

import classes from "./RoadMapPage.module.css";
import StatusContext from "../store/status-context";
import SuggestionsContext from "../store/suggestions-context";

import useRootClass from "../utils/useRootClass";
import request from "../utils/request";
import useMediaQuery from "../utils/useMediaQuery";

import GoBack from "../Components/ui/GoBack";
import FeedbackButton from "../Components/ui/buttons/FeedbackButton";
import RoadmapNav from "../Components/layout/RoadmapNav";
import RoadmapItem from "../Components/roadmap/RoadmapItem";
import RoadmapList from "../Components/roadmap/RoadmapList";

function RoadMapPage() {
  useRootClass("road");
  const suggestionsCtx = useContext(SuggestionsContext);
  const statusCtx = useContext(StatusContext);
  const isTablet = useMediaQuery("tablet");
  const [curStatus, setCurStatus] = useState("in-progress");
  const [isLoading, setIsLoading] = useState(true);
  const [loadedData, setLoadedData] = useState([]);

  const statusList = statusCtx.status.slice(1);
  const currSuggestions = loadedData.filter(
    (suggestion) => suggestion.status === curStatus
  );

  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setInterval(() => {
      request
        .get(
          "https://product-feedback-app-33a7d-default-rtdb.firebaseio.com/productRequests.json"
        )
        .then((response) => {
          if (!response.ok) throw new Error(response.statusText);
          return response.json();
        })
        .then((data) => {
          if (data !== loadedData) {
            setLoadedData(data.filter(Boolean));
            setIsLoading(false);
            clearInterval(timeoutId);
          }
        })
        .catch((err) => console.log(err));
    }, 500);
  }, [suggestionsCtx.userUpvoteId]);

  function getContent(status) {
    switch (status) {
      case "planned":
        return <p>Ideas prioritized for research</p>;
      case "in-progress":
        // tablet과 desktop은 features가 없는데... 흠...!
        return <p>Features currently being developed</p>;
      case "live":
        return <p>Released features</p>;
      default:
        break;
    }
  }

  let mainContent = "";

  if (isLoading) {
    mainContent = "loading...";
  } else {
    mainContent = isTablet ? (
      <RoadmapList
        statusList={statusList}
        data={loadedData}
        getFunc={getContent}
      />
    ) : (
      <RoadmapItem
        title={statusCtx.changeStatusName(curStatus)}
        length={currSuggestions.length}
        desc={getContent(curStatus)}
        status={curStatus}
        requests={currSuggestions}
      />
    );
  }

  return (
    <Fragment>
      <header className={classes.roadmapHeader}>
        <div className={classes.headerLeftCon}>
          <GoBack color={{ color: "white" }} />
          <h1>Roadmap</h1>
        </div>
        <FeedbackButton />
      </header>
      {isTablet ? null : (
        <RoadmapNav curStatus={curStatus} setCurStatus={setCurStatus} />
      )}
      <main className={classes.main}>{mainContent}</main>
    </Fragment>
  );
}

export default RoadMapPage;
