import { useEffect } from "react";

import classes from "./NewFeedbackPage.module.css";

import FeedbackForm from "../Components/feedback/FeedbackForm";
import GoBack from "../Components/ui/GoBack";

function NewFeedbackPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.addBody}>
      <header>
        <GoBack />
      </header>
      <FeedbackForm pageName="add">Create new Feedback</FeedbackForm>
    </div>
  );
}

export default NewFeedbackPage;
