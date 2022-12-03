import classes from "./Card.module.css";

function Card(props) {
  return (
    <div style={props.style} className={classes.card}>
      {props.children}
    </div>
  );
}

export default Card;
