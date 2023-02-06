import { useEffect, useState } from "react";

import BtnsContainer from "./BtnsContainer";
import InputForm from "./InputForm";
import TextareaForm from "./TextareaForm";
import SelectForm from "./SelectForm";
import classes from "./FeedbackForm.module.css";

import { categoryToUpper, statusToUpper } from "../../utils/changeName";

interface Props {
  page: string;
  prevData: FeedbackItem;
}

const FeedbackForm = (props: Props) => {
  const dataState = useState<FeedbackItem>({
    title: "",
    category: "",
    status: "",
    description: "",
  });
  const [data, setData] = dataState;

  const { page, prevData } = props;

  useEffect(() => {
    if (page === "edit") {
      setData({
        ...prevData,
        category: categoryToUpper(prevData.category),
        status: statusToUpper(prevData.status),
      });
    }
  }, []);

  const submitHandler = () => {
    // const { title, category, status, description } = data;

    console.log(data);
    if (page === "edit") {
    } else {
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
      <BtnsContainer page={page} dataState={dataState} />
    </form>
  );
};

export default FeedbackForm;
