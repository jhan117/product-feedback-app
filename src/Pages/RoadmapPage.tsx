import { Fragment, useEffect } from "react";
import { useAppSelector } from "../store/hooks";

import RoadmapHeader from "../components/roadmapPage/RoadmapHeader";
import RoadmapMain from "../components/roadmapPage/RoadmapMain";
import ErrorNotification from "../components/ui/Error";

import changeRootStyle from "../utils/changeRootStyle";

const RoadmapPage = (props: PageProps) => {
  const { error } = useAppSelector((state) => state.suggestions);

  useEffect(() => {
    changeRootStyle("roadmap");
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <RoadmapHeader />
      {/* <RoadmapMain /> */}
      {props.showError && (
        <ErrorNotification message={error!} onClickCancelBtn={props.handler} />
      )}
    </Fragment>
  );
};

export default RoadmapPage;
