import classes from "./Backdrop.module.css";

interface Props {
  onClick: () => void;
  isOption?: boolean;
}

const Backdrop = (props: Props) => {
  return (
    <div
      className={`${classes.backdrop} ${
        props.isOption ? classes.optionBackdrop : ""
      }`}
      onClick={props.onClick}
    />
  );
};

export default Backdrop;
