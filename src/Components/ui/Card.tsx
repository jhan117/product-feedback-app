import { ReactNode } from "react";
import classes from "./Card.module.css";

// style 임시 등록
interface Props {
  style?: {};
  className: string;
  children: ReactNode;
}

const Card = (props: Props) => {
  return (
    <div style={props.style} className={`${classes.card} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Card;
