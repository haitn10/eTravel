import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Rating,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCategoriesAll } from "../../../categories/action";
import { NumericFormatCustom } from "../../../common/NumericFormatCustom";
import { LocalizationProvider, TimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { ImageAdd } from "@styled-icons/remix-line/ImageAdd";
import { CloseOutline } from "@styled-icons/evaicons-outline";
import { labels } from "../../../../constants/rating";
import { NumberFormat } from "../../../common/NumberFormat";
import date from "../../../../constants/date";

const GeneralInfo = ({ values, setValues, register, errors }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [categoriesList, setCategoriesList] = useState([]);
  const [imagesList, setImagesList] = useState(values.placeImages || []);
  const [daysOfWeek, setDaysOfWeek] = useState(values.placeTimes || []);

  useEffect(() => {
    async function getInfo() {
      try {
        const catesList = await dispatch(getCategoriesAll());
        setCategoriesList(catesList.categories);
      } catch (error) {
        // setNotification({
        //   ...notification,
        //   errorState: true,
        //   errorMessage: "Can't get data details for place!",
        //   status: "error",
        // });
      }
    }
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeCategories = (e, value) => {
    setValues({ ...values, placeCategories: value });
  };

  const handleChangeImage = (event) => {
    const selectedImageFiles = Array.from(event.target.files);
    const imagesArray = selectedImageFiles.map((file) => {
      return { image: file, isPrimary: false };
    });

    setImagesList((prevImages) => prevImages.concat(imagesArray));
  };

  const removeImage = (index) => {
    const newImagesList = [...imagesList];
    if (!newImagesList[index].isPrimary === true) {
      newImagesList.splice(index, 1);
    }
    setImagesList(newImagesList);
  };

  const handleChangeTime = (index, event) => {
    const dataTime = [...daysOfWeek];
    dataTime[index][event.target.name] = event.target.value;
    setDaysOfWeek(dataTime);
  };

  const getTime = (id, time) => {
    const day = daysOfWeek.filter((day) => id === day.daysOfWeek);
    if (day.length !== 0) {
      return day[0][time];
    } else return;
  };

  const previewImage = (image) => {
    let fileTypes = [
      "image/apng",
      "image/avif",
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/webp",
    ];
    if (image instanceof File) {
      if (fileTypes.includes(image.type)) {
        return URL.createObjectURL(image);
      }
    }
    return image;
  };

  return (
    <Grid container spacing={5}>
      <Grid item md={12} lg={6}>
        <Box>
          <Box marginBottom={1}>
            <Typography
              fontSize={14}
              letterSpacing={0.5}
              fontWeight="medium"
              textTransform="uppercase"
              color={theme.palette.text.third}
            >
              General Information
            </Typography>
          </Box>

          <Box padding={2}>
            <Box display="flex" alignItems="center" marginBottom={3}>
              <Typography fontWeight="medium" width={150}>
                Place Name{" "}
                <small style={{ color: theme.palette.text.active }}>*</small>
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
                {...register("name", {
                  required: "Place Name is required!",
                  onChange: (e) =>
                    setValues({ ...values, name: e.target.value }),
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                placeholder={`Type place name here`}
              />
            </Box>

            <Box display="flex" alignItems="center" marginBottom={3}>
              <Typography fontWeight="medium" id="placeName" width={150}>
                Address{" "}
                <small style={{ color: theme.palette.text.active }}>*</small>
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

            <Box display="flex" alignItems="center" marginBottom={3}>
              <Typography fontWeight="medium" id="placeName" width={150}>
                Category{" "}
                <small style={{ color: theme.palette.text.active }}>*</small>
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

            <Box display="flex" alignItems="center" marginBottom={3}>
              <Typography fontWeight="medium" id="placeName" width={150}>
                Price{" "}
                <small style={{ color: theme.palette.text.active }}>*</small>
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

            <Box display="flex" alignItems="center" marginBottom={3}>
              <Typography fontWeight="medium" id="placeName" width={150}>
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

            <Box display="flex" alignItems="center" marginBottom={3}>
              <Typography fontWeight="medium" id="placeName" width={150}>
                Duration
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimeField
                  fullWidth
                  size="small"
                  value={dayjs("0000-00-00T" + values.hour)}
                  InputProps={{
                    style: {
                      borderRadius: 10,
                    },
                  }}
                  onChange={(newValue) =>
                    setValues({
                      ...values,
                      hour: dayjs(newValue).format("HH:mm:ss"),
                    })
                  }
                  format="HH:mm:ss"
                />
              </LocalizationProvider>
            </Box>
          </Box>

          <Box marginTop={1}>
            <Box
              marginBottom={1}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                fontSize={14}
                letterSpacing={0.5}
                fontWeight="medium"
                textTransform="uppercase"
                color={theme.palette.text.third}
              >
                Images List
              </Typography>

              <Box marginRight={1}>
                <Button color="error" component="label">
                  <input
                    hidden
                    multiple
                    onChange={handleChangeImage}
                    type="file"
                    accept="image/*"
                  />
                  <ImageAdd width={16} style={{ marginRight: 5 }} />
                  Add Images
                </Button>
              </Box>
            </Box>
            <Box maxHeight={600}>
              <ImageList
                // variant="masonry"
                cols={3}
                gap={5}
                sx={{ height: "100%" }}
              >
                {imagesList &&
                  imagesList.map((item, index) => (
                    <ImageListItem key={index}>
                      <IconButton
                        style={{
                          position: "absolute",
                          right: 3,
                          top: 2,
                          color: theme.palette.text.active,
                        }}
                        onClick={(e) => removeImage(index)}
                      >
                        <CloseOutline width={24} />
                      </IconButton>
                      <img
                        src={previewImage(item.image)}
                        alt={item.id}
                        loading="lazy"
                        style={{
                          borderRadius: 10,
                          maxWidth: 200,
                          maxHeight: 200,
                          border: `1px solid ${theme.palette.background.third}`,
                        }}
                      />
                    </ImageListItem>
                  ))}
              </ImageList>
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid item md={12} lg={6}>
        <Box>
          <Box marginBottom={1}>
            <Typography
              fontSize={14}
              letterSpacing={0.5}
              fontWeight="medium"
              textTransform="uppercase"
              color={theme.palette.text.third}
            >
              Other Information
            </Typography>
          </Box>

          <Grid container marginX={1} spacing={1}>
            <Grid item xs={6} display="flex" alignItems="center">
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
            </Grid>

            <Grid item xs={6} display="flex" alignItems="center">
              <>
                <Typography
                  fontSize={14}
                  fontWeight="medium"
                  color={theme.palette.text.third}
                >
                  Rating:
                </Typography>
                <Box display="flex" alignItems="center" marginLeft={1}>
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
            </Grid>

            <Grid item xs={6} display="flex" alignItems="center">
              <>
                <Typography
                  fontSize={14}
                  fontWeight="medium"
                  color={theme.palette.text.third}
                >
                  Create Time:
                </Typography>
                <Typography fontSize={14} fontWeight="semiBold" marginLeft={1}>
                  {dayjs(values?.createTime).format("MMMM DD, YYYY")}
                </Typography>
              </>
            </Grid>
            <Grid item xs={6} display="flex" alignItems="center">
              <Typography
                fontSize={14}
                fontWeight="medium"
                color={theme.palette.text.third}
              >
                Update Time:
              </Typography>
              <Typography fontSize={14} fontWeight="semiBold" marginLeft={1}>
                {dayjs(values?.updateTime).format("MMMM DD, YYYY")}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box marginTop={3}>
          <Box marginBottom={1}>
            <Typography
              fontSize={14}
              letterSpacing={0.5}
              fontWeight="medium"
              textTransform="uppercase"
              color={theme.palette.text.third}
            >
              Location in Maps
            </Typography>
          </Box>
          <Box padding={1}>
            <Box
              border={1}
              borderColor={theme.palette.background.third}
              borderRadius={5}
              padding={1}
              height={400}
            >
              Map
            </Box>
          </Box>

          <Box display="flex" alignItems="center" paddingX={2} marginTop={2}>
            <Box>
              <Typography
                fontWeight="medium"
                width={150}
                color={theme.palette.text.third}
              >
                Longitude{" "}
                <small style={{ color: theme.palette.text.active }}>*</small>
              </Typography>
            </Box>
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
                  setValues({
                    ...values,
                    longitude: e.target.value,
                  }),
              })}
              error={!!errors.longitude}
              helperText={errors.longitude?.message}
              placeholder={`Type longitude here`}
            />
          </Box>

          <Box display="flex" alignItems="center" paddingX={2} marginTop={2}>
            <Box>
              <Typography
                fontWeight="medium"
                width={150}
                color={theme.palette.text.third}
              >
                Latitude{" "}
                <small style={{ color: theme.palette.text.active }}>*</small>
              </Typography>
            </Box>
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
                  setValues({
                    ...values,
                    latitude: e.target.value,
                  }),
              })}
              error={!!errors.latitude}
              helperText={errors.latitude?.message}
              placeholder={`Type latitude here`}
            />
          </Box>

          <Box display="flex" alignItems="center" paddingX={2} marginTop={2}>
            <Box>
              <Typography
                fontWeight="medium"
                width={150}
                color={theme.palette.text.third}
              >
                Google Place ID{" "}
                <small style={{ color: theme.palette.text.active }}>*</small>
              </Typography>
            </Box>
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
        </Box>

        <Box marginTop={3}>
          <Box marginBottom={1}>
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

          <Box marginTop={2}>
            {date.map((item) => (
              <Grid
                key={item.id}
                container
                paddingX={3}
                marginTop={1}
                spacing={1}
              >
                <Grid item xs={4}>
                  <Typography width={100}>{item.day}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    required
                    size="small"
                    type="time"
                    name="openTime"
                    step="1"
                    defaultValue={getTime(item.id, "openTime")}
                    onChange={(event) => handleChangeTime(item.id - 1, event)}
                    InputProps={{
                      style: {
                        borderRadius: 10,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    required
                    size="small"
                    type="time"
                    name="endTime"
                    step="1"
                    defaultValue={getTime(item.id, "endTime")}
                    onChange={(event) => handleChangeTime(item.id - 1, event)}
                    InputProps={{
                      style: {
                        borderRadius: 10,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default GeneralInfo;
