import { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import ErrorNotification from "../components/ui/Error";
import SugMain from "../components/suggestionsPage/SugMain";
import SugHeader from "../components/suggestionsPage/SugHeader";

import changeRootStyle from "../utils/changeRootStyle";
import { suggestionsActions } from "../store/suggestions-slice";

const SuggestionsPage = () => {
  const error = useAppSelector((state) => state.suggestions.error);
  const [showAlert, setIsShowAlert] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    changeRootStyle("sug");
    dispatch(suggestionsActions.changeSug(""));
  }, []);

  const isShowAlert = showAlert && error;

  const alertHandler = () => {
    setIsShowAlert((state) => !state);
  };

  return (
    <Fragment>
      <SugHeader />
      <SugMain />
      {isShowAlert && (
        <ErrorNotification message={error} onClickCancelBtn={alertHandler} />
      )}
    </Fragment>
  );
};

export default SuggestionsPage;
