import { Fragment, useEffect } from "react";

import SugHeader from "../components/suggestionsPage/SugHeader";
import SugMain from "../components/suggestionsPage/SugMain";

import changeRootStyle from "../utils/changeRootStyle";

const SuggestionsPage = () => {
  useEffect(() => {
    changeRootStyle("sug");
  }, []);

  return (
    <Fragment>
      <SugHeader />
      <SugMain />
    </Fragment>
  );
};

export default SuggestionsPage;
