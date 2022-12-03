import { ReactComponent as IconNewFeedback } from "../../assets/shared/icon-new-feedback.svg";
import { ReactComponent as IconEditFeedback } from "../../assets/shared/icon-edit-feedback.svg";
import { useContext, useEffect, useState } from "react";

import classes from "./FeedbackForm.module.css";
import SuggestionsContext from "../../store/suggestions-context";

import Card from "../ui/Card";
import BtnsConForm from "./BtnsConForm";
import InputForm from "./InputForm";
import TextareaForm from "./TextareaForm";
import SelectForm from "./SelectForm";
import { useNavigate } from "react-router-dom";

function FeedbackForm(props) {
  const iconStyle = { position: "absolute", top: "8.8rem" };

  const suggestionsCtx = useContext(SuggestionsContext);
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sugData, setSugData] = useState({
    title: "",
    category: "",
    description: "",
  });
  const [sugStatus, setSugStatus] = useState({
    status: "",
  });
  const [isTitle, setTitle] = useState(false);
  const [isDesc, setDesc] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    if (isSubmit) {
      setIsSubmitted(true);
    }

    if (isSubmitted) {
      if (sugData["title"] === "") {
        setTitle(false);
        setIsSubmit(false);
      } else {
        setTitle(true);
      }

      if (sugData["description"] === "") {
        setDesc(false);
        setIsSubmit(false);
      } else {
        setDesc(true);
      }
    }

    if (isDelete) {
      suggestionsCtx.removeSuggestion(props.data.id);
      setIsSubmit(false);
      setIsSubmitted(false);
      setIsDelete(false);
      navigate("/", { replace: true });
    }

    if (props.pageName === "add" && isSubmit) {
      if (isDesc && isTitle) {
        suggestionsCtx.addSuggestion({
          id: suggestionsCtx.curSuggestionId,
          upvotes: 0,
          status: "suggestion",
          ...sugData,
        });
        setIsSubmit(false);
        setIsSubmitted(false);
        navigate(-1);
      }
    } else if (props.pageName === "edit" && isSubmit) {
      if (isDesc && isTitle) {
        suggestionsCtx.editSuggestion(props.data.id, {
          ...sugData,
          ...sugStatus,
        });
        setIsSubmit(false);
        setIsSubmitted(false);
        navigate(-1);
      }
    }
  });

  return (
    <div className={classes.main}>
      <Card style={{ padding: "4.4rem 2.4rem 2.4rem" }}>
        {props.pageName === "add" ? (
          <IconNewFeedback
            width="40"
            height="40"
            viewBox="0 0 56 56"
            style={iconStyle}
          />
        ) : (
          <IconEditFeedback width="40" height="40" style={iconStyle} />
        )}
        <form className={classes.feedbackForm}>
          <div className={classes.formText}>
            <h2>{props.children}</h2>
            <InputForm
              setSugData={setSugData}
              isSubmitted={isSubmitted}
              isTitle={isTitle}
              setIsSubmit={setIsSubmit}
              value={props.pageName === "edit" ? props.data.title : null}
            />
            <SelectForm
              state="category"
              setSugData={setSugData}
              valueC={props.pageName === "edit" ? props.data.category : null}
            />
            {props.pageName === "edit" ? (
              <SelectForm
                state="status"
                setSugData={setSugData}
                setSugStatus={setSugStatus}
                valueS={props.data.status}
              />
            ) : null}
            <TextareaForm
              setSugData={setSugData}
              isSubmitted={isSubmitted}
              isDesc={isDesc}
              setIsSubmit={setIsSubmit}
              value={props.pageName === "edit" ? props.data.description : null}
            />
          </div>
          <BtnsConForm
            state={props.pageName}
            setIsSubmit={setIsSubmit}
            setIsDelete={setIsDelete}
          />
        </form>
      </Card>
    </div>
  );
}

export default FeedbackForm;
