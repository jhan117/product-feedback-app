import { useAppSelector } from "../../store/hooks";

import Loader from "../UI/Loader";
import FeedbackCard from "../FeedbackForm/FeedbackCard";
import classes from "./EditMain.module.css";

import { selectSugById } from "../../store/suggestions-slice";

const EditMain = () => {
  const isLoading = useAppSelector((state) => state.suggestions.isLoading);
  const suggestion: Suggestion | undefined = useAppSelector(selectSugById);

  let content;
  if (isLoading || !suggestion) {
    content = <Loader />;
  } else {
    content = (
      <FeedbackCard page="edit" prevData={suggestion}>
        Editing '{suggestion.title}'
      </FeedbackCard>
    );
  }

  return <main className={classes.editMain}>{content}</main>;
};

export default EditMain;
