import { Fragment, useEffect } from "react";

import classes from "./NewFeedbackPage.module.css";

import useRootClass from "../utils/changeRootStyle";

import FeedbackForm from "../components/feedbackForm/FeedbackForm";
import GoBack from "../components/ui/GoBack";

function NewFeedbackPage(props) {
  useRootClass("new");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <header>
        <GoBack />
      </header>
      <main className={classes.newMain}>
        <FeedbackForm
          pageName="add"
          isSubmit={props.isSubmit}
          setIsSubmit={props.setIsSubmit}
        >
          Create new Feedback
        </FeedbackForm>
      </main>
    </Fragment>
  );
}

export default NewFeedbackPage;
