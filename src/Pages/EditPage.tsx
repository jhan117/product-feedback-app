import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

import GoBack from "../components/ui/GoBack";
import EditMain from "../components/edit&newPage/EditMain";

import changeRootStyle from "../utils/changeRootStyle";

const EditPage = () => {
  const navigate = useNavigate();
  const { sugId } = useAppSelector((state) => state.suggestions);

  useEffect(() => {
    if (sugId === "") {
      return navigate("/");
    }
    changeRootStyle("edit");
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <header>
        <GoBack />
      </header>
      <EditMain />
    </Fragment>
  );
};

export default EditPage;
