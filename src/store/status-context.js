import { createContext } from "react";

const StatusContext = createContext({
  status: [], // option에 넣을 리스트 {id, name}
  totalStatusSuggestions: (status, suggestions) => {}, // status별 suggestions
  statusSuggestionsLength: (status, suggestions) => {}, // status별 suggestions 개수 planned, in-progress, live
  changeStatusName: (status) => {}, //  -> with uppercase -> lowercase
});

export function StatusContextProvider(props) {
  const statusList = [
    { id: "st1", name: "Suggestion" },
    { id: "st2", name: "Planned" },
    { id: "st3", name: "In-Progress" },
    { id: "st4", name: "Live" },
  ];

  function getStatusSuggestionsHandler(status, suggestions) {
    return suggestions.filter((suggestion) => suggestion.status === status);
  }

  function getStatusLengthsHandler(status, suggestions) {
    return suggestions.filter((suggestion) => suggestion.status === status)
      .length;
  }

  function changeStatusNameHandler(status) {
    let name = "";

    statusList.forEach((st) => {
      if (st.name.toLowerCase() === status) {
        name = st.name;
      }
    });

    return name;
  }

  const context = {
    status: statusList,
    totalStatusSuggestions: getStatusSuggestionsHandler,
    statusSuggestionsLength: getStatusLengthsHandler,
    changeStatusName: changeStatusNameHandler,
  };

  return (
    <StatusContext.Provider value={context}>
      {props.children}
    </StatusContext.Provider>
  );
}

export default StatusContext;
