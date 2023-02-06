import { Navigate, Route, Routes } from "react-router-dom";

import {
  DetailPage,
  EditPage,
  // NewFeedbackPage,
  SuggestionsPage,
  // RoadMapPage,
} from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SuggestionsPage />} />
      <Route path="/detail/:requestId" element={<DetailPage />} />
      <Route path="/edit/:requestId" element={<EditPage />} />
      {/* <Route
        path="/add/*"
        element={
          <NewFeedbackPage isSubmit={isSubmit} setIsSubmit={setIsSubmit} />
        }
      />
      <Route path="/roadmap/*" element={<RoadMapPage />} /> */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
