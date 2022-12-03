import { createContext, useState } from "react";

const SortContext = createContext({
  // 현재 설정된 정렬 방식
  // 0: Most Upvotes, 1: Least Upvotes, 2: Most Comments, 3: Least Comments
  sortBy: 0,
  sortList: [],
  changeSort: (sort) => {},
});

export function SortContextProvider(props) {
  const [curSort, setCurSort] = useState(0);

  const sortList = [
    { id: "s1", name: "Most Upvotes" },
    { id: "s2", name: "Least Upvotes" },
    { id: "s3", name: "Most Comments" },
    { id: "s4", name: "Least Comments" },
  ];

  function changeSortHandler(sort) {
    setCurSort(sort);
  }

  const context = {
    sortBy: curSort,
    sortList: sortList,
    changeSort: changeSortHandler,
  };

  return (
    <SortContext.Provider value={context}>
      {props.children}
    </SortContext.Provider>
  );
}

export default SortContext;
