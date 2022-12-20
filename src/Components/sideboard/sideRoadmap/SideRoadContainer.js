import { Link } from "react-router-dom";

import classes from "./SideRoadContainer.module.css";

import useMediaQuery from "../../../utils/useMediaQuery";
import Card from "../../ui/Card";
import SideRoadList from "./SideRoadList";

function SideRoadContainer() {
  const isDesktop = useMediaQuery("desktop");

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: "2.2rem",
        padding: "2.1rem 2.4rem",
        height: isDesktop ? "17.8rem" : null,
      }}
    >
      <div className={classes.roadHeader}>
        <h2 className={classes.roadmapH2}>Roadmap</h2>
        <Link className={classes.roadViewLink} to="/roadmap">
          View
        </Link>
      </div>
      <SideRoadList />
    </Card>
  );
}

export default SideRoadContainer;
