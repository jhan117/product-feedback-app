import { Link } from "react-router-dom";

import classes from "./EditBtn.module.css";

function EditBtn(props) {
  return (
    <button className={classes.editBtn}>
      <Link className={classes.editLink} to={`/edit/${props.id}`}>
        Edit Feedback
      </Link>
    </button>
  );
}

export default EditBtn;
