import { Fragment } from "react";

import GoBack from "../ui/GoBack";
import AddButton from "../ui/AddButton";
import RoadmapNav from "./RoadmapNav/RoadmapNav";
import classes from "./RoadmapHeader.module.css";

import useMediaQuery from "../../hooks/useMediaQuery";

const RoadmapHeader = () => {
  const isTablet = useMediaQuery("tablet");

  return (
    <Fragment>
      <header className={classes.roadmapHeader}>
        <div className={classes.headerLeftCon}>
          <GoBack isRoadmap={true} />
          <h1>Roadmap</h1>
        </div>
        <AddButton />
      </header>
      {!isTablet && <RoadmapNav />}
    </Fragment>
  );
};

export default RoadmapHeader;
