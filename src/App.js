import React, { useEffect } from "react";
import "./App.css";
import Analysis from "./components/analysis/analysis";
import { HashRouter, Route, Routes, useNavigate } from "react-router-dom";

const Redirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/analysis/new-chat");
  }, []);
  return "";
};
const App = () => {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="analysis/:id" element={<Analysis />} />
          <Route path="*" element={<Redirect />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
