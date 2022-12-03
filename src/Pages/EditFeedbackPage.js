import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";

import classes from "./EditFeedbackPage.module.css";

import FeedbackForm from "../Components/feedback/FeedbackForm";
import SuggestionsContext from "../store/suggestions-context";
import GoBack from "../Components/ui/GoBack";

function EditFeedbackPage() {
  const { suggestionId } = useParams();
  const suggestionsCtx = useContext(SuggestionsContext);

  const curSuggestion = suggestionsCtx.suggestions.find(
    (suggestion) => String(suggestion.id) === suggestionId
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.editBody}>
      <header>
        <GoBack />
      </header>
      <FeedbackForm pageName="edit" data={curSuggestion}>
        Editing '{curSuggestion.title}'
      </FeedbackForm>
    </div>
  );
}

export default EditFeedbackPage;
