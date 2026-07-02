import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import BtnsContainer from "./BtnsContainer";
import InputForm from "./InputForm";
import TextareaForm from "./TextareaForm";
import SelectForm from "./SelectForm";
import classes from "./FeedbackForm.module.css";

import { addSug, editSug } from "../../store/suggestions-thunks";

interface Props {
  page: string;
  prevData?: Suggestion;
}

const FeedbackForm = (props: Props) => {
  const [data, setData] = useState<FeedbackItem>({
    title: "",
    category: "feature",
    status: "suggestion",
    description: "",
  });
  const dispatch = useAppDispatch();
  const { curLastIds } = useAppSelector((state) => state.suggestions);
  const [isValid, setIsValid] = useState(false);

  const { page, prevData } = props;
  const id = prevData?.id;
  const { title, description } = data;

  useEffect(() => {
    if (page === "edit") {
      setData({
        title: prevData!.title,
        description: prevData!.description,
        category: prevData!.category,
        status: prevData!.status,
      });
    }
  }, [page, prevData, setData]);

  useEffect(() => {
    if (title.trim() === "" || description.trim() === "") setIsValid(false);
    else setIsValid(true);
  }, [title, description]);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (data.title.trim() === "" || data.description.trim() === "") return;

    if (page === "edit") {
      dispatch(editSug({ ...prevData!, ...data }));
    } else {
      const newItem = {
        id: curLastIds.sug + 1,
        upvotes: 0,
        ...data,
      };
      dispatch(addSug(newItem));
    }
  };

  return (
    <form className={classes.feedbackForm} onSubmit={submitHandler}>
      <div className={classes.formText}>
        <InputForm data={data} setData={setData} />
        <SelectForm state="category" data={data} setData={setData} />
        {page === "edit" && <SelectForm state="status" data={data} setData={setData} />}
        <TextareaForm data={data} setData={setData} />
      </div>
      <BtnsContainer page={page} sugId={id} isValid={isValid} />
    </form>
  );
};

export default FeedbackForm;
