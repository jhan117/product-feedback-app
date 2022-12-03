import { Fragment, useContext, useState } from "react";

import classes from "./RoadMapPage.module.css";
import SuggestionsContext from "../store/suggestions-context";
import StatusContext from "../store/status-context";

import GoBack from "../Components/ui/GoBack";
import FeedbackButton from "../Components/ui/FeedbackButton";
import SuggestionList from "../Components/suggestions/SuggestionList";
import RoadmapNav from "../Components/layout/RoadmapNav";

function RoadMapPage() {
  const [curStatus, setCurStatus] = useState("in-progress");
  const suggestionsCtx = useContext(SuggestionsContext);
  const statusCtx = useContext(StatusContext);

  const currSuggestions = suggestionsCtx.suggestions.filter(
    (suggestion) => suggestion.status === curStatus
  );

  let headingContent = "";

  switch (curStatus) {
    case "planned":
      headingContent = <p>Ideas prioritized for research</p>;
      break;
    case "in-progress":
      // tablet과 desktop은 features가 없는데... 흠...!
      headingContent = <p>Features currently being developed</p>;
      break;
    case "live":
      headingContent = <p>Released features</p>;
      break;
    default:
      break;
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
      <RoadmapNav curStatus={curStatus} setCurStatus={setCurStatus} />
      <div className={classes.main}>
        <div className={classes.mainHeading}>
          <h2>
            {statusCtx.changeStatusName(curStatus)} (
            {statusCtx.statusSuggestionsLength(
              curStatus,
              suggestionsCtx.suggestions
            )}
            )
          </h2>
          {headingContent}
        </div>
        <SuggestionList status={curStatus} requests={currSuggestions} />
      </div>
    </Fragment>
  );
}

export default RoadMapPage;
