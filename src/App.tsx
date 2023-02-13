import { Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";

import SuggestionsPage from "./pages/SuggestionsPage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import NewPage from "./pages/NewPage";
import RoadmapPage from "./pages/RoadmapPage";

import { suggestionsActions } from "./store/suggestions-slice";

const App = () => {
  const [showError, setShowError] = useState(false);
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.suggestions.error);

  useEffect(() => {
    if (error) setShowError(true);
  }, [error]);

  const errorHandler = () => {
    setShowError(false);
    dispatch(suggestionsActions.cancelError());
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <SuggestionsPage showError={showError} handler={errorHandler} />
        }
      />
      <Route
        path="/detail/:requestId"
        element={<DetailPage showError={showError} handler={errorHandler} />}
      />
      <Route
        path="/edit/:requestId"
        element={<EditPage showError={showError} handler={errorHandler} />}
      />
      <Route
        path="/add"
        element={<NewPage showError={showError} handler={errorHandler} />}
      />
      <Route
        path="/roadmap"
        element={<RoadmapPage showError={showError} handler={errorHandler} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
