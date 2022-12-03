import classes from "./MainBar.module.css";

import FeedbackButton from "../ui/FeedbackButton";
import Select from "../ui/select/Select";

function MainBar() {
  return (
    <section>
      <Select state="sort" />
      <FeedbackButton />
    </section>
  );
}

export default MainBar;
