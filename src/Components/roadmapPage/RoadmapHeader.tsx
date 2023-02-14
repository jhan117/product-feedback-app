import { Dispatch, Fragment, SetStateAction } from "react";

import GoBack from "../ui/GoBack";
import AddButton from "../ui/AddButton";
import RoadmapNav from "./RoadmapNav/RoadmapNav";
import classes from "./RoadmapHeader.module.css";

import useMediaQuery from "../../hooks/useMediaQuery";

const RoadmapHeader = ({
  selectStatusState,
}: {
  selectStatusState: [string, Dispatch<SetStateAction<string>>];
}) => {
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
      {!isTablet && <RoadmapNav selectStatusState={selectStatusState} />}
    </Fragment>
  );
};

export default RoadmapHeader;
