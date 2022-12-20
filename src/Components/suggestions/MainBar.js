import { ReactComponent as IconSuggestions } from "../../assets/suggestions/icon-suggestions.svg";

import classes from "./MainBar.module.css";

import useMediaQuery from "../../utils/useMediaQuery";

import Select from "../ui/select/Select";
import FeedbackButton from "../ui/buttons/FeedbackButton";

function MainBar(props) {
  const isTablet = useMediaQuery("tablet");

  const sugContent = (
    <div className={classes.sugCnt}>
      <IconSuggestions />
      <p>{props.num} Suggestions</p>
    </div>
  );

  return (
    <div className={classes.mainBar}>
      <div className={classes.mainTxt}>
        {isTablet ? sugContent : null}
        <Select state="sort" num={props.num} />
      </div>
      <FeedbackButton />
    </div>
  );
}

export default MainBar;
