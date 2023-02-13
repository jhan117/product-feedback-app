import { Link } from "react-router-dom";

import classes from "./AddButton.module.css";

const AddButton = () => {
  return (
    <button className={classes.addBtn}>
      <Link className={classes.addBtnText} to="/add">
        + Add Feedback
      </Link>
    </button>
  );
};

export default AddButton;
