import classes from "./SelectModal.module.css";

function SelectModal(props) {
  return (
    <div
      className={classes.modal}
      onClick={() => {
        props.setIsOpenOption(false);
      }}
    />
  );
}

export default SelectModal;
