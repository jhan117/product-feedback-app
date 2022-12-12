import { ReactComponent as ImageEmpty } from "../../assets/suggestions/illustration-empty.svg";

import classes from "./EmptyContent.module.css";

import Card from "../ui/Card";
import FeedbackButton from "../ui/FeedbackButton";

function EmptyContent() {
  const emptyStyle = {
    padding: "7.6rem 2.45rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  };

  return (
    <Card style={emptyStyle}>
      <ImageEmpty className={classes.iconEmpty} />
      <div className={classes.emptyText}>
        <h1>There is no feedback yet.</h1>
        <p>
          Got a suggestion? Found a bug that needs to be squashed? We love
          hearing about new ideas to improve our app.
        </p>
      </div>
      <FeedbackButton />
    </Card>
  );
}

export default EmptyContent;
