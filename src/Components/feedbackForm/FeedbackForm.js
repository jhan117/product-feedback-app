import { ReactComponent as IconNewFeedback } from "../../assets/shared/icon-new-feedback.svg";
import { ReactComponent as IconEditFeedback } from "../../assets/shared/icon-edit-feedback.svg";
import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./FeedbackForm.module.css";
import SuggestionsContext from "../../store/suggestions-context";

import useMediaQuery from "../../utils/useMediaQuery";

import BtnsContainer from "./BtnsContainer";
import InputForm from "./InputForm";
import TextareaForm from "./TextareaForm";
import SelectForm from "./SelectForm";

function FeedbackForm(props) {
  const navigate = useNavigate();
  const suggestionsCtx = useContext(SuggestionsContext);
  const isTablet = useMediaQuery("tablet");
  const isDesktop = useMediaQuery("desktop");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sugData, setSugData] = useState({
    title: "",
    category: "",
    description: "",
  });
  const [sugStatus, setSugStatus] = useState({
    status: "",
  });
  const [isTitle, setIsTitle] = useState(
    props.pageName === "edit" ? true : false
  );
  const [isDesc, setIsDesc] = useState(
    props.pageName === "edit" ? true : false
  );
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    if (props.isSubmit) {
      setIsSubmitted(true);

      if (isTitle && isDesc) {
        if (props.pageName === "add") {
          // id, title, category, upvotes, status, description
          suggestionsCtx.addSuggestion({
            id: suggestionsCtx.curSuggestionId,
            upvotes: 0,
            status: "suggestion",
            ...sugData,
          });
        } else if (props.pageName === "edit") {
          suggestionsCtx.editSuggestion(props.data.id, {
            ...sugData,
            ...sugStatus,
          });
        }
        navigate(-1, { replace: true });
        setIsSubmitted(false);
      }
      props.setIsSubmit(false);
    }
    if (isDelete) {
      suggestionsCtx.removeSuggestion(props.data.id);
      props.setIsSubmit(false);
      setIsSubmitted(false);
      setIsDelete(false);
      navigate("/", { replace: true });
    }
  }, [props.isSubmit, isTitle, isDesc, isDelete, props.pageName]);

  // (24 + 55 + 19) - 20 = 78
  // (56 + 68 + 20) - 28 = 116
  // (92 + 68 + 20) - 28 = 152
  const iconStyle = {
    position: "absolute",
    top: isDesktop ? "15.2rem" : isTablet ? "11.6rem" : "7.8rem",
  };
  const size = isTablet ? "56" : "40";

  return (
    <Fragment>
      {props.pageName === "add" ? (
        <IconNewFeedback
          width={size}
          height={size}
          viewBox="0 0 56 56"
          style={iconStyle}
        />
      ) : (
        <IconEditFeedback
          width={size}
          height={size}
          viewBox="0 0 40 40"
          style={iconStyle}
        />
      )}
      <h2>{props.children}</h2>
      <form className={classes.feedbackForm}>
        <div className={classes.formText}>
          <InputForm
            setSugData={setSugData}
            isSubmitted={isSubmitted}
            isTitle={isTitle}
            setIsTitle={setIsTitle}
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
            setIsDesc={setIsDesc}
            value={props.pageName === "edit" ? props.data.description : null}
          />
        </div>
        <BtnsContainer
          state={props.pageName}
          setIsSubmit={props.setIsSubmit}
          setIsDelete={setIsDelete}
        />
      </form>
    </Fragment>
  );
}

export default FeedbackForm;
