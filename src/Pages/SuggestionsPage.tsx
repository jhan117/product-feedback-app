import { Fragment, useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";

import ErrorNotification from "../components/ui/Error";
import SugMain from "../components/suggestionsPage/SugMain";
import SugHeader from "../components/suggestionsPage/SugHeader";

import changeRootStyle from "../utils/changeRootStyle";

const SuggestionsPage = () => {
  const { data: isDataError, upvote: isUpvoteError } = useAppSelector(
    (state) => state.suggestions.error
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
      {isShowAlert && <ErrorNotification onClickCancelBtn={alertHandler} />}
    </Fragment>
  );
};

export default SuggestionsPage;
