import {
  Autocomplete,
  alpha,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  FormHelperText,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { imageFileTypes } from "../../../../constants/fileType";

import { updatePlace } from "../../action";

import { CloudArrowUp } from "@styled-icons/fluentui-system-regular";

const DialogUpdate = ({
  dialog,
  setDialog,
  setValues,
  data,
  setData,
  control,
  register,
  handleSubmit,
  errors,
  categories,
  getValues,
  update,
  setUpdate,
  notification,
  setNotification,
}) => {
  const theme = useTheme();

  const previewImage = (image) => {
    if (image instanceof File && imageFileTypes.includes(image.type)) {
      return URL.createObjectURL(image);
    }
    return image;
  };

  const onUpdate = async () => {
    let value = {
      name: data.name,
      image: data.image,
      total: data.total,
      tourDetails: [],
      tourDescriptions: data.tourDescriptions,
    };
    for (const place of data.tourDetails) {
      value.tourDetails.push({ id: place.id, price: place.price });
    }

    try {
      setUpdate(true);
      const res = await updatePlace(data.id, value);
      if (res) {
        setValues(res.tour);
        setNotification({
          ...notification,
          errorState: true,
          errorMessage: "Updated itinerary successfully!",
          status: "success",
        });
        setUpdate(false);
        setDialog(false);
      }
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
    <Dialog
      open={dialog}
      fullWidth
      maxWidth="lg"
      onClose={() => setDialog(false)}
    >
      <DialogTitle>Update Place Infomations</DialogTitle>

      <DialogContent sx={{ paddingX: 10 }}>
        <Box display="flex" marginBottom={2}>
          <Typography width={200}>
            Place Name{" "}
            <small style={{ color: theme.palette.text.active }}>*</small>
          </Typography>
          <TextField
            fullWidth
            size="small"
            disabled={update}
            InputProps={{
              style: {
                borderRadius: 10,
              },
            }}
            value={data.name}
            {...register("name", {
              required: "Place name is required!",
              validate: (value) => {
                return value.trim() !== "" || "Place name is not empty!";
              },
              onChange: (e) => setData({ ...data, name: e.target.value }),
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
            placeholder={`Type place name here`}
          />
        </Box>

        <Box display="flex" marginBottom={2}>
          <Typography width={200}>
            Category{" "}
            <small style={{ color: theme.palette.text.active }}>*</small>
          </Typography>
          <Controller
            control={control}
            name="placeCategories"
            disabled={update}
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
                options={categories}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                getOptionLabel={(option) => option.name}
                onChange={(_, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={
                      getValues("placeCategories")?.length === 0
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

        {/* <Box display="flex" marginBottom={2}>
          <Typography width={200}>
            Image <small style={{ color: theme.palette.text.active }}>*</small>
          </Typography>

          <Box width="100%">
            <Box
              display="flex"
              alignItems="center"
              position="relative"
              overflow="hidden"
              width="100%"
              border={1}
              borderRadius={2.5}
              borderColor={
                errors.image
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
                <Box
                  display="flex"
                  alignItems="center"
                  color={alpha(theme.palette.text.secondary, 0.4)}
                >
                  <CloudArrowUp height={24} style={{ margin: 10 }} />
                  <Typography noWrap>
                    {data.image instanceof File
                      ? data.image.name
                      : "Click to change image..."}
                  </Typography>
                </Box>

                <input
                  id="image"
                  name="image"
                  type="file"
                  disabled={update}
                  accept="image/jpeg, image/png"
                  style={{
                    opacity: 0,
                    position: "absolute",
                  }}
                  {...register("image", {
                    required: data.image ? false : "Image is required!",
                    validate: (value) => {
                      if (value.length === 1)
                        return (
                          imageFileTypes.includes(value[0].type) ||
                          "Images must be in PNG or JPG format!"
                        );
                    },
                    onChange: (e) => {
                      setData({ ...data, image: e.target.files[0] });
                    },
                  })}
                />
              </label>
            </Box>
            <FormHelperText
              htmlFor="render-select"
              error
              sx={{ marginLeft: 2 }}
            >
              {errors.image?.message}
            </FormHelperText>
            <Box marginTop={2}>
              <img
                src={previewImage(data.image)}
                style={{
                  borderRadius: 10,
                  maxWidth: "100%",
                  maxHeight: 300,
                }}
                alt=""
              />
            </Box>
          </Box>
        </Box> */}
      </DialogContent>
      <DialogActions sx={{ padding: 3 }}>
        <Button
          variant="outlined"
          onClick={handleSubmit(onUpdate)}
          disabled={update}
          autoFocus
        >
          Update
        </Button>
        <Button
          variant="outlined"
          color="error"
          disabled={update}
          onClick={() => setDialog(false)}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogUpdate;
