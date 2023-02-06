import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import DetailHeader from "../components/detailPage/DetailHeader";
import DetailMain from "../components/detailPage/DetailMain";
import DetailFooter from "../components/detailPage/DetailFooter";
import ErrorNotification from "../components/ui/Error";

import changeRootStyle from "../utils/changeRootStyle";
import { suggestionsActions } from "../store/suggestions-slice";

const DetailPage = () => {
  const { requestId: id } = useParams();
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.suggestions.error);
  const [showAlert, setIsShowAlert] = useState(true);

  const isShowAlert = showAlert && error;

  useEffect(() => {
    changeRootStyle("detail");
    dispatch(suggestionsActions.changeSug(id));
    window.scrollTo(0, 0);
  }, []);

  const alertHandler = () => {
    setIsShowAlert((state) => !state);
  };

  return (
    <Fragment>
      <DetailHeader id={id!} />
      <DetailMain id={id!} />
      <DetailFooter />
      {isShowAlert && (
        <ErrorNotification message={error} onClickCancelBtn={alertHandler} />
      )}
    </Fragment>
  );
};

export default DetailPage;
