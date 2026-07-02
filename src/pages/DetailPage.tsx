import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import DetailHeader from "../components/DetailPage/DetailHeader";
import DetailMain from "../components/DetailPage/DetailMain";
import DetailFooter from "../components/DetailPage/DetailFooter";
import ErrorNotification from "../components/UI/Error";

import changeRootStyle from "../utils/changeRootStyle";
import { suggestionsActions } from "../store/suggestions-slice";

const DetailPage = (props: PageProps) => {
  const { requestId: id } = useParams();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.suggestions);

  useEffect(() => {
    changeRootStyle("detail");
    dispatch(suggestionsActions.changeSug(id));
  }, [id, dispatch]);

  return (
    <Fragment>
      <DetailHeader id={id!} />
      <DetailMain id={id!} />
      <DetailFooter />
      {props.showError && (
        <ErrorNotification message={error!} onClickCancelBtn={props.handler} />
      )}
    </Fragment>
  );
};

export default DetailPage;
