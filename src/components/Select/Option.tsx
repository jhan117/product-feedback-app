import { Dispatch, Fragment, SetStateAction } from "react";
import { createPortal } from "react-dom";

import Backdrop from "../UI/Backdrop";
import OptionList from "./OptionList";

interface Props {
  state: string;
  data?: FeedbackItem;
  setData?: Dispatch<SetStateAction<FeedbackItem>>;
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
          data={props.data}
          setData={props.setData}
          onClickOption={props.onClickOption}
          position={props.position}
        />,
        document.getElementById("overlay-root")!
      )}
    </Fragment>
  );
};

export default Option;
