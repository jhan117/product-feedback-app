import { Dispatch, Fragment, SetStateAction } from "react";

import GoBack from "../UI/GoBack";
import AddButton from "../UI/AddButton";
import RoadmapNav from "./RoadmapNav/RoadmapNav";
import classes from "./RoadmapHeader.module.css";

import useMediaQuery from "../../hooks/useMediaQuery";

const RoadmapHeader = ({
  selectStatus,
  setSelectStatus,
}: {
  selectStatus: string;
  setSelectStatus: Dispatch<SetStateAction<string>>;
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
      {!isTablet && <RoadmapNav selectStatus={selectStatus} setSelectStatus={setSelectStatus} />}
    </Fragment>
  );
};

export default RoadmapHeader;
