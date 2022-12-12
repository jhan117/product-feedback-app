import classes from "./MainBar.module.css";

import Select from "../ui/select/Select";
import FeedbackButton from "../ui/FeedbackButton";

function MainBar() {
  return (
    <div className={classes.mainBar}>
      <Select state="sort" />
      <FeedbackButton />
    </div>
  );
}

export default MainBar;
