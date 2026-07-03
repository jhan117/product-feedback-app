import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

import GoBack from "../UI/GoBack";
import classes from "./DetailHeader.module.css";

interface Props {
  id: string;
}

const DetailHeader = (props: Props) => {
  const { isLoading } = useAppSelector((state) => state.suggestions);
  const navigate = useNavigate();

  return (
    <header className={classes.detailHeader}>
      <GoBack />
      <button 
        className={classes.editBtn} 
        disabled={isLoading}
        onClick={() => navigate(`/feedbacks/${props.id}/edit`)}
      >
        Edit Feedback
      </button>
    </header>
  );
};

export default DetailHeader;
