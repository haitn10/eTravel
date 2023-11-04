import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  alpha,
  useTheme,
  Button,
  Autocomplete,
  FormHelperText,
} from "@mui/material";
import { Add, HighlightOff } from "styled-icons/material";
import { useDispatch } from "react-redux";
import { LocalizationProvider, TimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  CloudCheckmark,
  CloudDismiss,
} from "@styled-icons/fluentui-system-filled";
import { CloudArrowUp } from "@styled-icons/fluentui-system-regular";
import { NumericFormatCustom } from "../../common/NumericFormatCustom";

import { getCategoriesAll } from "../../categories/action";
const PlaceGeneral = ({
  values,
  setValues,
  errors,
  register,
  setError,
  clearErrors,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [imagesList, setImagesList] = useState(values?.placeImages);
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    async function fetchLanguage() {
      try {
        const response = await dispatch(getCategoriesAll());
        setCategoriesList(response.categories);
      } catch (error) {}
    }
    fetchLanguage();
  }, [dispatch]);

  useEffect(() => {
    let fileTypes = [
      "image/apng",
      "image/avif",
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/webp",
    ];
    imagesList.forEach((image) => {
      if (image.image instanceof File) {
        if (!fileTypes.includes(image.image.type)) {
          setError("fileType", {
            message: "Please choose image file!",
          });
        } else {
          setValues({ ...values, placeImages: imagesList });
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesList]);

  const handleChangeCategories = (e, value) => {
    setValues({ ...values, placeCategories: value });
  };

  const handleChangePrimaryImage = (e) => {
    clearErrors("fileType");
    const primaryIndex = imagesList.findIndex(
      (placeImage) => placeImage.isPrimary === true
    );

    if (primaryIndex === -1) {
      setImagesList([
        ...imagesList,
        {
          image: e.target.files[0],
          isPrimary: true,
        },
      ]);
    } else {
      const data = [...imagesList];
      data[primaryIndex].image = e.target.files[0];
      setImagesList(data);
    }
  };

  const handleChangeOtherImages = (event) => {
    let imagesArray = [];
    const selectedImageFiles = Array.from(event.target.files);
    for (const file of selectedImageFiles) {
      imagesArray.push({ image: file, isPrimary: false });
    }
    setImagesList((preImageList) => preImageList.concat(imagesArray));
  };

  const previewImage = useMemo(() => {
    let url = "";
    const checkImage = imagesList.filter((item) => item.isPrimary === true);
    if (checkImage.length !== 0) {
      url = URL.createObjectURL(checkImage[0].image);
    }
    return url;
  }, [imagesList]);

  return (
    <Box padding={5} marginX={12}>
      <Grid container rowGap={3}>
        {/* Place Name */}
        <Grid item xs={12} md={4}>
          <Typography fontWeight="medium">
            Place Name{" "}
            <small style={{ color: theme.palette.text.active }}>*</small>
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            size="small"
            name="placeName"
            InputProps={{
              style: {
                borderRadius: 10,
              },
            }}
            value={values.name}
            {...register("placeName", {
              required: "Place Name is required!",
              onChange: (e) => setValues({ ...values, name: e.target.value }),
            })}
            error={!!errors.placeName}
            helperText={errors.placeName?.message}
            placeholder={`Type place name here`}
          />
        </Grid>

        {/* Category */}
        <Grid item xs={12} md={4}>
          <Typography fontWeight="medium">
            Category{" "}
            <small style={{ color: theme.palette.text.active }}>*</small>
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Autocomplete
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
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select one or more categories"
              />
            )}
          />
          <FormHelperText
            htmlFor="render-select"
            style={{ marginLeft: 14 }}
            error
          >
            {errors.placeCategories?.message}
          </FormHelperText>
        </Grid>

        {/* Price */}
        <Grid item xs={12} md={4}>
          <Typography fontWeight="medium">
            Price <small style={{ color: theme.palette.text.active }}>*</small>
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            size="small"
            value={values.price}
            {...register("price", {
              required: "Price is required!",
              onChange: (e) =>
                setValues({ ...values, price: Number(e.target.value) }),
            })}
            error={!!errors.price}
            helperText={errors.price?.message}
            InputProps={{
              style: {
                borderRadius: 10,
              },
              inputComponent: NumericFormatCustom,
            }}
            placeholder={`Price of place`}
          />
        </Grid>

        {/* Entry Ticket */}
        <Grid item xs={12} md={4}>
          <Typography fontWeight="medium">
            Entry Ticket{" "}
            <small style={{ fontSize: 12, color: theme.palette.text.active }}>
              (if have)
            </small>
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            size="small"
            value={values.entryTicket}
            onChange={(e) =>
              setValues({ ...values, entryTicket: Number(e.target.value) })
            }
            InputProps={{
              style: {
                borderRadius: 10,
              },
              inputComponent: NumericFormatCustom,
            }}
            placeholder={`EntryTicket of place`}
          />
        </Grid>

        {/* Duration */}
        <Grid item xs={12} md={4}>
          <Typography fontWeight="medium">Duration</Typography>
          <Typography>
            <small>Estimated place completion time</small>
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimeField
              fullWidth
              size="small"
              value={values.hour}
              InputProps={{
                style: {
                  borderRadius: 10,
                },
              }}
              onChange={(newValue) => setValues({ ...values, hour: newValue })}
              format="HH:mm"
            />
          </LocalizationProvider>
        </Grid>

        {/* Tour Image */}
        <Grid item xs={12} md={4}>
          <Typography fontWeight="medium">
            Primary Image{" "}
            <small style={{ color: theme.palette.text.active }}>*</small>
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            display="flex"
            alignItems="center"
            position="relative"
            overflow="hidden"
            border={1}
            borderRadius={2.5}
            borderColor={
              !!errors.imagePrimary || !!errors.fileType
                ? theme.palette.text.active
                : alpha(theme.palette.text.primary, 0.28)
            }
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
              {imagesList.filter((item) => item.isPrimary === true).length !==
              0 ? (
                <Box display="flex" alignItems="center">
                  {errors.fileType ? (
                    <CloudDismiss
                      height={24}
                      color={theme.palette.text.active}
                      style={{ margin: 10 }}
                    />
                  ) : (
                    <CloudCheckmark
                      height={24}
                      color={theme.palette.text.onStatus}
                      style={{ margin: 10 }}
                    />
                  )}
                  <Typography noWrap>
                    {
                      imagesList.filter((item) => item.isPrimary === true)[0]
                        ?.image.name
                    }
                  </Typography>
                </Box>
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  color={alpha(theme.palette.text.secondary, 0.4)}
                >
                  <CloudArrowUp height={24} style={{ margin: 10 }} />
                  <Typography noWrap>Import picture for tour here</Typography>
                </Box>
              )}

              <input
                id="image"
                style={{
                  opacity: 0,
                  position: "absolute",
                }}
                {...register("imagePrimary", {
                  required: "Primary Image is required!",
                  onChange: (e) => handleChangePrimaryImage(e),
                })}
                type="file"
                accept="image/*"
              />
            </label>
          </Box>
          <FormHelperText
            htmlFor="render-select"
            style={{ marginLeft: 14 }}
            error
          >
            {errors.imagePrimary?.message || errors.fileType?.message}
          </FormHelperText>
          <Box marginTop={2}>
            <img
              src={previewImage}
              style={{
                maxWidth: "100%",
                maxHeight: 300,
              }}
              alt=""
            />
          </Box>
        </Grid>

        {/* Images */}
        <Grid item xs={4}>
          <Typography fontWeight="medium">Other Images</Typography>
        </Grid>
        <Grid item xs={8}>
          {imagesList.length > 1 ? (
            <Box
              sx={{
                display: "flex",
                maxHeight: 220,
                maxWidth: 1000,
                overflowY: "hidden",
                overflowX: "auto",
                "&::-webkit-scrollbar": {
                  marginTop: 0.5,
                  width: "0.35em",
                  height: "0.45em",
                  bgcolor: theme.palette.background.secondary,
                },

                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: theme.palette.background.third,
                  borderRadius: 3,
                  "&:hover": {
                    background: alpha(theme.palette.background.hovered, 0.25),
                  },
                },
              }}
              columnGap={2}
            >
              <Box
                // height={200}
                minWidth={200}
                border={1}
                borderRadius={2.5}
                borderColor={theme.palette.background.third}
              >
                <Button
                  variant="text"
                  color="inherit"
                  component="label"
                  sx={{ width: "100%", height: "100%", gap: 1 }}
                >
                  <Add
                    color="inherit"
                    sx={{
                      height: 30,
                      width: 30,
                      border: 1,
                      borderStyle: "dashed",
                      strokeDasharray: 30,
                      borderRadius: 1,
                    }}
                  />

                  <Typography fontWeight="medium">Add Images</Typography>
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleChangeOtherImages}
                  />
                </Button>
              </Box>
              {imagesList
                .filter((image) => image.isPrimary === false)
                .reverse()
                .map((item, index) => (
                  <Box
                    key={index}
                    position="relative"
                    minWidth={200}
                    border={1}
                    borderRadius={2.5}
                    borderColor={theme.palette.background.third}
                  >
                    <img
                      src={URL.createObjectURL(item.image)}
                      alt="item"
                      style={{
                        height: "100%",
                        width: "100%",
                        maxWidth: 200,
                        objectFit: "contain",
                        borderRadius: 10,
                      }}
                      loading="lazy"
                    />
                    <Button
                      sx={{
                        position: "absolute",
                        right: 2,
                        top: 2,
                        padding: 1,
                        minWidth: 0,
                        "&:hover": { backgroundColor: "inherit" },
                      }}
                      onClick={() =>
                        setImagesList(imagesList.filter((e) => e !== item))
                      }
                    >
                      <HighlightOff color="error" />
                    </Button>
                  </Box>
                ))}
            </Box>
          ) : (
            <TextField
              fullWidth
              size="small"
              inputProps={{
                accept: "image/*",
                multiple: true,
              }}
              InputProps={{
                style: {
                  borderRadius: 10,
                },
              }}
              type="file"
              multiple
              onChange={handleChangeOtherImages}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlaceGeneral;
