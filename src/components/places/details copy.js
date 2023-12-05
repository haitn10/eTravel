import React, { useEffect, useState } from "react";
import {
  Box,
  Backdrop,
  Button,
  CircularProgress,
  Skeleton,
  Tab,
  useTheme,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useLocation } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

import Header from "../common/Header";
import ErrorModal from "../common/ErrorModal";
import GeneralInfo from "./others/details/GeneralInfo";
import MultiLanguages from "./others/details/MultiLanguages";
import Feedback from "./others/details/Feedback";
import BeaconSub from "./others/details/BeaconSub";

import { getAllLanguages, getLanguages } from "../languages/action";
import { getPlaceDetails, updatePlace } from "./action";

const PlaceDetails = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { placeId } = state;

  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  const [showPopup, setShowPopup] = useState(false);
  const [showPopupLang, setShowPopupLang] = useState(false);
  const [showPopupNewLang, setShowPopupNewLang] = useState(false);

  const [values, setValues] = useState({});
  const [data, setData] = useState({});
  const [number, setNumber] = useState("1");
  const [languagesList, setLanguagesList] = useState([]);



  const [notification, setNotification] = useState({
    errorState: false,
    errorMessage: "",
    status: "error",
  });

  const {
    getValues,
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { fields, remove } = useFieldArray({
    control,
    name: "placeDescriptions",
  });

  useEffect(() => {
    setLoading(true);
    async function getInfo() {
      try {
        const data = await getPlaceDetails(placeId);
        setValues(data);
        reset(data);
        const response = await dispatch(getAllLanguages());
        setLanguagesList(response.languages);
        setLoading(false);
      } catch (error) {
        setNotification({
          ...notification,
          errorState: true,
          errorMessage: "Can't get data details for place!",
          status: "error",
        });
        setLoading(false);
      }
    }
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeId]);

  useEffect(() => {
    reset(values);
    setData(values);
  }, [reset, values, showPopupLang, showPopup]);

  const handleTabs = (event, newValue) => {
    setNumber(newValue);
  };

  const filterLanguage = languagesList.filter(
    (desc) =>
      !values.tourDescriptions.some(
        (lang) => lang.languageCode === desc.languageCode
      )
  );


  const mergeData = () => {
    let arrCate = [],
      arrDesc = [],
      arrImgs = [],
      arrBeac = [];

    for (const cate of getValues("placeCategories")) {
      arrCate.push({ id: cate.id });
    }
    for (const desc of getValues("placeDescriptions")) {
      arrDesc.push({
        languageCode: desc.languageCode,
        voiceFile: desc.voiceFile,
        name: desc.name,
        description: desc.description,
      });
    }
    for (const beacon of getValues("placeItems")) {
      arrBeac.push({
        name: beacon.name,
        beaconId: beacon.beaconId,
        image: beacon.image,
        startTime: dayjs(beacon.startTime).isValid()
          ? dayjs(beacon.startTime).format("HH:mm:ss")
          : beacon.startTime,
        endTime: dayjs(beacon.endTime).isValid()
          ? dayjs(beacon.endTime).format("HH:mm:ss")
          : beacon.endTime,
        beaconMajorNumber: beacon.beaconMajorNumber,
        beaconMinorNumber: beacon.beaconMinorNumber,
        itemDescriptions: beacon.itemDescriptions,
      });
    }
    for (const img of values.placeImages) {
      arrImgs.push({
        image: img.image,
        isPrimary: img.isPrimary,
      });
    }

    const data = {
      address: values.address,
      name: values.name,
      longitude: values.longitude,
      latitude: values.latitude,
      googlePlaceId: values.googlePlaceId,
      entryTicket: values.entryTicket,
      price: values.price,
      hour: dayjs(values.hour).isValid()
        ? dayjs(values.hour).format("HH:mm:ss")
        : values.hour,
      placeCategories: arrCate,
      placeDescriptions: arrDesc,
      placeImages: arrImgs,
      placeTimes: values.placeTimes,
      placeItems: arrBeac,
    };

    return data;
  };


  const onSubmit = async () => {
    try {
      setUpdate(true);
      const values = mergeData();

      const res = await updatePlace(placeId, values);
      if (res) {
        reset(res.place);
        setValues(res.place);
        setNotification({
          ...notification,
          errorState: true,
          errorMessage: "Update Place Successfully!",
          status: "success",
        });
        setUpdate(false);
      }
    } catch (e) {
      setNotification({
        ...notification,
        errorState: true,
        errorMessage: "Update failed!",
        status: "error",
      });
      setUpdate(false);
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
        title="Info"
        message={notification.errorMessage}
        status={notification.status}
      />

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={process}
      >
        <CircularProgress color="error" />
      </Backdrop>

      <Header
        title={"Place Details"}
        subTitle={"Manage all information of place and update place."}
        loading={loading}
        showBack={true}
      />

      <Box marginTop={3} marginX={7}>
        <TabContext value={number}>
          {!loading ? (
            <Box
              sx={{
                borderBottom: 1,
                borderTop: 1,
                borderColor: "divider",
              }}
            >
              <TabList onChange={handleTabs} aria-label="lab API tabs example">
                <Tab label="General" value="1" />
                <Tab label="Languages" value="2" />
                <Tab label="Beacons" value="3" />
                <Tab label="Feedback" value="4" />
              </TabList>
            </Box>
          ) : (
            <Skeleton width="100%" height={75} />
          )}
          <TabPanel value="1">
            <form onSubmit={handleSubmit(onSubmit)}>
              {!loading ? (
                <>
                  <GeneralInfo
                    process={process}
                    values={values}
                    setValues={setValues}
                    control={control}
                    register={register}
                    getValues={getValues}
                    errors={errors}
                  />

                  <Box
                    sx={{
                      marginTop: 5,
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                      marginRight: 3,
                    }}
                  >
                    <Button
                      type="submit"
                      color="error"
                      disabled={process}
                      variant="contained"
                      sx={{ borderRadius: 2.5 }}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </>
              ) : (
                <Skeleton width="100%" height={75} />
              )}
            </form>
          </TabPanel>

          <TabPanel value="2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <MultiLanguages
                language={languagesList}
                loading={loading}
                control={control}
                register={register}
                resetField={resetField}
                errors={errors}
                getValues={getValues}
              />
              <Box
                sx={{
                  marginTop: 5,
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  marginRight: 3,
                }}
              >
                <Button
                  type="submit"
                  color="error"
                  disabled={process}
                  variant="contained"
                  sx={{ borderRadius: 2.5 }}
                >
                  Save Changes
                </Button>
              </Box>
            </form>
          </TabPanel>

          <TabPanel value="3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <BeaconSub
                language={languagesList}
                loading={loading}
                control={control}
                register={register}
                errors={errors}
                getValues={getValues}
              />
              <Box
                sx={{
                  marginTop: 5,
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  marginRight: 3,
                }}
              >
                <Button
                  type="submit"
                  color="error"
                  disabled={process}
                  variant="contained"
                  sx={{ borderRadius: 2.5 }}
                >
                  Save Changes
                </Button>
              </Box>
            </form>
          </TabPanel>

          <TabPanel value="4">
            <Feedback
              id={placeId}
              notification={notification}
              setNotification={setNotification}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default PlaceDetails;
