import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalState from "./Context/Globalstate";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailsPage from "./Components/Details/Details";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalState>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:country" element={<DetailsPage />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </GlobalState>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
