import { ReactComponent as IconNewFeedback } from "../../assets/shared/icon-new-feedback.svg";
import { ReactComponent as IconEditFeedback } from "../../assets/shared/icon-edit-feedback.svg";
import { ReactNode, Fragment } from "react";

import Card from "../ui/Card";
import FeedbackForm from "./FeedbackForm";
import classes from "./FeedbackCard.module.css";

interface Props {
  page: string;
  prevData: Suggestion;
  children: ReactNode;
}

const FeedbackCard = (props: Props) => {
  return (
    <Fragment>
      {props.page === "new" ? (
        <IconNewFeedback viewBox="0 0 56 56" className={classes.icon} />
      ) : (
        <IconEditFeedback viewBox="0 0 40 40" className={classes.icon} />
      )}
      <Card className={classes.card}>
        <h2>{props.children}</h2>
        <FeedbackForm page={props.page} prevData={props.prevData} />
      </Card>
    </Fragment>
  );
};

export default FeedbackCard;
