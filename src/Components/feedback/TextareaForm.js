import { useEffect } from "react";

import classes from "./TextareaForm.module.css";

function TextareaForm(props) {
  useEffect(() => {
    if (props.value) {
      props.setSugData((prevData) => ({
        ...prevData,
        description: props.value,
      }));
    }
  }, []);

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
        maxLength={250}
        className={`${classes.textarea} ${
          props.isSubmitted && !props.isDesc ? classes.textError : null
        }`}
        onChange={(e) => {
          props.setSugData((prevData) => ({
            ...prevData,
            description: e.target.value,
          }));
        }}
        defaultValue={props.value ? props.value : null}
      />
      {props.isSubmitted && !props.isDesc ? (
        <p className={classes.error}>Can't be empty</p>
      ) : null}
    </div>
  );
}

export default TextareaForm;
