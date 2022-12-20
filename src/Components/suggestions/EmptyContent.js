import { ReactComponent as ImageEmpty } from "../../assets/suggestions/illustration-empty.svg";

import classes from "./EmptyContent.module.css";

import useMediaQuery from "../../utils/useMediaQuery";

import Card from "../ui/Card";
import FeedbackButton from "../ui/buttons/FeedbackButton";

function EmptyContent() {
  const isTablet = useMediaQuery("tablet");

  const emptyStyle = {
    padding: isTablet ? "11rem 0" : "7.6rem 2.45rem",
    margin: isTablet ? null : "3.2rem 2.4rem 4.7rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  };

  return (
    <Card style={emptyStyle}>
      <ImageEmpty
        width={isTablet ? "128" : "102"}
        height={isTablet ? "135" : "108"}
        viewBox={isTablet ? "0 0 102 108" : null}
      />
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
