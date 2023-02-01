import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
  DetailPage,
  // EditFeedbackPage,
  // NewFeedbackPage,
  SuggestionsPage,
  // RoadMapPage,
} from "./pages";

function App() {
  const [isSubmit, setIsSubmit] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<SuggestionsPage />}></Route>
      <Route path="/detail/:requestId" element={<DetailPage />}></Route>
      {/* <Route
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
      <Route path="/roadmap/*" element={<RoadMapPage />}></Route> */}
    </Routes>
  );
}

export default App;
