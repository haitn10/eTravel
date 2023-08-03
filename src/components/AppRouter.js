import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./common/Layout";
import Login from "./login";

const AppRouter = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
