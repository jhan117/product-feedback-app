import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import classes from "./InputForm.module.css";

interface Props {
  dataState: [FeedbackItem, Dispatch<SetStateAction<FeedbackItem>>];
}

const InputForm = (props: Props) => {
  const [data, setData] = props.dataState;
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const { title } = data;

  useEffect(() => {
    if (title.trim() === "") {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [title]);

  const titleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => {
      return {
        ...prevState,
        title: event.target.value,
      };
    });
  };

  return (
    <div className={classes.inputCon}>
      <label htmlFor="title">
        Feedback Title<p>Add a short, descriptive headline</p>
      </label>
      <input
        id="title"
        className={!isValid && isTouched ? classes.textError : ""}
        value={title}
        onChange={titleChangeHandler}
        onBlur={() => setIsTouched(true)}
      />
      {!isValid && isTouched && <p className={classes.error}>Can't be empty</p>}
    </div>
  );
};

export default InputForm;
