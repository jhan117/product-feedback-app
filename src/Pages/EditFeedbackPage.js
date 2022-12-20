import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import classes from "./EditFeedbackPage.module.css";

import useRootClass from "../utils/useRootClass";
import request from "../utils/request";

import FeedbackForm from "../Components/feedbackForm/FeedbackForm";
import GoBack from "../Components/ui/GoBack";

function EditFeedbackPage(props) {
  useRootClass("edit");
  const { requestId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedData, setLoadedData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    request
      .get(
        `https://product-feedback-app-33a7d-default-rtdb.firebaseio.com/productRequests/${
          requestId - 1
        }.json`
      )
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        setLoadedData(data);
        setIsLoading(false);
        window.scrollTo(0, 0);
      })
      .catch((err) => console.log(err));
  }, []);

  let content = "";
  if (isLoading) {
    content = "Loading...";
  } else {
    content = (
      <FeedbackForm
        pageName="edit"
        data={loadedData}
        isSubmit={props.isSubmit}
        setIsSubmit={props.setIsSubmit}
      >
        Editing '{loadedData.title}'
      </FeedbackForm>
    );
  }

  return (
    <Fragment>
      <header>
        <GoBack />
      </header>
      <main className={classes.editMain}>{content}</main>
    </Fragment>
  );
}

export default EditFeedbackPage;
