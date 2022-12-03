import classes from "./BtnsConForm.module.css";

import Btn from "../ui/Btn";

function BtnsConForm(props) {
  const newContent = (
    <div className={classes.btnsCon}>
      <Btn
        state="addFeedback"
        type="submit"
        color="purple"
        setIsSubmit={props.setIsSubmit}
      >
        Add Feedback
      </Btn>
      <Btn state="cancel" color="indigo">
        Cancel
      </Btn>
    </div>
  );

  const editContent = (
    <div className={classes.btnsCon}>
      <Btn
        state="saveChanges"
        type="submit"
        color="purple"
        setIsSubmit={props.setIsSubmit}
      >
        Save Changes
      </Btn>
      <Btn state="cancel" color="indigo">
        Cancel
      </Btn>
      <Btn
        state="delete"
        colorHsl="hsl(0, 67%, 53%)"
        setIsDelete={props.setIsDelete}
      >
        Delete
      </Btn>
    </div>
  );

  return props.state === "add" ? newContent : editContent;
}

export default BtnsConForm;
