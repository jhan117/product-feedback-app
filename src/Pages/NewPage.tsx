import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import GoBack from "../components/ui/GoBack";
import NewMain from "../components/edit&newPage/NewMain";
import ErrorNotification from "../components/ui/Error";

import changeRootStyle from "../utils/changeRootStyle";
import { suggestionsActions } from "../store/suggestions-slice";

const NewPage = (props: PageProps) => {
  const navigate = useNavigate();
  const { error, fulfilled } = useAppSelector((state) => state.suggestions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    changeRootStyle("new");
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (fulfilled === "new") {
      navigate("/", { replace: true });
      dispatch(suggestionsActions.changeFulfilled());
    }
  }, [fulfilled, navigate, dispatch]);

  return (
    <Fragment>
      <header>
        <GoBack />
      </header>
      <NewMain />
      {props.showError && (
        <ErrorNotification message={error!} onClickCancelBtn={props.handler} />
      )}
    </Fragment>
  );
};

export default NewPage;
