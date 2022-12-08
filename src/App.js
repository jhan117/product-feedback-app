import { Route, Routes } from "react-router-dom";

import {
  DetailFeedbackPage,
  EditFeedbackPage,
  NewFeedbackPage,
  SuggestionsPage,
  RoadMapPage,
} from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SuggestionsPage />}></Route>
      <Route path="/detail/:requestId" element={<DetailFeedbackPage />}></Route>
      <Route path="/add/*" element={<NewFeedbackPage />}></Route>
      <Route path="/edit/:suggestionId" element={<EditFeedbackPage />}></Route>
      <Route path="/roadmap/*" element={<RoadMapPage />}></Route>
    </Routes>
  );
}

export default App;
