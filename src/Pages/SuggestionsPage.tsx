import { Fragment, useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";

import ErrorNotification from "../components/ui/Error";
import SugMain from "../components/suggestionsPage/SugMain";
import SugHeader from "../components/suggestionsPage/SugHeader";

import changeRootStyle from "../utils/changeRootStyle";

const SuggestionsPage = () => {
  const isDataError = useAppSelector((state) => state.suggestions.isDataError);
  const isUpvoteError = useAppSelector(
    (state) => state.suggestions.isUpvoteError
  );
  const [showAlert, setIsShowAlert] = useState(true);

  useEffect(() => {
    changeRootStyle("sug");
  }, []);

  const isShowAlert = showAlert && (isDataError || isUpvoteError);

  const alertHandler = () => {
    setIsShowAlert((state) => !state);
  };

  return (
    <Fragment>
      <SugHeader />
      <SugMain />
      {isShowAlert && <ErrorNotification onClick={alertHandler} />}
    </Fragment>
  );
};

export default SuggestionsPage;
