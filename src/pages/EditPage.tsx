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
    if (fulfilled.startsWith("delete:")) {
      const status = fulfilled.split(":")[1];
      if (window.history.state && window.history.state.idx >= 2) {
        navigate(-2);
      } else {
        if (status === "suggestion") {
          navigate("/", { replace: true });
        } else {
          navigate("/roadmap", { replace: true });
        }
      }
      dispatch(suggestionsActions.changeFulfilled());
    }
    if (fulfilled === "edit") {
      navigate(-1);
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
