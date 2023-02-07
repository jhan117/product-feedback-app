import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import BtnsContainer from "./BtnsContainer";
import InputForm from "./InputForm";
import TextareaForm from "./TextareaForm";
import SelectForm from "./SelectForm";
import classes from "./FeedbackForm.module.css";

import { categoryToUpper, statusToUpper } from "../../utils/changeName";
import { editSug } from "../../store/suggestions-thunks";

interface Props {
  page: string;
  prevData: Suggestion;
}

const FeedbackForm = (props: Props) => {
  const dataState = useState<FeedbackItem>({
    title: "",
    category: "",
    status: "",
    description: "",
  });
  const [data, setData] = dataState;
  const dispatch = useAppDispatch();
  const { curLastIds } = useAppSelector((state) => state.suggestions);

  const { page, prevData } = props;
  const id = prevData.id;

  useEffect(() => {
    if (page === "edit") {
      setData({
        title: prevData.title,
        description: prevData.description,
        category: categoryToUpper(prevData.category),
        status: statusToUpper(prevData.status),
      });
    }
  }, []);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (page === "edit") {
      dispatch(editSug({ ...prevData, ...data }));
    } else {
      const newItem = {
        id: curLastIds.sug,
        upvotes: 0,
        ...data,
      };
      console.log(newItem);
      // dispatch(addSug(newItem));
    }
  };

  return (
    <form className={classes.feedbackForm} onSubmit={submitHandler}>
      <div className={classes.formText}>
        <InputForm dataState={dataState} />
        <SelectForm state="category" dataState={dataState} />
        {page === "edit" && <SelectForm state="status" dataState={dataState} />}
        <TextareaForm dataState={dataState} />
      </div>
      <BtnsContainer page={page} sugId={id} />
    </form>
  );
};

export default FeedbackForm;
