import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";

import DetailHeader from "../components/detailPage/DetailHeader";
import DetailMain from "../components/detailPage/DetailMain";
import DetailFooter from "../components/detailPage/DetailFooter";

import changeRootStyle from "../utils/changeRootStyle";

const DetailFeedbackPage = () => {
  const { requestId: id } = useParams();

  useEffect(() => {
    changeRootStyle("detail");
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <DetailHeader id={id!} />
      <DetailMain id={id!} />
      <DetailFooter />
    </Fragment>
  );
};

export default DetailFeedbackPage;
