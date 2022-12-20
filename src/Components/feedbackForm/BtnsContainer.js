import classes from "./BtnsContainer.module.css";

import SubmitBtn from "../ui/buttons/SubmitBtn";
import CancelBtn from "../ui/buttons/CancelBtn";
import DeleteBtn from "../ui/buttons/DeleteBtn";

function BtnsContainer(props) {
  return (
    <div className={classes.BtnsCon}>
      <SubmitBtn setIsSubmit={props.setIsSubmit}>
        {props.state === "edit" ? "Save Changes" : "Add Feedback"}
      </SubmitBtn>
      <CancelBtn />
      {props.state === "edit" ? (
        <DeleteBtn setIsDelete={props.setIsDelete} />
      ) : null}
    </div>
  );
}

export default BtnsContainer;
