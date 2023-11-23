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
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Controller } from "react-hook-form";
import { getCategoriesAll } from "../../../categories/action";
import { NumericFormatCustom } from "../../../common/NumericFormatCustom";
import { LocalizationProvider, TimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { ImageAdd } from "@styled-icons/remix-line/ImageAdd";
import { CloseOutline } from "@styled-icons/evaicons-outline";
import { labels } from "../../../../constants/rating";
import date from "../../../../constants/date";
import MapCoordinates from "./MapCoordinates";
import { StarFill } from "@styled-icons/bootstrap";

const GeneralInfo = ({
  process,
  values,
  setValues,
  control,
  register,
  getValues,
  errors,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [categoriesList, setCategoriesList] = useState([]);
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

  const handleChangeImage = (event) => {
    const selectedImageFiles = Array.from(event.target.files);
    const imagesArray = selectedImageFiles.map((file) => {
      return { image: file, isPrimary: false };
    });

    setValues({
      ...values,
      placeImages: [...values.placeImages.concat(imagesArray)],
    });
  };

  const removeImage = (index) => {
    const newImagesList = [...values.placeImages];
    if (!newImagesList[index].isPrimary === true) {
      newImagesList.splice(index, 1);
    }
    setValues({ ...values, placeImages: newImagesList });
  };

  const handleChangeTime = (index, event) => {
    const dataTime = [...daysOfWeek];
    dataTime[index][event.target.name] = event.target.value;
    setDaysOfWeek(dataTime);
    setValues({...values, placeTimes: dataTime});
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
          <Box>
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

          <Box padding={1}>
            <Box display="flex" marginBottom={2}>
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
                disabled={process}
                error={!!errors.name}
                helperText={errors.name?.message}
                placeholder={`Type place name here`}
              />
            </Box>

            <Box display="flex" marginBottom={2}>
              <Typography fontWeight="medium" id="placeName" width={150}>
                Category{" "}
                <small style={{ color: theme.palette.text.active }}>*</small>
              </Typography>
              <Controller
                name="placeCategories"
                disabled={process}
                control={control}
                rules={{ required: "Please select an option!" }}
                render={({ field }) => (
                  <Autocomplete
                    fullWidth
                    multiple
                    size="small"
                    sx={{
                      ".MuiOutlinedInput-root": {
                        borderRadius: 2.5,
                      },
                    }}
                    {...field}
                    filterSelectedOptions
                    options={categoriesList}
                    isOptionEqualToValue={(option, value) =>
                      option.name === value.name
                    }
                    getOptionLabel={(option) => option.name}
                    onChange={(_, newValue) => field.onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={
                          getValues("placeCategories").length === 0
                            ? "Select one or more categories"
                            : ""
                        }
                        error={!!errors.placeCategories}
                        helperText={
                          errors.placeCategories
                            ? errors.placeCategories.message
                            : null
                        }
                      />
                    )}
                  />
                )}
              />
            </Box>

            <Box display="flex" marginBottom={2}>
              <Typography fontWeight="medium" id="placeName" width={150}>
                Duration{" "}
                <small style={{ color: theme.palette.text.active }}>*</small>
              </Typography>
              <Controller
                control={control}
                name="hour"
                disabled={process}
                rules={{
                  validate: (value) => {
                    return (
                      !dayjs(value).isSame(dayjs("2022-04-17T00:00")) ||
                      "Duration is required!"
                    );
                  },
                }}
                render={({ field, fieldState: { error, defaultValue } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimeField
                      {...field}
                      fullWidth
                      size="small"
                      InputProps={{
                        style: {
                          borderRadius: 10,
                        },
                      }}
                      value={dayjs("0000-00-00T" + field.value)}
                      format="HH:mm:ss"
                      onChange={(newValue) => {
                        field.onChange(newValue);
                        setValues({ ...values, hour: newValue });
                      }}
                      error={!!error}
                      helperText={error?.message}
                    />
                  </LocalizationProvider>
                )}
              />
            </Box>

            <Box display="flex" marginBottom={2}>
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
                disabled={process}
                error={!!errors.price}
                helperText={errors.price?.message}
                placeholder={`Type price here`}
              />
            </Box>

            <Box display="flex" marginBottom={2}>
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
                disabled={process}
                placeholder={`Type entry ticket here`}
              />
            </Box>
          </Box>

          <MapCoordinates
            values={values}
            setValues={setValues}
            register={register}
            errors={errors}
          />
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

          <Grid container padding={1} spacing={1}>
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

        <Box>
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

          <Box>
            {date.map((data, index) => (
              <Grid key={index} container padding={1} spacing={1}>
                <Grid item xs={4}>
                  <Typography width={100}>{data.day}</Typography>
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    size="small"
                    type="time"
                    name="openTime"
                    disabled={process}
                    defaultValue={getTime(data.id, "openTime")}
                    onChange={(event) => handleChangeTime(index, event)}
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
                    size="small"
                    type="time"
                    name="endTime"
                    disabled={process}
                    defaultValue={getTime(data.id, "endTime")}
                    onChange={(event) => handleChangeTime(index, event)}
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

        <Box>
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

            <Button color="error" component="label">
              <input
                hidden
                multiple
                disabled={process}
                onChange={handleChangeImage}
                type="file"
                accept="image/*"
              />
              <ImageAdd width={16} style={{ marginRight: 5 }} />
              Add Images
            </Button>
          </Box>

          <Box padding={1}>
            <ImageList cols={3} gap={5} sx={{ maxHeight: 500 }}>
              {values.placeImages &&
                values.placeImages.map((item, index) => (
                  <ImageListItem key={index}>
                    {item.isPrimary ? (
                      <Tooltip title={"Primary Image"}>
                        <Box
                          style={{
                            position: "absolute",
                            width: 25,
                            height: 25,
                            borderRadius: "10px 0 5px 0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            left: 0,
                            top: 0,
                            backgroundColor: theme.palette.background.secondary,
                            color: theme.palette.text.pending,
                          }}
                        >
                          <StarFill width={18} />
                        </Box>
                      </Tooltip>
                    ) : null}
                    {!item.isPrimary ? (
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
                    ) : null}
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
      </Grid>
    </Grid>
  );
};

export default GeneralInfo;
