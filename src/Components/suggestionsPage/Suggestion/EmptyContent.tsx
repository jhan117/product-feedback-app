import { ReactComponent as ImageEmpty } from "../../../assets/suggestions/illustration-empty.svg";
import useMediaQuery from "../../../hooks/useMediaQuery";

import Card from "../../ui/Card";
import FeedbackButton from "../../ui/Button/FeedbackButton";
import classes from "./EmptyContent.module.css";

const EmptyContent = () => {
  const isTablet = useMediaQuery("tablet");

  return (
    <Card className={classes.card}>
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
};

export default EmptyContent;
