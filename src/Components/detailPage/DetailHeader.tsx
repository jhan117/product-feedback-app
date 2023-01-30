import GoBack from "../ui/GoBack";
import EditBtn from "../ui/buttons/EditBtn";
import classes from "./DetailHeader.module.css";

interface Props {
  id: string;
}

const DetailHeader = (props: Props) => {
  return (
    <header className={classes.detailHeader}>
      <GoBack />
      <EditBtn id={props.id} />
    </header>
  );
};

export default DetailHeader;
