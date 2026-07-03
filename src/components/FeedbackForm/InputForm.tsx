import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import classes from "./InputForm.module.css";

interface Props {
  initialValue: string;
}

const InputForm = (props: Props) => {
  const [value, setValue] = useState(props.initialValue);
  const [isValid, setIsValid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    setValue(props.initialValue);
  }, [props.initialValue]);

  const titleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setIsValid(event.target.value.trim() !== "");
  };

  return (
    <div className={classes.inputCon}>
      <label htmlFor="title">
        Feedback Title<p>Add a short, descriptive headline</p>
      </label>
      <input
        id="title"
        name="title"
        className={!isValid && isTouched ? classes.textError : ""}
        value={value}
        onChange={titleChangeHandler}
        onBlur={() => {
          setIsTouched(true);
          setIsValid(value.trim() !== "");
        }}
      />
      {!isValid && isTouched && <p className={classes.error}>Can't be empty</p>}
    </div>
  );
};

export default InputForm;
