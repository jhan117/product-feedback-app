import { useNavigate } from "react-router-dom";

import classes from "./AddButton.module.css";

const AddButton = () => {
  const navigate = useNavigate();
  return (
    <button className={classes.addBtn} onClick={() => navigate("/feedbacks/new")}>
      <span className={classes.addBtnText}>+ Add Feedback</span>
    </button>
  );
};

export default AddButton;
