import classes from "./DeleteBtn.module.css";

function DeleteBtn(props) {
  function deleteHandler(event) {
    event.preventDefault();
    props.setIsDelete(true);
  }

  return (
    <button className={classes.deleteBtn} onClick={deleteHandler}>
      Delete
    </button>
  );
}

export default DeleteBtn;
