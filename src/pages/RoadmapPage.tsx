import { Fragment, useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";

import RoadmapHeader from "../components/RoadmapPage/RoadmapHeader";
import RoadmapMain from "../components/RoadmapPage/RoadmapMain";
import ErrorNotification from "../components/UI/Error";

import changeRootStyle from "../utils/changeRootStyle";

const RoadmapPage = (props: PageProps) => {
  const [selectStatus, setSelectStatus] = useState("st2");
  const { error } = useAppSelector((state) => state.suggestions);

  useEffect(() => {
    changeRootStyle("roadmap");
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <RoadmapHeader selectStatus={selectStatus} setSelectStatus={setSelectStatus} />
      <RoadmapMain selectStatus={selectStatus} />
      {props.showError && (
        <ErrorNotification message={error!} onClickCancelBtn={props.handler} />
      )}
    </Fragment>
  );
};

export default RoadmapPage;
