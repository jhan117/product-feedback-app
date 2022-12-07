import { Route, Routes } from "react-router-dom";

import Layout from "./Components/layout/Layout";
import {
  DetailFeedbackPage,
  EditFeedbackPage,
  NewFeedbackPage,
  SuggestionsPage,
  RoadMapPage,
} from "./pages";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SuggestionsPage />}></Route>
        <Route
          path="/detail/:requestId"
          element={<DetailFeedbackPage />}
        ></Route>
        <Route path="/add/*" element={<NewFeedbackPage />}></Route>
        <Route
          path="/edit/:suggestionId"
          element={<EditFeedbackPage />}
        ></Route>
        <Route path="/roadmap/*" element={<RoadMapPage />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
