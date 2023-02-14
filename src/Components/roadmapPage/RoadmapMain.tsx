import { useAppSelector } from "../../store/hooks";

import Loader from "../ui/Loader";
import RoadmapItem from "./Roadmap/RoadmapItem";
import RoadmapList from "./Roadmap/RoadmapList";
import classes from "./RoadmapMain.module.css";

import useMediaQuery from "../../hooks/useMediaQuery";
import { selectStatusSugs } from "../../store/suggestions-slice";

const RoadmapMain = ({ selectStatus }: { selectStatus: string }) => {
  const { isLoading, statusItems, error } = useAppSelector(
    (state) => state.suggestions
  );
  const isTablet = useMediaQuery("tablet");
  const statusItem: StatusItem | undefined = selectStatusSugs(
    statusItems,
    selectStatus
  );

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (statusItem) {
    if (isTablet) {
      content = <RoadmapList />;
    } else {
      content = <RoadmapItem statusItem={statusItem} />;
    }
  }

  return (
    <main className={classes.main}>
      {error !== "Failed to get data" && content}
    </main>
  );
};

export default RoadmapMain;
