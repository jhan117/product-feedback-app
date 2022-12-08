import { Link } from "react-router-dom";

import classes from "./RoadmapContainer.module.css";

import Card from "../../ui/Card";
import RoadmapList from "./RoadmapList";
import { useContext } from "react";
import MediaContext from "../../../store/media-context";

function RoadmapContainer() {
  const mediaCtx = useContext(MediaContext);

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: "2.2rem",
        padding: "2.1rem 2.4rem",
        height: mediaCtx.isDesktop ? "17.8rem" : null,
      }}
    >
      <div className={classes.roadHeader}>
        <h2 className={classes.roadmapH2}>Roadmap</h2>
        <Link className={classes.roadViewLink} to="/roadmap">
          View
        </Link>
      </div>
      <RoadmapList />
    </Card>
  );
}

export default RoadmapContainer;
