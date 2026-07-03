import {
  ChangeEvent,
  useEffect,
  useState,
} from "react";

import classes from "./TextareaForm.module.css";

interface Props {
  initialValue: string;
  showError?: boolean;
}

const TextareaForm = (props: Props) => {
  const [value, setValue] = useState(props.initialValue);
  const [isValid, setIsValid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    setValue(props.initialValue);
  }, [props.initialValue]);

  const detailChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    setIsValid(event.target.value.trim() !== "");
  };

  const hasError = (!isValid && isTouched) || (props.showError && value.trim() === "");

  const textareaStyle = `${classes.textarea} ${
    hasError ? classes.textError : ""
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
        name="description"
        className={textareaStyle}
        value={value}
        onChange={detailChangeHandler}
        onBlur={() => {
          setIsTouched(true);
          setIsValid(value.trim() !== "");
        }}
      />
      {hasError && <p className={classes.error}>Can't be empty</p>}
    </div>
  );
};

export default TextareaForm;
