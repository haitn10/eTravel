import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  Skeleton,
  Tab,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import Header from "../common/Header";
import ErrorModal from "../common/ErrorModal";

import { getPlaceDetails, updatePlace } from "./action";
import { Save } from "@styled-icons/boxicons-regular";
import GeneralInfo from "./others/details/GeneralInfo";
import MultiLanguages from "./others/details/MultiLanguages";

const PlaceDetails = () => {
  const theme = useTheme();
  const { state } = useLocation();
  const { placeId } = state;

  const [values, setValues] = useState({});

  const [loading, setLoading] = useState(true);
  const [process, setProcess] = useState(false);

  const [number, setNumber] = useState("1");

  const [notification, setNotification] = useState({
    errorState: false,
    errorMessage: "",
    status: "error",
  });

  const { handleSubmit, register, reset, formState } = useForm();
  const { errors } = formState;

  useEffect(() => {
    setLoading(true);
    async function getInfo() {
      try {
        const data = await getPlaceDetails(placeId);
        setValues(data);
        reset(data);
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

  const handleTabs = (event, newValue) => {
    setNumber(newValue);
  };

  const onSubmit = async () => {
    // setProcess(true);
    let arrCates = [],
      arrDescs = [],
      arrImgs = [];

    for (const categories of values.placeCategories) {
      arrCates.push({ id: categories.id });
    }
    for (const desc of values.placeDescriptions) {
      if (desc.name && desc.voiceFile && desc.description) {
        arrDescs.push({
          languageCode: desc.languageCode.trim(),
          voiceFile: desc.voiceFile,
          name: desc.name,
          description: desc.description,
        });
      }
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
      hour: values.hour,
      placeCategories: arrCates,
      placeDescriptions: arrDescs,
      placeImages: arrImgs,
      placeTimes: values.placeTimes,
    };

    console.log(data);

    try {
      const res = await updatePlace(placeId, data);
      if (res) {
        setValues(res.place);
        setNotification({
          ...notification,
          errorState: true,
          errorMessage: "Update Place Successfully!",
          status: "success",
        });
        setProcess(false);
      }
    } catch (e) {
      setNotification({
        ...notification,
        errorState: true,
        errorMessage: "Update failed!",
        status: "error",
      });
      setProcess(false);
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

      {/* Title */}

      <Header
        title={"Place Details"}
        subTitle={"Manage all information of place and update place."}
        loading={loading}
        showBack={true}
        showSearch={false}
        showFilter={false}
        buttonAdd={false}
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
                    values={values}
                    setValues={setValues}
                    register={register}
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
                      variant="contained"
                      sx={{ borderRadius: 5, paddingY: 1, paddingX: 2 }}
                    >
                      <Save width={20} />
                      <Typography marginLeft={1} fontSize={16}>
                        Save Changes
                      </Typography>
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
                values={values}
                setValues={setValues}
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
                  variant="contained"
                  sx={{ borderRadius: 5, paddingY: 1, paddingX: 2 }}
                >
                  <Save width={20} />
                  <Typography marginLeft={1} fontSize={16}>
                    Save Changes
                  </Typography>
                </Button>
              </Box>
            </form>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default PlaceDetails;
