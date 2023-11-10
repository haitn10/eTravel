import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  alpha,
  useTheme,
  Autocomplete,
  FormHelperText,
  ImageList,
  ImageListItem,
  IconButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { LocalizationProvider, TimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { NumericFormatCustom } from "../../common/NumericFormatCustom";
import {
  CloudCheckmark,
  CloudDismiss,
} from "@styled-icons/fluentui-system-filled";
import { CloudArrowUp } from "@styled-icons/fluentui-system-regular";
import { ImageAdd } from "@styled-icons/remix-line";
import { CloseOutline } from "@styled-icons/evaicons-outline";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesList]);

  useEffect(() => {
    if (values.placeCategories?.length === 0) {
      setError("placeCategories", {
        message: "Category is required!",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.placeCategories]);

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
    if (imagesList.length !== 0) {
      imagesList.forEach((item) => {
        if (item.image instanceof File) {
          if (item.image && !fileTypes.includes(item.image.type)) {
            setError("placeImages", {
              message: "Please choose image file!",
            });
          } else {
            setValues({ ...values, placeImages: imagesList });
          }
        }
      });
    } else {
      setError("placeImages", {
        message: "Image is required!",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesList]);

  const handleChangeOtherImages = (event) => {
    const selectedImageFiles = Array.from(event.target.files);
    const newImagesList = selectedImageFiles.map((file) => {
      return { image: file, isPrimary: false };
    });
    setImagesList((preImagesList) => preImagesList.concat(newImagesList));
  };

  const handleChangePrimaryImage = (e) => {
    clearErrors("placeImages");
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

  const removeImage = (index) => {
    const newImagesList = imagesList.filter(
      (image) => image.isPrimary === false
    );
    newImagesList.splice(index, 1);
    const mergeList = imagesList
      .filter((image) => image.isPrimary === true)
      .concat(newImagesList);

    setImagesList(mergeList);
  };

  const handleChangeCategories = (e, value) => {
    clearErrors("placeCategories");
    setValues({ ...values, placeCategories: value });
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
    if (image) {
      if (fileTypes.includes(image.type)) {
        return URL.createObjectURL(image);
      }
    }
    return;
  };

  return (
    <Box padding={3} marginX={8}>
      <Grid container rowGap={2}>
        {/* Place Name */}
        <Grid item xs={12} lg={4}>
          <Typography fontWeight="medium">
            Place Name{" "}
            <small style={{ color: theme.palette.text.active }}>*</small>
          </Typography>
        </Grid>
        <Grid item xs={12} lg={8}>
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
        <Grid item xs={12} lg={4}>
          <Typography fontWeight="medium">
            Category{" "}
            <small style={{ color: theme.palette.text.active }}>*</small>
          </Typography>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Autocomplete
            fullWidth
            multiple
            size="small"
            value={values.placeCategories}
            options={categoriesList}
            getOptionLabel={(option) => option?.name}
            onChange={handleChangeCategories}
            filterSelectedOptions
            sx={{
              ".MuiOutlinedInput-root": {
                borderRadius: 2.5,
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={
                  values.placeCategories.length === 0
                    ? "Select one or more categories"
                    : ""
                }
              />
            )}
          />
          <FormHelperText htmlFor="render-select" error sx={{ marginLeft: 2 }}>
            {errors.placeCategories?.message}
          </FormHelperText>
        </Grid>

        {/* Price */}
        <Grid item xs={12} lg={4}>
          <Typography fontWeight="medium">
            Price <small style={{ color: theme.palette.text.active }}>*</small>
          </Typography>
        </Grid>
        <Grid item xs={12} lg={8}>
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
        <Grid item xs={12} lg={4}>
          <Typography fontWeight="medium">
            Entry Ticket{" "}
            <small style={{ fontSize: 12, color: theme.palette.text.active }}>
              (if have)
            </small>
          </Typography>
        </Grid>
        <Grid item xs={12} lg={8}>
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
        <Grid item xs={12} lg={4}>
          <Typography fontWeight="medium">Duration</Typography>
          <Typography>
            <small>Estimated place completion time</small>
          </Typography>
        </Grid>
        <Grid item xs={12} lg={8}>
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
              format="HH:mm:ss"
            />
          </LocalizationProvider>
        </Grid>

        {/* Primary Image */}
        <Grid item xs={12} lg={4}>
          <Typography fontWeight="medium">
            Primary Image{" "}
            <small style={{ color: theme.palette.text.active }}>*</small>
          </Typography>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Box
            display="flex"
            alignItems="center"
            border={1}
            borderRadius={2.5}
            borderColor={
              errors.placeImages
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
                  {errors.placeImages ? (
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
                  <Typography noWrap>Import primary image here</Typography>
                </Box>
              )}

              <input
                id="image"
                style={{
                  opacity: 0,
                  position: "absolute",
                }}
                onChange={handleChangePrimaryImage}
                type="file"
                accept="image/*"
              />
            </label>
          </Box>
          <FormHelperText htmlFor="render-select" error sx={{ marginLeft: 2 }}>
            {errors.placeImages?.message}
          </FormHelperText>

          <Box marginTop={2} position="relative">
            <img
              src={previewImage(
                imagesList.filter((item) => item.isPrimary === true)[0]?.image
              )}
              style={{
                maxWidth: "100%",
                maxHeight: 300,
              }}
              alt=""
            />
          </Box>
        </Grid>

        {/* Other Images */}
        <Grid item xs={12} lg={4}>
          <Typography fontWeight="medium">Other Images</Typography>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Box
            display="flex"
            alignItems="center"
            border={1}
            borderRadius={2.5}
            borderColor={alpha(theme.palette.text.primary, 0.28)}
            height={40}
          >
            <label
              htmlFor="imageList"
              style={{
                display: "flex",
                width: "100%",
                color: theme.palette.text.third,
                cursor: "pointer",
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                color={alpha(theme.palette.text.secondary, 0.4)}
              >
                <ImageAdd width={20} style={{ margin: 10 }} />
                <Typography noWrap>
                  {imagesList.filter((image) => image.isPrimary === false)
                    .length !== 0
                    ? `Have ${
                        imagesList.filter((image) => image.isPrimary === false)
                          .length
                      } image files`
                    : "Import more images here..."}
                </Typography>
              </Box>

              <input
                id="imageList"
                style={{
                  opacity: 0,
                  position: "absolute",
                }}
                multiple
                onChange={handleChangeOtherImages}
                type="file"
                accept="image/*"
              />
            </label>
          </Box>

          <ImageList
            variant="standard"
            cols={3}
            gap={2}
            sx={{ maxHeight: 500, marginTop: 2 }}
          >
            {imagesList &&
              imagesList
                .filter((image) => image.isPrimary === false)
                .map((item, index) => (
                  <ImageListItem key={index}>
                    <IconButton
                      style={{
                        position: "absolute",
                        right: 2,
                        top: 2,
                        color: theme.palette.text.active,
                      }}
                      onClick={(e) => removeImage(index)}
                    >
                      <CloseOutline width={24} />
                    </IconButton>
                    <img
                      src={previewImage(item.image)}
                      alt={index}
                      loading="lazy"
                      style={{
                        borderRadius: 10,
                        maxWidth: 300,
                        maxHeight: 200,
                      }}
                    />
                  </ImageListItem>
                ))}
          </ImageList>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlaceGeneral;
