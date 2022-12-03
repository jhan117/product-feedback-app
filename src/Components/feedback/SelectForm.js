import classes from "./SelectForm.module.css";

import Select from "../ui/select/Select";

function SelectForm(props) {
  return (
    <div className={classes.selectFrom}>
      <label htmlFor={props.state}>
        {props.state === "category" ? "Category" : "Update Status"}
        <p>
          {props.state === "category"
            ? "Choose a category for your feedback"
            : "Change feature state"}
        </p>
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
