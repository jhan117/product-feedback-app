import { Link } from "react-router-dom";

import GoBack from "../ui/GoBack";
import classes from "./DetailHeader.module.css";

interface Props {
  id: string;
}

const DetailHeader = (props: Props) => {
  return (
    <header className={classes.detailHeader}>
      <GoBack />
      <button className={classes.editBtn}>
        <Link className={classes.editLink} to={`/edit/${props.id}`}>
          Edit Feedback
        </Link>
      </button>
    </header>
  );
};

export default DetailHeader;
