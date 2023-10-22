import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Rating,
  Tab,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment/moment";

import SubsLanguage from "../common/SubsLanguage";
import PlacesList from "../common/PlacesList";
import Header from "../common/Header";

import { labels } from "../../constants/rating";
import { getTourDetails, updateTour } from "./action";
import { getPlaces } from "../places/action";

import { CloudCheckFill } from "styled-icons/bootstrap";
import { CloudUploadOutline } from "styled-icons/evaicons-outline";
import ErrorModal from "../common/ErrorModal";

const TourDetails = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { tourId } = state;
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState("1");

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
  useEffect(() => {
    async function getInfoDetails() {
      try {
        const data = await getTourDetails(tourId);
        setValues(data);
      } catch (error) {
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
  }, [pageModelState.page, pageModelState.pageSize]);

  const handleChange = (event, newValue) => {
    setNumber(newValue);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(!loading);
    let data = {
      name: values.name,
      image: values.image,
      total: values.total,
      tourDetails: [],
      tourDescriptions: [],
    };
    for (const place of values.tourDetails) {
      data.tourDetails.push({ id: place.id, price: place.price });
    }

    for (const language of values.tourDescriptions) {
      data.tourDescriptions.push({
        languageCode: language.languageCode.trim(),
        name: language.name,
        description: language.description,
      });
    }

    try {
      const res = await updateTour(tourId, data);
      if (res) {
        setNotification({
          ...notification,
          errorState: true,
          errorMessage: "Updated successfully!",
          status: "success",
        });
      }
      setLoading(loading);
    } catch (e) {
      const message = e.response.data
        ? e.response.data.errors
        : "Something went wrong!";
      setNotification({
        ...notification,
        errorState: true,
        errorMessage: message,
        status: "error",
      });
      setLoading(loading);
    }
  };

  return (
    <Box
      minHeight="95vh"
      margin="1.25em"
      padding={2}
      paddingBottom={10}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
    >
      <ErrorModal
        open={notification.errorState}
        setOpen={setNotification}
        message={notification.errorMessage}
        status={notification.status}
      />

      <Header
        title={"Tour Details"}
        subTitle={"Manage all information of tour and update tour."}
        showBack={true}
        showSearch={false}
        showFilter={false}
        buttonAdd={false}
      />

      <Box marginTop={3}>
        <TabContext value={number}>
          <Box
            sx={{
              paddingLeft: 4,
              borderBottom: 1,
              borderTop: 1,
              marginBottom: 2,
              borderColor: "divider",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="General" value="1" />
              <Tab label="Languages" value="2" />
              <Tab label="Places List" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <form
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 30,
              }}
              onSubmit={onSubmit}
            >
              <Grid container width="80%" display="flex" rowGap={5}>
                {/* Images */}
                <Grid item xs={4}>
                  <Typography fontWeight="medium">Picture</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Box
                    display="flex"
                    alignItems="center"
                    position="relative"
                    overflow="hidden"
                    border={1}
                    borderRadius={2.5}
                    borderColor={alpha(theme.palette.text.primary, 0.28)}
                    height={40}
                  >
                    <label
                      htmlFor="image"
                      style={{
                        display: "flex",
                        width: "100%",
                        color: theme.palette.text.third,
                        cursor: "pointer",
                      }}
                    >
                      {values.image ? (
                        <Box display="flex" alignItems="center">
                          <CloudCheckFill
                            height={24}
                            color={theme.palette.text.onStatus}
                            style={{ margin: 10 }}
                          />
                          <Typography noWrap>
                            {values.image.name
                              ? values.image.name
                              : "Change Picture"}
                          </Typography>
                        </Box>
                      ) : (
                        <Box display="flex" alignItems="center">
                          <CloudUploadOutline
                            height={24}
                            style={{ margin: 10 }}
                          />
                          <Typography noWrap>
                            Import picture for tour here
                          </Typography>
                        </Box>
                      )}

                      <input
                        id="image"
                        style={{
                          opacity: 0,
                          position: "absolute",
                        }}
                        onChange={(e) =>
                          setValues({ ...values, image: e.target.files[0] })
                        }
                        type="file"
                        accept="image/*"
                      />
                    </label>
                  </Box>
                  <Box marginTop={2}>
                    <img
                      src={
                        values?.image && values?.image instanceof File
                          ? URL.createObjectURL(values?.image)
                          : values?.image
                      }
                      style={{
                        maxWidth: "100%",
                        maxHeight: 300,
                      }}
                      alt=""
                    />
                  </Box>
                </Grid>

                {/* Rating */}
                <Grid item xs={4}>
                  <Typography fontWeight="medium">Rate</Typography>
                </Grid>
                <Grid item xs={8} display="flex" alignItems="center">
                  <Rating
                    readOnly
                    value={values.rate || 0}
                    precision={0.5}
                    sx={{
                      ".MuiRating-icon": {
                        borderColor: theme.palette.text.active,
                      },
                      "& .MuiRating-iconFilled": {
                        color: theme.palette.text.active,
                      },
                    }}
                  />
                  <Box sx={{ marginX: 1 }}>{labels[values.rate || 0]}</Box>
                  <Typography>(5 rates)</Typography>
                </Grid>

                {/* Time */}
                <Grid item xs={4}>
                  <Typography fontWeight="medium">
                    Create/Update Time
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography fontWeight="regular">
                    {moment(values?.createTime).format("MMMM DD, YYYY")} /{" "}
                    {values?.updateTime
                      ? moment(values?.updateTime).format("MMMM DD, YYYY")
                      : " (No data)"}
                  </Typography>
                </Grid>

                {/* Status */}
                <Grid item xs={4}>
                  <Typography fontWeight="medium">Status</Typography>
                </Grid>
                <Grid item xs={8}>
                  {values?.status ? (
                    <Typography
                      fontWeight="semiBold"
                      color={theme.palette.text.onStatus}
                    >
                      Active
                    </Typography>
                  ) : (
                    <Typography
                      fontWeight="semiBold"
                      color={theme.palette.text.active}
                    >
                      Inactive
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Button
                variant="contained"
                disabled={loading}
                color="error"
                sx={{
                  marginTop: "30px",
                  borderRadius: "50px",
                  width: "250px",
                  height: "45px",
                }}
                type="submit"
              >
                {loading ? (
                  <CircularProgress color="error" size={25} />
                ) : (
                  <Typography fontWeight="semiBold" fontSize={18}>
                    Save Change
                  </Typography>
                )}
              </Button>
            </form>
          </TabPanel>
          <TabPanel value="2">
            <form
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 30,
              }}
              onSubmit={onSubmit}
            >
              <SubsLanguage
                item={"Tour"}
                values={values}
                setValues={setValues}
              />
              <Button
                variant="contained"
                disabled={loading}
                color="error"
                sx={{
                  marginTop: "30px",
                  borderRadius: "50px",
                  width: "250px",
                  height: "45px",
                }}
                type="submit"
              >
                {loading ? (
                  <CircularProgress color="error" size={25} />
                ) : (
                  <Typography fontWeight="semiBold" fontSize={18}>
                    Save Change
                  </Typography>
                )}
              </Button>
            </form>
          </TabPanel>
          <TabPanel value="3">
            <form
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 30,
              }}
              onSubmit={onSubmit}
            >
              <PlacesList
                values={values}
                setValues={setValues}
                pageState={pageState}
                setPageState={setPageState}
                pageModelState={pageModelState}
                setPageModelState={setPageModelState}
                notification={notification}
                setNotification={setNotification}
              />
              <Button
                variant="contained"
                disabled={loading}
                color="error"
                sx={{
                  marginTop: "30px",
                  borderRadius: "50px",
                  width: "250px",
                  height: "45px",
                }}
                type="submit"
              >
                {loading ? (
                  <CircularProgress color="error" size={25} />
                ) : (
                  <Typography fontWeight="semiBold" fontSize={18}>
                    Save Change
                  </Typography>
                )}
              </Button>
            </form>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default TourDetails;
