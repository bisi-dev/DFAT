import ReactDOM from "react-dom";
import { DAppProvider } from "@usedapp/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Dashboard from "./Dashboard";

ReactDOM.render(
  <BrowserRouter>
    <DAppProvider config={{}}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </DAppProvider>
  </BrowserRouter >,
  document.getElementById("root")
);