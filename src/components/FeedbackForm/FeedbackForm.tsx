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
    title: "", // Not used in state anymore, handled by uncontrolled input
    category: "feature",
    status: "suggestion",
    description: "", // Not used in state anymore
  });
  const dispatch = useAppDispatch();
  const { curLastIds } = useAppSelector((state) => state.suggestions);

  const { page, prevData } = props;
  const id = prevData?.id;

  useEffect(() => {
    if (page === "edit") {
      setData({
        title: "", // Ignored by state
        description: "", // Ignored by state
        category: prevData!.category,
        status: prevData!.status,
      });
    }
  }, [page, prevData, setData]);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (title.trim() === "" || description.trim() === "") return;

    const finalData = { ...data, title, description };

    if (page === "edit") {
      dispatch(editSug({ ...prevData!, ...finalData }));
    } else {
      const newItem = {
        id: curLastIds.sug + 1,
        upvotes: 0,
        ...finalData,
      };
      dispatch(addSug(newItem));
    }
  };

  return (
    <form className={classes.feedbackForm} onSubmit={submitHandler}>
      <div className={classes.formText}>
        <InputForm initialValue={page === "edit" ? prevData!.title : ""} />
        <SelectForm state="category" data={data} setData={setData} />
        {page === "edit" && <SelectForm state="status" data={data} setData={setData} />}
        <TextareaForm initialValue={page === "edit" ? prevData!.description : ""} />
      </div>
      <BtnsContainer page={page} sugId={id} isValid={true} />
    </form>
  );
};

export default FeedbackForm;
