import { Dispatch, SetStateAction } from "react";

import Select from "../Select/Select";
import classes from "./SelectForm.module.css";

interface Props {
  state: string;
  dataState: [FeedbackItem, Dispatch<SetStateAction<FeedbackItem>>];
}

const SelectForm = (props: Props) => {
  let labelTitle = "";
  let labelDesc = "";
  if (props.state === "category") {
    labelTitle = "Category";
    labelDesc = "Choose a category for your feedback";
  } else {
    labelTitle = "Update Status";
    labelDesc = "Change feature state";
  }

  return (
    <div className={classes.selectFrom}>
      <label htmlFor={props.state}>
        {labelTitle}
        <p>{labelDesc}</p>
      </label>
      <Select state={props.state} dataState={props.dataState} />
    </div>
  );
};

export default SelectForm;
