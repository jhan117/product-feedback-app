import { useNavigate } from "react-router-dom";
import { ReactComponent as IconPlus } from "../../assets/shared/icon-plus.svg";

import classes from "./AddButton.module.css";

const AddButton = () => {
  const navigate = useNavigate();
  return (
    <button className={classes.addBtn} onClick={() => navigate("/feedbacks/new")}>
      <IconPlus aria-hidden="true" />
      <span className={classes.addBtnText}>Add Feedback</span>
    </button>
  );
};

export default AddButton;
