import { useNavigate } from "react-router-dom";

import classes from "./CancelBtn.module.css";

function CancelBtn() {
  let navigate = useNavigate();

  function cancelHandler(event) {
    event.preventDefault();
    navigate(-1);
  }

  return (
    <button className={classes.cancelBtn} onClick={cancelHandler}>
      Cancel
    </button>
  );
}

export default CancelBtn;
