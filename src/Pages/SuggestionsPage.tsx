import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import ErrorNotification from "../components/ui/Error";
import SugMain from "../components/suggestionsPage/SugMain";
import SugHeader from "../components/suggestionsPage/SugHeader";

import changeRootStyle from "../utils/changeRootStyle";
import { suggestionsActions } from "../store/suggestions-slice";

const SuggestionsPage = (props: PageProps) => {
  const error = useAppSelector((state) => state.suggestions.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    changeRootStyle("sug");
    dispatch(suggestionsActions.changeSug(""));
  }, []);

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
