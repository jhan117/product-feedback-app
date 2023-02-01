import { ReactComponent as IconSuggestions } from "../../assets/suggestions/icon-suggestions.svg";
import useMediaQuery from "../../hooks/useMediaQuery";

import Select from "../ui/Select/Select";
import FeedbackButton from "../ui/Button/FeedbackButton";
import classes from "./MainBar.module.css";

interface Props {
  length: number;
}

const MainBar = (props: Props) => {
  const isTablet = useMediaQuery("tablet");

  const sugsCnt = (
    <div className={classes.sugCnt}>
      <IconSuggestions />
      <p>{props.length} Suggestions</p>
    </div>
  );

  return (
    <div className={classes.mainBar}>
      <div className={classes.mainTxt}>
        {isTablet && sugsCnt}
        <Select state="sort" length={props.length} />
      </div>
      <FeedbackButton />
    </div>
  );
};

export default MainBar;
