import { useAppSelector } from "../../store/hooks";

import Loader from "../UI/Loader";
import RoadmapItem from "./Roadmap/RoadmapItem";
import RoadmapList from "./Roadmap/RoadmapList";
import classes from "./RoadmapMain.module.css";

import useMediaQuery from "../../hooks/useMediaQuery";
import { selectSugsByStatus } from "../../store/suggestions-slice";

const RoadmapMain = ({ selectStatus }: { selectStatus: string }) => {
  const isLoading = useAppSelector((state) => state.suggestions.isLoading);
  const error = useAppSelector((state) => state.suggestions.error);
  const isTablet = useMediaQuery("tablet");
  const statusItem: StatusItem | undefined = useAppSelector((state) =>
    selectSugsByStatus(state, selectStatus)
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
