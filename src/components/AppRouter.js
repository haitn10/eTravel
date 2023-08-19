import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./common/Layout";
import HomePage from "./home";
import Login from "./login";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "./auth/action";

const AppRouter = () => {
  const state = useSelector((state) => state.auth);
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(getProfile());
    }
    setIsFetching(false);
    fetchData();
  }, [dispatch]);

  console.log(state);

  if (isFetching) {
    return <div />;
  }

  if (!state.profile) {
    return (
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Navigate to="/cms" />} />
            <Route path="/cms" element={<Login />} exact />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

  if (state.profile.roleName === "TourOperator") {
    return (
      <div className="app">
        <BrowserRouter basename="/cms">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/*" element={<Navigate to="/home-page" />} />
              <Route path="/home-page" element={<HomePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else if (state.profile.roleName === "Administrator") {
    return (
      <div className="app">
        <BrowserRouter basename="/cms">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/*" element={<Navigate to="/home-page" />} />
              <Route path="/home-page" element={<HomePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else {
    return (
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Navigate to="/cms" />} />
            <Route path="/cms" element={<Login />} exact />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
};

export default AppRouter;
