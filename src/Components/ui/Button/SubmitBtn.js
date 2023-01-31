import classes from "./SubmitBtn.module.css";

function SubmitBtn(props) {
  function submitHandler(event) {
    event.preventDefault();
    props.setIsSubmit(true);
  }

  return (
    <button className={classes.submitBtn} type="submit" onClick={submitHandler}>
      {props.children}
    </button>
  );
}

export default SubmitBtn;
