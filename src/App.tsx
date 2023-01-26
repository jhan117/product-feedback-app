import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
  DetailFeedbackPage,
  EditFeedbackPage,
  NewFeedbackPage,
  SuggestionsPage,
  RoadMapPage,
} from "./pages";

function App() {
  const [isSubmit, setIsSubmit] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<SuggestionsPage />}></Route>
      <Route
        path="/detail/:requestId"
        element={<DetailFeedbackPage isSubmit={isSubmit} />}
      ></Route>
      <Route
        path="/add/*"
        element={
          <NewFeedbackPage isSubmit={isSubmit} setIsSubmit={setIsSubmit} />
        }
      ></Route>
      <Route
        path="/edit/:requestId"
        element={
          <EditFeedbackPage isSubmit={isSubmit} setIsSubmit={setIsSubmit} />
        }
      ></Route>
      <Route path="/roadmap/*" element={<RoadMapPage />}></Route>
    </Routes>
  );
}

export default App;
