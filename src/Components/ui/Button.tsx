import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
}

const Button = (props: Props) => {
  return (
    <button
      className={props.className}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
