import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./BtnsContainer.module.css";

interface Props {
  page: string;
  dataState: [FeedbackItem, Dispatch<SetStateAction<FeedbackItem>>];
}

const BtnsContainer = (props: Props) => {
  const navigate = useNavigate();

  const { page, dataState } = props;

  const cancelHandler = () => {
    navigate(-1);
    dataState[1]({
      title: "",
      category: "",
      status: "",
      description: "",
    });
  };

  const deleteHandler = () => {
    navigate(-1);
    dataState[1]({
      title: "",
      category: "",
      status: "",
      description: "",
    });
  };

  return (
    <div className={classes.BtnsCon}>
      <button className={classes.submitBtn} type="submit">
        {page === "edit" ? "Save Changes" : "Add Feedback"}
      </button>
      <button className={classes.cancelBtn} onClick={cancelHandler}>
        Cancel
      </button>
      {page === "edit" && (
        <button className={classes.deleteBtn} onClick={deleteHandler}>
          Delete
        </button>
      )}
    </div>
  );
};

export default BtnsContainer;
