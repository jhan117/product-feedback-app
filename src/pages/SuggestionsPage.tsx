import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useLocation, useNavigate } from "react-router-dom";

import ErrorNotification from "../components/UI/Error";
import SugMain from "../components/SuggestionsPage/SugMain";
import SugHeader from "../components/SuggestionsPage/SugHeader";

import changeRootStyle from "../utils/changeRootStyle";
import { suggestionsActions } from "../store/suggestions-slice";

const SuggestionsPage = (props: PageProps) => {
  const error = useAppSelector((state) => state.suggestions.error);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    changeRootStyle("sug");
    dispatch(suggestionsActions.changeSug(""));
    navigate({
      pathname: location.pathname,
      search: "?sort=most_upvotes&category=all",
    });
  }, [dispatch, location.pathname, navigate]);

  return (
    <Fragment>
      <SugHeader />
      <SugMain />
      {props.showError && (
        <ErrorNotification message={error!} onClickCancelBtn={props.handler} />
      )}
    </Fragment>
  );
};

export default SuggestionsPage;
