import { createContext, useState } from "react";

const TagsContext = createContext({
  tag: "", // 현재 설정된 태크
  tagList: [], // 태그 목록 ALL 포함 {id, name}
  optionTagList: [], // select 용도 태그 목록
  changeTag: (tag) => {},
});

export function TagsContextProvider(props) {
  const [curTag, setCurTag] = useState("all");

  const tags = [
    { id: "t1", name: "All" },
    { id: "t2", name: "UI" },
    { id: "t3", name: "UX" },
    { id: "t4", name: "Enhancement" },
    { id: "t5", name: "Bug" },
    { id: "t6", name: "Feature" },
  ];

  const optionTags = [
    { id: "t6", name: "Feature" },
    { id: "t2", name: "UI" },
    { id: "t3", name: "UX" },
    { id: "t4", name: "Enhancement" },
    { id: "t5", name: "Bug" },
  ];

  function changeTagHandler(tag) {
    setCurTag(tag);
  }

  const context = {
    tag: curTag,
    tagList: tags,
    optionTagList: optionTags,
    changeTag: changeTagHandler,
  };

  return (
    <TagsContext.Provider value={context}>
      {props.children}
    </TagsContext.Provider>
  );
}

export default TagsContext;
