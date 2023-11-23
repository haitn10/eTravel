import React, { useState, useEffect } from "react";
import {
  Box,
  Backdrop,
  CircularProgress,
  Skeleton,
  Tab,
  useTheme,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { getTourDetails, updateTour } from "./action";
import { getPlaces } from "../places/action";

import PlacesList from "./others/PlacesList";
import SubsLanguage from "./others/details/SubsLanguage";
import GeneralInfo from "./others/details/GeneralInfo";
import Header from "../common/Header";
import ErrorModal from "../common/ErrorModal";
import SubmitBtn from "../common/SubmitBtn";

const TourDetails = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { tourId } = state;

  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({});
  const [number, setNumber] = useState("1");
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("name");

  const [notification, setNotification] = useState({
    errorState: false,
    errorMessage: "",
    status: "error",
  });

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    totalCount: 0,
  });

  const [pageModelState, setPageModelState] = useState({
    page: 0,
    pageSize: 10,
  });

  const {
    handleSubmit,
    setError,
    clearErrors,
    register,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      image: "",
      tourDescriptions: [{ languageCode: "en-us", name: "", description: "" }],
    },
  });
  useEffect(() => {
    async function getInfoDetails() {
      setLoading(true);
      try {
        const data = await getTourDetails(tourId);
        reset(data);
        setValues(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setNotification({
          ...notification,
          errorState: true,
          errorMessage: "Can't get data details for tour!",
          status: "error",
        });
      }
    }
    getInfoDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourId]);

  useEffect(() => {
    async function fetchData() {
      try {
        setPageState((old) => ({
          ...old,
          isLoading: true,
        }));
        const data = await dispatch(
          getPlaces({
            PageNumber: pageModelState.page,
            PageSize: pageModelState.pageSize,
            SearchBy: searchBy,
            Search: search,
          })
        );
        setPageState((old) => ({
          ...old,
          isLoading: false,
          data: data.places.data,
          totalCount: data.places.totalCount,
        }));
      } catch (error) {
        setNotification({
          ...notification,
          errorState: true,
          errorMessage: "There was a problem loading data!",
          status: "error",
        });
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, searchBy, pageModelState.page, pageModelState.pageSize]);

  const handleChange = (event, newValue) => {
    setNumber(newValue);
  };

  const onSubmit = async () => {
    let data = {
      name: values.name,
      image: values.image,
      total: values.total,
      tourDetails: [],
      tourDescriptions: getValues("tourDescriptions"),
    };
    for (const place of values.tourDetails) {
      data.tourDetails.push({ id: place.id, price: place.price });
    }

    try {
      setUpdate(true);
      const res = await updateTour(tourId, data);
      if (res) {
        setNotification({
          ...notification,
          errorState: true,
          errorMessage: "Updated tour successfully!",
          status: "success",
        });
      }
      await setUpdate(false);
    } catch (e) {
      console.log(e);
      // const message = e.response.data
      //   ? e.response.data.errors
      //   : "Something went wrong!";
      setUpdate(false);
      setNotification({
        ...notification,
        errorState: true,
        errorMessage: "Something went wrong with processing!",
        status: "error",
      });
    }
  };

  return (
    <Box
      minHeight="94vh"
      margin="1.25em"
      padding={2}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
    >
      <ErrorModal
        open={notification.errorState}
        setOpen={setNotification}
        message={notification.errorMessage}
        status={notification.status}
      />

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={update}
      >
        <CircularProgress color="error" />
      </Backdrop>

      <Header
        title={"Tour Details"}
        subTitle={"Manage all information of tour and update tour."}
        loading={loading}
        showBack={true}
      />

      <Box marginX={6} padding={3}>
        <TabContext value={number}>
          {!loading ? (
            <Box
              sx={{
                borderBottom: 1,
                borderTop: 1,
                marginBottom: 2,
                borderColor: "divider",
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="General Informations" value="1" />
                <Tab label="Descriptions List" value="2" />
                <Tab label="Places List" value="3" />
              </TabList>
            </Box>
          ) : (
            <Skeleton width="100%" height={75} />
          )}
          <TabPanel value="1">
            <GeneralInfo
              values={values}
              setValues={setValues}
              loading={loading}
              update={update}
              register={register}
              errors={errors}
            />
            <Box
              sx={{
                marginTop: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!loading ? (
                <SubmitBtn update={update} onSubmit={handleSubmit(onSubmit)} />
              ) : (
                <Skeleton width={100} />
              )}
            </Box>
          </TabPanel>
          <TabPanel value="2" style={{ padding: 0 }}>
            <SubsLanguage
              loading={loading}
              control={control}
              register={register}
              errors={errors}
              getValues={getValues}
              notification={notification}
              setNotification={setNotification}
            />
            <Box
              sx={{
                marginTop: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!loading ? (
                <SubmitBtn update={update} onSubmit={handleSubmit(onSubmit)} />
              ) : (
                <Skeleton width={100} />
              )}
            </Box>
          </TabPanel>
          <TabPanel value="3">
            <PlacesList
              values={values}
              setValues={setValues}
              setSearch={setSearch}
              setSearchBy={setSearchBy}
              errors={errors}
              setError={setError}
              clearErrors={clearErrors}
              pageState={pageState}
              setPageState={setPageState}
              pageModelState={pageModelState}
              setPageModelState={setPageModelState}
              notification={notification}
              setNotification={setNotification}
            />
            <Box
              sx={{
                marginTop: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!loading ? (
                <SubmitBtn update={update} onSubmit={handleSubmit(onSubmit)} />
              ) : (
                <Skeleton width={100} />
              )}
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default TourDetails;
