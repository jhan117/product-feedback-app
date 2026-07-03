import { Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";

import SuggestionsPage from "./pages/SuggestionsPage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import NewPage from "./pages/NewPage";
import RoadmapPage from "./pages/RoadmapPage";
import LoginPage from "./pages/LoginPage";
import { suggestionsActions } from "./store/suggestions-slice";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useAppSelector((state) => state.suggestions.isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};


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
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <SuggestionsPage showError={showError} handler={errorHandler} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feedbacks/:requestId"
        element={
          <ProtectedRoute>
            <DetailPage showError={showError} handler={errorHandler} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feedbacks/:requestId/edit"
        element={
          <ProtectedRoute>
            <EditPage showError={showError} handler={errorHandler} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feedbacks/new"
        element={
          <ProtectedRoute>
            <NewPage showError={showError} handler={errorHandler} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/roadmap"
        element={
          <ProtectedRoute>
            <RoadmapPage showError={showError} handler={errorHandler} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
