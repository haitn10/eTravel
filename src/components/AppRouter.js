import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline } from "@mui/material";

import { getProfile } from "./auth/action";

import Login from "./login";
import Layout from "./common/Layout";
import HomePage from "./home";
import Profile from "./auth";
import ManageTours from "./tours";
import ManagePlaces from "./places";
import TransactionsPage from "./transactions";
import TransactionDetails from "./transactions/details";
import TourDetails from "./tours/details";
import CreateNewTour from "./tours/create";

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

  if (isFetching) {
    return <div />;
  }

  if (!state.profile) {
    return (
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Navigate to="/" />} />
            <Route path="/" element={<Login />} exact />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

  if (state.profile.roleName === "TourOperator") {
    return (
      <div className="app">
        <BrowserRouter>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/*" element={<Navigate to="/home" />} exact />
              <Route path="/home" element={<HomePage />} />
              <Route path="/tours" element={<ManageTours />} />
              <Route path="/tours/details" element={<TourDetails />} />
              <Route path="/tours/create" element={<CreateNewTour />} />
              <Route path="/places/" element={<ManagePlaces />} />
              <Route path="/places/add" element={<ManagePlaces />} />
              <Route path="/places/import" element={<ManagePlaces />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route
                path="/transactions/details"
                element={<TransactionDetails />}
              />
              <Route path="/settings" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else if (state.profile.roleName === "Administrator") {
    return (
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/*" element={<Navigate to="/home-page" />} exact />
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
            <Route path="/*" element={<Navigate to="/" />} />
            <Route path="/" element={<Login />} exact />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
};

export default AppRouter;
