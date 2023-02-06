import { Dispatch, Fragment, SetStateAction } from "react";
import { createPortal } from "react-dom";

import Backdrop from "../ui/Backdrop";
import OptionList from "./OptionList";

interface Props {
  state: string;
  dataState?: [FeedbackItem, Dispatch<SetStateAction<FeedbackItem>>];
  options: Item[];
  position: Pos;
  onClickOption: () => void;
}

const Option = (props: Props) => {
  return (
    <Fragment>
      {createPortal(
        <Backdrop onClick={props.onClickOption} isOption={true} />,
        document.getElementById("backdrop-root")!
      )}
      {createPortal(
        <OptionList
          state={props.state}
          dataState={props.dataState}
          options={props.options}
          onClickOption={props.onClickOption}
          position={props.position}
        />,
        document.getElementById("overlay-root")!
      )}
    </Fragment>
  );
};

export default Option;
