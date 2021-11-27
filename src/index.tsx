import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DAppProvider } from "@usedapp/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";

ReactDOM.render(
  <BrowserRouter>
    <DAppProvider config={{}}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<App />} />
      </Routes>
    </DAppProvider>

  </BrowserRouter >,
  document.getElementById("root")
);