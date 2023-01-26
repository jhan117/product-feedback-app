import classes from "./StatusDeco.module.css";

interface Props {
  status: string;
  isNav?: boolean;
}

const StatusDeco = (props: Props) => {
  const colorName = props.status.toLowerCase() + "Color";
  const statusName = props.status.replace("-", " ");

  return (
    <div className={`${classes.decoCon} ${props.isNav && classes.navCon}`}>
      <div className={`${classes.circle} ${classes[colorName]}`} />
      <p>{statusName}</p>
    </div>
  );
};

export default StatusDeco;
