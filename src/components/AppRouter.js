import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./common/Layout";
import HomePage from "./home";

const AppRouter = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
