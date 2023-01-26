import { Dispatch, Fragment } from "react";
import { createPortal } from "react-dom";

import Backdrop from "../Backdrop";
import OptionList from "./OptionList";

interface Props {
  onClick: () => void;
  state: string;
  selectedState: [string, Dispatch<string>];
  options: Item[];
  position: Pos;
}

const Option = (props: Props) => {
  return (
    <Fragment>
      {createPortal(
        <Backdrop onClick={props.onClick} isOption={true} />,
        document.getElementById("backdrop-root")!
      )}
      {createPortal(
        <OptionList
          state={props.state}
          selectedState={props.selectedState}
          options={props.options}
          onClick={props.onClick}
          position={props.position}
        />,
        document.getElementById("overlay-root")!
      )}
    </Fragment>
  );
};

export default Option;
