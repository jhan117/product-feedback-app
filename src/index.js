import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SuggestionsContextProvider } from "./store/suggestions-context";
import { TagsContextProvider } from "./store/tags-context";
import { SortContextProvider } from "./store/sort-context";
import { StatusContextProvider } from "./store/status-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SuggestionsContextProvider>
    <TagsContextProvider>
      <SortContextProvider>
        <StatusContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StatusContextProvider>
      </SortContextProvider>
    </TagsContextProvider>
  </SuggestionsContextProvider>
);
