import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";

import DetailHeader from "../components/detailPage/DetailHeader";
import DetailMain from "../components/detailPage/DetailMain";
import DetailFooter from "../components/detailPage/DetailFooter";

import changeRootStyle from "../utils/changeRootStyle";
import { selectActions } from "../store/select-slice";

const DetailFeedbackPage = () => {
  const { requestId: id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    changeRootStyle("detail");
    dispatch(selectActions.changeSug(id));
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <DetailHeader id={id!} />
      <DetailMain id={id!} />
      {/* <DetailFooter /> */}
    </Fragment>
  );
};

export default DetailFeedbackPage;
