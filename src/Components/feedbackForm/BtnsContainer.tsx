import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";

import classes from "./BtnsContainer.module.css";

import { deleteSug } from "../../store/suggestions-thunks";

interface Props {
  page: string;
  sugId?: number;
  isValid: boolean;
}

const BtnsContainer = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { page, sugId } = props;

  const cancelHandler = () => {
    navigate(-1);
  };

  const deleteHandler = () => {
    dispatch(deleteSug(sugId!));
  };

  return (
    <div className={classes.BtnsCon}>
      <button
        className={classes.submitBtn}
        type="submit"
        disabled={!props.isValid}
      >
        {page === "edit" ? "Save Changes" : "Add Feedback"}
      </button>
      <button
        className={classes.cancelBtn}
        onClick={cancelHandler}
        type="button"
      >
        Cancel
      </button>
      {page === "edit" && (
        <button
          className={classes.deleteBtn}
          onClick={deleteHandler}
          type="button"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default BtnsContainer;
