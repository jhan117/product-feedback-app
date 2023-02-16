import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import classes from "./TextareaForm.module.css";

interface Props {
  dataState: [FeedbackItem, Dispatch<SetStateAction<FeedbackItem>>];
}

const TextareaForm = (props: Props) => {
  const [data, setData] = props.dataState;
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const { description } = data;

  useEffect(() => {
    if (description.trim() === "") {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [description]);

  const detailChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setData((prevState) => ({
      ...prevState,
      description: event.target.value,
    }));
  };

  const textareaStyle = `${classes.textarea} ${
    !isValid && isTouched ? classes.textError : ""
  }`;

  return (
    <div className={classes.textareaCon}>
      <label htmlFor="detail">
        Feedback Detail
        <p>
          Include any specific comments on what should be improved, added, etc.
        </p>
      </label>
      <textarea
        id="detail"
        className={textareaStyle}
        value={description}
        onChange={detailChangeHandler}
        onBlur={() => setIsTouched(true)}
      />
      {!isValid && isTouched && <p className={classes.error}>Can't be empty</p>}
    </div>
  );
};

export default TextareaForm;
