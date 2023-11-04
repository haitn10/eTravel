import React, { useEffect, useMemo, useState } from "react";
import {
  Autocomplete,
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  FormHelperText,
  Grid,
  ImageList,
  ImageListItem,
  FormControl,
  Select,
  MenuItem,
  Rating,
  Skeleton,
  Tab,
  TextField,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { LocalizationProvider, TimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReactPlayer from "react-player";
import moment from "moment";
import dayjs from "dayjs";

import Header from "../common/Header";
import { NumericFormatCustom } from "../common/NumericFormatCustom";
import { NumberFormat } from "../common/NumberFormat";
import ErrorModal from "../common/ErrorModal";
import { labels } from "../../constants/rating";
import date from "../../constants/date";

import { getPlaceDetails, updatePlace } from "./action";
import { getCategoriesAll } from "../categories/action";

import { ImageAdd } from "@styled-icons/remix-line/ImageAdd";
import { Voiceprint } from "@styled-icons/remix-fill";
import { Add, Remove } from "styled-icons/material";

const PlaceDetails = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { placeId } = state;
  const [loading, setLoading] = useState(false);
  const [process, setProcess] = useState(false);
  const [imagesList, setImagesList] = useState([]);
  const [values, setValues] = useState({});
  const [categoriesList, setCategoriesList] = useState([]);
  const [number, setNumber] = useState("1");

  const center = useMemo(() => ({ lat: 10.8231, lng: 106.6297 }), []);
  const [marker, setMarker] = useState(null);
  const GOOGLE_MAPS_API_KEY = "AIzaSyBhPFCxbEZfyl7PetEVfcmL1vL8SG_lM8U";

  const [notification, setNotification] = useState({
    errorState: false,
    errorMessage: "",
    status: "error",
  });
  const form = useForm({
    defaultValues: [],
  });
  const { handleSubmit, setError, clearErrors, register, formState } = form;
  const { errors } = formState;

  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  //   // libraries: ["places"],
  // });

  useEffect(() => {
    async function getInfoDetails() {
      setLoading(true);
      try {
        const data = await getPlaceDetails(placeId);
        setValues(data);
        setImagesList(data.placeImages);
        const response = await dispatch(getCategoriesAll());
        setCategoriesList(response.categories);
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
    getInfoDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeId]);

  const handleTabs = (event, newValue) => {
    setNumber(newValue);
  };

  const handleChangeCategories = (e, value) => {
    setValues({ ...values, placeCategories: value });
  };

  const handleChangeImage = (event) => {
    const selectedImageFiles = Array.from(event.target.files);
    const imagesArray = selectedImageFiles.map((file) => {
      return { image: URL.createObjectURL(file), isPrimary: false };
    });

    setImagesList((prevImages) => prevImages.concat(imagesArray));
  };

  const handleChange = (index, event) => {
    const data = [...values.placeDescriptions];
    if (!event.target.files) {
      data[index][event.target.name] = event.target.value;
    } else {
      data[index][event.target.name] = event.target.files[0];
    }
    setValues({ ...values, placeDescriptions: data });
  };

  const handleChangeDay = (index, event) => {
    const dataTime = [...values.placeTimes];
    dataTime[index][event.target.name] = event.target.value;
    setValues({ ...values, placeTimes: dataTime });
  };

  const handleChangeTime = (index, name, value) => {
    const dataTime = [...values.placeTimes];
    dataTime[index][name] = dayjs(value).format("HH:mm:ss");
    setValues({ ...values, placeTimes: dataTime });
  };

  const handleNewTime = () => {
    const dataTime = [...values.placeTimes];
    if (dataTime.length < date.length) {
      dataTime.push({
        daysOfWeek: 1,
        openTime: "01:00:00",
        endTime: "01:00:00",
      });
      setValues({ ...values, placeTimes: dataTime });
    }
  };

  const handleRemoveTime = (index) => {
    const value = [...values.placeTimes];
    value.splice(index, 1);
    setValues({ ...values, placeTimes: value });
  };
  console.log(values);

  const onSubmit = async () => {
    setProcess(true);
    let arrCate = [],
      arrDesc = [];

    for (const categories of values.placeCategories) {
      arrCate.push({ id: categories.id });
    }
    for (const desc of values.placeDescriptions) {
      if (desc.placeName && desc.voiceFile && desc.description) {
        arrDesc.push({
          languageCode: desc.languageCode,
          voiceFile: desc.voiceFile,
          name: desc.placeName,
          description: desc.description,
        });
      }
    }
    const data = {
      ...values,
      hour: dayjs(values.hour).format("HH:mm:ss"),
      placeCategories: arrCate,
      placeDescriptions: arrDesc,
    };

    console.log(data);

    try {
      await dispatch(updatePlace(placeId, data));
      setNotification({
        ...notification,
        errorState: true,
        errorMessage: "Update Place Successfully!",
        status: "success",
      });
      setProcess(false);
    } catch (e) {
      console.log(e);
      const message = e.response.data ? e.response.data.message : e.message;
      setNotification({
        ...notification,
        errorState: true,
        errorMessage: message,
        status: "error",
      });
      setProcess(false);
    }
  };
  // if (!isLoaded) return <></>;
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
            <Grid container>
              <Grid item md={6}>
                <Box>
                  <Box marginBottom={1}>
                    {!loading ? (
                      <Typography
                        fontSize={14}
                        letterSpacing={0.5}
                        fontWeight="medium"
                        textTransform="uppercase"
                        color={theme.palette.text.third}
                      >
                        General Information
                      </Typography>
                    ) : (
                      <Skeleton width={150} />
                    )}
                  </Box>

                  <Box padding={2}>
                    {!loading ? (
                      <Box display="flex" alignItems="center" marginBottom={3}>
                        <Typography
                          fontWeight="medium"
                          id="placeName"
                          width={150}
                        >
                          Place Name{" "}
                          <small style={{ color: theme.palette.text.active }}>
                            *
                          </small>
                        </Typography>
                        <TextField
                          fullWidth
                          size="small"
                          InputProps={{
                            style: {
                              borderRadius: 10,
                            },
                          }}
                          value={values.name}
                          {...register("placeName", {
                            required: "Place Name is required!",
                            onChange: (e) =>
                              setValues({ ...values, name: e.target.value }),
                          })}
                          error={!!errors.placeName}
                          helperText={errors.placeName?.message}
                          placeholder={`Type place name here`}
                        />
                      </Box>
                    ) : (
                      <Skeleton width="100%" height={60} />
                    )}

                    {!loading ? (
                      <Box display="flex" alignItems="center" marginBottom={3}>
                        <Typography
                          fontWeight="medium"
                          id="placeName"
                          width={150}
                        >
                          Address{" "}
                          <small style={{ color: theme.palette.text.active }}>
                            *
                          </small>
                        </Typography>
                        <TextField
                          fullWidth
                          size="small"
                          InputProps={{
                            style: {
                              borderRadius: 10,
                            },
                          }}
                          value={values.address}
                          {...register("address", {
                            required: "Place Address is required!",
                            onChange: (e) =>
                              setValues({
                                ...values,
                                address: e.target.value,
                              }),
                          })}
                          error={!!errors.address}
                          helperText={errors.address?.message}
                          placeholder={`Type place name here`}
                        />
                      </Box>
                    ) : (
                      <Skeleton width="100%" height={60} />
                    )}

                    {!loading ? (
                      <Box display="flex" alignItems="center" marginBottom={3}>
                        <Typography
                          fontWeight="medium"
                          id="placeName"
                          width={150}
                        >
                          Category{" "}
                          <small style={{ color: theme.palette.text.active }}>
                            *
                          </small>
                        </Typography>
                        <Autocomplete
                          fullWidth
                          multiple
                          size="small"
                          value={values.placeCategories}
                          options={categoriesList}
                          getOptionLabel={(option) => option?.name}
                          filterSelectedOptions
                          sx={{
                            ".MuiOutlinedInput-root": {
                              borderRadius: 2.5,
                            },
                          }}
                          onChange={handleChangeCategories}
                          placeholder="Select one or more categories"
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Box>
                    ) : (
                      <Skeleton width="100%" height={60} />
                    )}

                    {!loading ? (
                      <Box display="flex" alignItems="center" marginBottom={3}>
                        <Typography
                          fontWeight="medium"
                          id="placeName"
                          width={150}
                        >
                          Price{" "}
                          <small style={{ color: theme.palette.text.active }}>
                            *
                          </small>
                        </Typography>
                        <TextField
                          fullWidth
                          size="small"
                          InputProps={{
                            style: {
                              borderRadius: 10,
                            },
                            inputComponent: NumericFormatCustom,
                          }}
                          value={values.price}
                          {...register("price", {
                            required: "Price is required!",
                            onChange: (e) =>
                              setValues({ ...values, price: e.target.value }),
                          })}
                          error={!!errors.price}
                          helperText={errors.price?.message}
                          placeholder={`Type price here`}
                        />
                      </Box>
                    ) : (
                      <Skeleton width="100%" height={60} />
                    )}

                    {!loading ? (
                      <Box display="flex" alignItems="center" marginBottom={3}>
                        <Typography
                          fontWeight="medium"
                          id="placeName"
                          width={150}
                        >
                          Entry Ticket
                        </Typography>
                        <TextField
                          fullWidth
                          size="small"
                          InputProps={{
                            style: {
                              borderRadius: 10,
                            },
                            inputComponent: NumericFormatCustom,
                          }}
                          value={values.entryTicket}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              entryTicket: e.target.value,
                            })
                          }
                          placeholder={`Type entry ticket here`}
                        />
                      </Box>
                    ) : (
                      <Skeleton width="100%" height={60} />
                    )}

                    {!loading ? (
                      <Box display="flex" alignItems="center" marginBottom={3}>
                        <Typography
                          fontWeight="medium"
                          id="placeName"
                          width={150}
                        >
                          Duration
                        </Typography>
                        <TextField
                          fullWidth
                          size="small"
                          name="duration"
                          InputProps={{
                            style: {
                              borderRadius: 10,
                            },
                          }}
                          value={values.duration}
                          onChange={(e) =>
                            setValues({ ...values, duration: e.target.value })
                          }
                          placeholder={`Type duration here`}
                        />
                      </Box>
                    ) : (
                      <Skeleton width="100%" height={60} />
                    )}
                  </Box>

                  <Box marginTop={1}>
                    <Box
                      marginBottom={1}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      {!loading ? (
                        <Typography
                          fontSize={14}
                          letterSpacing={0.5}
                          fontWeight="medium"
                          textTransform="uppercase"
                          color={theme.palette.text.third}
                        >
                          Images List
                        </Typography>
                      ) : (
                        <Skeleton width={100} />
                      )}
                      <Box marginRight={1}>
                        {!loading ? (
                          <Button color="error" component="label">
                            <ImageAdd width={16} style={{ marginRight: 5 }} />
                            Add Images
                            <input
                              hidden
                              multiple
                              onChange={handleChangeImage}
                              type="file"
                              accept="image/*"
                            />
                          </Button>
                        ) : (
                          <Skeleton width={100} />
                        )}
                      </Box>
                    </Box>
                    <Box height={600}>
                      {!loading ? (
                        <ImageList
                          // variant="masonry"
                          cols={3}
                          gap={5}
                          sx={{ height: "100%" }}
                        >
                          {imagesList &&
                            imagesList.map((item) => (
                              <ImageListItem key={item.id}>
                                <img
                                  src={item.image}
                                  alt={item.id}
                                  loading="lazy"
                                  style={{
                                    borderRadius: 10,
                                    maxWidth: 165,
                                    maxHeight: 200,
                                  }}
                                />
                              </ImageListItem>
                            ))}
                        </ImageList>
                      ) : (
                        <Skeleton width="100%" height={300} />
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={1} />
              <Grid item md={5}>
                <Box marginTop={3}>
                  <Box marginLeft={2} marginBottom={1}>
                    {!loading ? (
                      <Typography
                        fontSize={14}
                        letterSpacing={0.5}
                        fontWeight="medium"
                        textTransform="uppercase"
                        color={theme.palette.text.third}
                      >
                        Other Information
                      </Typography>
                    ) : (
                      <Skeleton width={100} />
                    )}
                  </Box>

                  <Grid container padding={2} marginX={1} spacing={1}>
                    <Grid item xs={6} display="flex" alignItems="center">
                      {!loading ? (
                        <>
                          <Typography
                            fontSize={14}
                            fontWeight="medium"
                            color={theme.palette.text.third}
                          >
                            Status:
                          </Typography>

                          <Typography
                            fontSize={14}
                            fontWeight="bold"
                            marginLeft={1}
                            borderRadius={2.5}
                            color={
                              values.status
                                ? theme.palette.text.onStatus
                                : theme.palette.text.active
                            }
                          >
                            {values.status ? "Active" : "Inactive"}
                          </Typography>
                        </>
                      ) : (
                        <Skeleton width={150} />
                      )}
                    </Grid>

                    <Grid item xs={6} display="flex" alignItems="center">
                      {!loading ? (
                        <>
                          <Typography
                            fontSize={14}
                            fontWeight="medium"
                            color={theme.palette.text.third}
                          >
                            Rating:
                          </Typography>
                          <Box
                            display="flex"
                            alignItems="center"
                            marginLeft={1}
                          >
                            <Rating
                              readOnly
                              size="small"
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
                            <Typography marginLeft={1} fontSize={14}>
                              ({labels[values.rate || 0]})
                            </Typography>
                          </Box>
                        </>
                      ) : (
                        <Skeleton width={150} />
                      )}
                    </Grid>

                    <Grid item xs={6} display="flex" alignItems="center">
                      {!loading ? (
                        <>
                          <Typography
                            fontSize={14}
                            fontWeight="medium"
                            color={theme.palette.text.third}
                          >
                            Create Time:
                          </Typography>
                          <Typography
                            fontSize={14}
                            fontWeight="semiBold"
                            marginLeft={1}
                          >
                            {moment(values?.createTime).format("MMMM DD, YYYY")}
                          </Typography>
                        </>
                      ) : (
                        <Skeleton width={150} />
                      )}
                    </Grid>
                    <Grid item xs={6} display="flex" alignItems="center">
                      {!loading ? (
                        <>
                          <Typography
                            fontSize={14}
                            fontWeight="medium"
                            color={theme.palette.text.third}
                          >
                            Update Time:
                          </Typography>
                          <Typography
                            fontSize={14}
                            fontWeight="semiBold"
                            marginLeft={1}
                          >
                            {moment(values?.updateTime).format("MMMM DD, YYYY")}
                          </Typography>
                        </>
                      ) : (
                        <Skeleton width={150} />
                      )}
                    </Grid>
                  </Grid>
                </Box>

                <Box marginTop={3}>
                  <Box marginLeft={2} marginBottom={1}>
                    {!loading ? (
                      <Typography
                        fontSize={14}
                        letterSpacing={0.5}
                        fontWeight="medium"
                        textTransform="uppercase"
                        color={theme.palette.text.third}
                      >
                        Location in Maps
                      </Typography>
                    ) : (
                      <Skeleton width={150} />
                    )}
                  </Box>
                  {!loading ? (
                    <Box
                      border={1}
                      borderColor={theme.palette.background.third}
                      borderRadius={5}
                      padding={2}
                      height={400}
                    >
                      {/* <GoogleMap
                  zoom={11}
                  center={center}
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                >
                  {marker && <Marker position={marker} />}
                </GoogleMap> */}
                    </Box>
                  ) : (
                    <Skeleton width="100%" />
                  )}
                  {!loading ? (
                    <Box display="flex" alignItems="center" marginTop={2}>
                      <Typography fontWeight="medium" width={200}>
                        Longitude
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        name="latitude"
                        InputProps={{
                          style: {
                            borderRadius: 10,
                          },
                          inputComponent: NumberFormat,
                        }}
                        value={values.longitude}
                        {...register("longitude", {
                          required: "Longitude is required!",
                          onChange: (e) =>
                            setValues({ ...values, longitude: e.target.value }),
                        })}
                        error={!!errors.longitude}
                        helperText={errors.longitude?.message}
                        placeholder={`Type longitude here`}
                      />
                    </Box>
                  ) : (
                    <Skeleton width="100%" height={60} />
                  )}

                  {!loading ? (
                    <Box display="flex" alignItems="center" marginTop={2}>
                      <Typography fontWeight="medium" width={200}>
                        Latitude
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        InputProps={{
                          style: {
                            borderRadius: 10,
                          },
                          inputComponent: NumberFormat,
                        }}
                        value={values.latitude}
                        {...register("latitude", {
                          required: "Latitude is required!",
                          onChange: (e) =>
                            setValues({ ...values, latitude: e.target.value }),
                        })}
                        error={!!errors.latitude}
                        helperText={errors.latitude?.message}
                        placeholder={`Type latitude here`}
                      />
                    </Box>
                  ) : (
                    <Skeleton width="100%" height={60} />
                  )}
                  {!loading ? (
                    <Box display="flex" alignItems="center" marginTop={2}>
                      <Typography fontWeight="medium" width={200}>
                        Google Place ID
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        InputProps={{
                          style: {
                            borderRadius: 10,
                          },
                        }}
                        value={values.googlePlaceId}
                        {...register("googlePlaceId", {
                          required: "Google Place ID is required!",
                          onChange: (e) =>
                            setValues({
                              ...values,
                              googlePlaceId: e.target.value,
                            }),
                        })}
                        error={!!errors.googlePlaceId}
                        helperText={errors.googlePlaceId?.message}
                        placeholder={`Type Google Place ID here`}
                      />
                    </Box>
                  ) : (
                    <Skeleton width="100% " height={60} />
                  )}
                </Box>

                <Box marginY={3}>
                  {!loading ? (
                    <Box marginLeft={3}>
                      <Typography
                        fontSize={14}
                        letterSpacing={0.5}
                        fontWeight="medium"
                        textTransform="uppercase"
                        color={theme.palette.text.third}
                      >
                        Days Of Week
                      </Typography>
                    </Box>
                  ) : (
                    <Skeleton width={100} />
                  )}
                  {!loading ? (
                    <Box marginTop={2}>
                      {values.placeTimes &&
                        values.placeTimes.map((data, index) => (
                          <Box
                            key={index}
                            display="flex"
                            alignItems="flex-start"
                            justifyContent="center"
                            gap={3}
                            marginY={1}
                          >
                            <FormControl fullWidth size="small">
                              <Select
                                sx={{ borderRadius: 2.5 }}
                                value={data.daysOfWeek}
                                name="daysOfWeek"
                                onChange={(event) =>
                                  handleChangeDay(index, event)
                                }
                              >
                                {date.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.time}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimeField
                                fullWidth
                                size="small"
                                name="openTime"
                                value={dayjs(data.openTime, {
                                  format: "HH:mm:ss",
                                }).format("hh:mm A")}
                                InputProps={{
                                  style: {
                                    borderRadius: 10,
                                  },
                                }}
                                onChange={(newValue) =>
                                  handleChangeTime(index, "openTime", newValue)
                                }
                                format="hh:mm a"
                              />
                              <TimeField
                                fullWidth
                                size="small"
                                name="endTime"
                                value={dayjs(data.endTime, {
                                  format: "HH:mm:ss",
                                }).format("hh:mm A")}
                                InputProps={{
                                  style: {
                                    borderRadius: 10,
                                  },
                                }}
                                onChange={(newValue, name) =>
                                  handleChangeTime(index, "endTime", newValue)
                                }
                                format="hh:mm a"
                              />
                            </LocalizationProvider>

                            <IconButton onClick={() => handleRemoveTime(index)}>
                              <Remove width={24} />
                            </IconButton>
                          </Box>
                        ))}

                      {values.placeTimes &&
                      values.placeTimes.length === date.length ? null : (
                        <Button onClick={handleNewTime} color="error">
                          <Add width={24} />
                          Add date times
                        </Button>
                      )}
                    </Box>
                  ) : (
                    <>
                      <Skeleton width="100%" />
                      <Skeleton width="100%" />
                      <Skeleton width="100%" />
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
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
              {values.placeDescriptions &&
                values.placeDescriptions.map((language, index) => (
                  <Box key={index} width="100%" marginTop={1}>
                    <Box display="flex" alignItems="center" gap={2}>
                      {/* <img
                        src={language.icon}
                        alt={language.name}
                        style={{ width: 30, border: "1px solid #ccc" }}
                      /> */}
                      <Typography fontWeight="bold" variant="h5">
                        {language.name}
                      </Typography>
                    </Box>
                    <Box paddingTop={2} paddingX={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                          <Typography fontWeight="medium">
                            Place Name
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={9}>
                          <TextField
                            fullWidth
                            size="small"
                            name="name"
                            InputProps={{
                              style: {
                                borderRadius: 10,
                              },
                            }}
                            value={language.name ? language.name : ""}
                            onChange={(event) => handleChange(index, event)}
                            placeholder={`Type name here`}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Typography fontWeight="medium">
                            Decription
                          </Typography>
                          <Typography>
                            <small>Write a short decription</small>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={9}>
                          <TextField
                            fullWidth
                            size="small"
                            name="description"
                            InputProps={{
                              style: {
                                borderRadius: 10,
                              },
                            }}
                            value={
                              language.description ? language.description : ""
                            }
                            onChange={(event) => handleChange(index, event)}
                            placeholder="Type description here"
                            multiline={true}
                            rows={10}
                          />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <Typography fontWeight="medium">
                            Voice File
                          </Typography>
                        </Grid>
                        <Grid item xs={9} md={6}>
                          <ReactPlayer
                            url={language.voiceFile}
                            controls={true}
                            height={40}
                            width="100%"
                          />
                        </Grid>
                        <Grid item xs={3} md={3}>
                          <Button
                            component="label"
                            variant="contained"
                            sx={{
                              marginLeft:2,
                              borderRadius: 2.5,
                              width:"85%",
                            }}
                          >
                            <Voiceprint width={16} style={{ marginRight: 5 }} />
                            <Typography noWrap>Change Voice File</Typography>
                            <input
                              hidden
                              multiple
                              name="voiceFile"
                              onChange={(event) => handleChange(index, event)}
                              type="file"
                              accept="audio/mpeg, audio/mp3"
                            />
                          </Button>

                          <FormHelperText
                            htmlFor="render-select"
                            style={{ marginLeft: 14 }}
                            error
                          ></FormHelperText>
                        </Grid>
                      </Grid>
                    </Box>
                    <Divider sx={{ marginY: 3 }} />
                  </Box>
                ))}
              {/* <Button
                variant="contained"
                disabled={!loading}
                color="error"
                sx={{
                  marginTop: "30px",
                  borderRadius: "50px",
                  width: "250px",
                  height: "45px",
                }}
                type="submit"
              >
                {!loading ? (
                  <CircularProgress color="error" size={25} />
                ) : (
                  <Typography fontWeight="semiBold" fontSize={18}>
                    Save Change
                  </Typography>
                )}
              </Button> */}
            </form>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default PlaceDetails;
