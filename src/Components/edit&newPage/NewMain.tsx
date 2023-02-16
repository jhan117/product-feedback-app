import FeedbackCard from "../FeedbackForm/FeedbackCard";
import classes from "./NewMain.module.css";

const NewMain = () => {
  return (
    <main className={classes.newMain}>
      <FeedbackCard page="new">Create new Feedback</FeedbackCard>
    </main>
  );
};

export default NewMain;
