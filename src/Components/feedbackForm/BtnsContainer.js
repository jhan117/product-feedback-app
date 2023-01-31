import classes from "./BtnsContainer.module.css";

import SubmitBtn from "../ui/Button/SubmitBtn";
import CancelBtn from "../ui/Button/CancelBtn";
import DeleteBtn from "../ui/Button/DeleteBtn";

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
