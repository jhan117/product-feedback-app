import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

import GoBack from "../ui/GoBack";
import classes from "./DetailHeader.module.css";

interface Props {
  id: string;
}

const DetailHeader = (props: Props) => {
  const { isLoading } = useAppSelector((state) => state.suggestions);

  const linkStyle = `${classes.editLink} ${
    isLoading ? classes.linkDisabled : ""
  }`;

  return (
    <header className={classes.detailHeader}>
      <GoBack />
      <button className={classes.editBtn} disabled={isLoading}>
        <Link className={linkStyle} to={`/edit/${props.id}`}>
          Edit Feedback
        </Link>
      </button>
    </header>
  );
};

export default DetailHeader;
