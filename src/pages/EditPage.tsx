import { Fragment, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import GoBack from "../components/UI/GoBack";
import EditMain from "../components/EditAndNewPage/EditMain";
import ErrorNotification from "../components/UI/Error";

import changeRootStyle from "../utils/changeRootStyle";
import { suggestionsActions } from "../store/suggestions-slice";

const EditPage = (props: PageProps) => {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const { sugId, error, fulfilled } = useAppSelector(
    (state) => state.suggestions
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (sugId === "") {
      return navigate(`/feedbacks/${requestId}`, { replace: true });
    }
    changeRootStyle("edit");
    window.scrollTo(0, 0);
  }, [navigate, requestId, sugId]);

  useEffect(() => {
    if (fulfilled === "delete") {
      navigate("/", { replace: true });
      dispatch(suggestionsActions.changeFulfilled());
    }
    if (fulfilled === "edit") {
      navigate(`/feedbacks/${requestId}`, { replace: true });
      dispatch(suggestionsActions.changeFulfilled());
    }
  }, [fulfilled, requestId, navigate, dispatch]);

  return (
    <Fragment>
      <header>
        <GoBack />
      </header>
      <EditMain />
      {props.showError && (
        <ErrorNotification message={error!} onClickCancelBtn={props.handler} />
      )}
    </Fragment>
  );
};

export default EditPage;
