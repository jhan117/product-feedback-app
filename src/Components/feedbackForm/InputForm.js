import { useEffect } from "react";

import classes from "./InputForm.module.css";

function InputForm(props) {
  useEffect(() => {
    if (props.value) {
      props.setSugData((prevData) => ({
        ...prevData,
        title: props.value,
      }));
    }
  }, []);

  function titleSaveHandler(event) {
    if (event.target.value) {
      props.setSugData((prevData) => ({
        ...prevData,
        title: event.target.value,
      }));
      props.setIsTitle(true);
    } else {
      props.setIsTitle(false);
    }
  }

  return (
    <div className={classes.inputCon}>
      <label htmlFor="title">
        Feedback Title<p>Add a short, descriptive headline</p>
      </label>
      <input
        id="title"
        className={
          props.isSubmitted && !props.isTitle ? classes.textError : null
        }
        onChange={titleSaveHandler}
        defaultValue={props.value ? props.value : null}
      />
      {props.isSubmitted && !props.isTitle ? (
        <p className={classes.error}>Can't be empty</p>
      ) : null}
    </div>
  );
}

export default InputForm;
