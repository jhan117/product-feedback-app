import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SuggestionsContextProvider } from "./store/suggestions-context";
import { Provider } from "react-redux";
import store from "./store";
import { fetchData } from "./store/suggestions-thunks";

store.dispatch(fetchData());

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <SuggestionsContextProvider>
        <App />
      </SuggestionsContextProvider>
    </Provider>
  </BrowserRouter>
);
