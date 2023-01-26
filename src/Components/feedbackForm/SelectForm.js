import classes from "./SelectForm.module.css";

import Select from "../ui/Select/Select";

function SelectForm(props) {
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
      <Select
        state={props.state}
        setSugData={props.setSugData}
        setSugStatus={props.setSugStatus}
        valueS={props.valueS}
        valueC={props.valueC}
      />
    </div>
  );
}

export default SelectForm;
