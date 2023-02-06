import { useAppSelector } from "../../store/hooks";

import Loader from "../ui/Loader";
import FeedbackCard from "../FeedbackForm/FeedbackCard";
import classes from "./EditMain.module.css";

import { selectSugById } from "../../store/suggestions-slice";

const EditMain = () => {
  const sugState = useAppSelector((state) => state.suggestions);
  const suggestion: Suggestion = selectSugById(sugState)!;

  let content;
  if (sugState.isLoading || !suggestion) {
    content = <Loader />;
  } else {
    const data = {
      title: suggestion.title,
      category: suggestion.category,
      status: suggestion.status,
      description: suggestion.description,
    };

    content = (
      <FeedbackCard page="edit" prevData={data}>
        Editing '{suggestion.title}'
      </FeedbackCard>
    );
  }

  return <main className={classes.editMain}>{content}</main>;
};

export default EditMain;
