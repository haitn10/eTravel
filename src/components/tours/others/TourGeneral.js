import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  CloudCheckmark,
  CloudDismiss,
} from "@styled-icons/fluentui-system-filled";
import { CloudArrowUp } from "@styled-icons/fluentui-system-regular";
import { Add } from "@styled-icons/ionicons-outline";
import { Trash3 } from "@styled-icons/bootstrap";

import { getAllLanguages } from "../../languages/action";

const TourGeneral = ({
  values,
  setValues,
  register,
  errors,
  setError,
  clearErrors,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [languagesList, setLanguagesList] = useState([]);
  const [selectLanguagesList, setselectLanguagesList] = useState(
    values.tourDescriptions
  );

  useEffect(() => {
    async function fetchLanguage() {
      const response = await dispatch(getAllLanguages());
      setLanguagesList(response.languages);
    }
    fetchLanguage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (values.image) {
      if (values.image instanceof File) {
        if (values.image && !fileTypes.includes(values.image.type)) {
          setError("fileType", {
            message: "Please choose image file!",
          });
        }
      }
    } else {
      setError("fileType", {
        message: "Image is required!",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.image]);

  const handleChangeLanguage = (index, event) => {
    clearErrors(event.target.name);
    const value = [...selectLanguagesList];
    value[index][event.target.name] = event.target.value;
    setselectLanguagesList(value);
  };

  const addToSelectLanguagesList = () => {
    const value = [...selectLanguagesList];
    if (value.length < languagesList.length) {
      setselectLanguagesList([
        ...value,
        { languageCode: "en-us", name: "", description: "" },
      ]);
    }
  };

  console.log(selectLanguagesList);
  const removeToSelectLanguagesList = (index) => {
    const value = [...selectLanguagesList];
    value.splice(index, 1);
    setselectLanguagesList(value);
  };

  return (
    <Box padding={5} marginX={10}>
      <Box marginBottom={3}>
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

      <Grid container rowGap={2}>
        {/* Tour Name */}
        <Grid item sm={12} lg={4}>
          <Typography fontWeight="medium">
            Tour Name Default{" "}
            <small style={{ color: theme.palette.text.active }}>*</small>
          </Typography>
        </Grid>
        <Grid item sm={12} lg={8}>
          <TextField
            fullWidth
            size="small"
            value={values.name}
            {...register("namedefault", {
              required: "Tour name is required!",
              validate: (value) => value.trim() !== "",
              onChange: (e) => setValues({ ...values, name: e.target.value }),
            })}
            error={!!errors.namedefault}
            helperText={errors.namedefault?.message}
            InputProps={{
              style: {
                borderRadius: 10,
              },
            }}
            placeholder="Type tour name here"
          />
        </Grid>

        {/* Tour Image */}
        <Grid item sm={12} lg={4}>
          <Typography fontWeight="medium">
            Illustration Image{" "}
            <small style={{ color: theme.palette.text.active }}>*</small>
          </Typography>
        </Grid>
        <Grid item sm={12} lg={8}>
          <Box
            display="flex"
            alignItems="center"
            position="relative"
            overflow="hidden"
            border={1}
            borderRadius={2.5}
            borderColor={
              errors.fileType
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
              {values.image ? (
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
                  <Typography noWrap>{values.image.name}</Typography>
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
                onChange={(e) => {
                  clearErrors("fileType");
                  setValues({ ...values, image: e.target.files[0] });
                }}
                type="file"
                accept="image/*"
              />
            </label>
          </Box>
          <FormHelperText htmlFor="render-select" error sx={{ marginLeft: 2 }}>
            {errors.fileType?.message}
          </FormHelperText>
          <Box marginTop={2}>
            <img
              src={values.image && URL.createObjectURL(values.image)}
              style={{
                maxWidth: "100%",
                maxHeight: 300,
              }}
              alt=""
            />
          </Box>
        </Grid>
      </Grid>
      <Box
        marginBottom={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          fontSize={14}
          letterSpacing={0.5}
          fontWeight="medium"
          textTransform="uppercase"
          color={theme.palette.text.third}
        >
          information with multiple languages
        </Typography>

        {selectLanguagesList.length < 4 ? (
          <Button onClick={addToSelectLanguagesList} sx={{ borderRadius: 2.5 }}>
            <Add width={20} />
            <Typography fontWeight="medium" fontSize={14}>
              Add More
            </Typography>
          </Button>
        ) : null}
      </Box>

      {selectLanguagesList &&
        selectLanguagesList.map((selectLanguage, index) => (
          <Box key={index} display="flex">
            <Box>
              <Grid container rowGap={2} marginY={2}>
                <Grid item sm={12} lg={3}>
                  <Typography fontWeight="medium">
                    Choose Language{" "}
                    <small style={{ color: theme.palette.text.active }}>
                      *
                    </small>
                  </Typography>
                </Grid>
                <Grid item sm={12} lg={9}>
                  <FormControl fullWidth size="small">
                    <Select
                      sx={{ borderRadius: 2.5 }}
                      value={selectLanguage.languageCode}
                      name="languageCode"
                      onChange={(event) => handleChangeLanguage(index, event)}
                    >
                      {languagesList.map((item) => (
                        <MenuItem key={item.id} value={item.languageCode}>
                          <img
                            src={item.icon}
                            alt={item.name}
                            style={{
                              width: 16,
                              border: "1px solid #ccc",
                              marginRight: 10,
                            }}
                          />
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item sm={12} lg={3}>
                  <Typography fontWeight="medium">
                    Tour Name{" "}
                    <small style={{ color: theme.palette.text.active }}>
                      *
                    </small>
                  </Typography>
                </Grid>
                <Grid item sm={12} lg={9}>
                  <TextField
                    fullWidth
                    size="small"
                    name="name"
                    value={selectLanguage.name}
                    onChange={(event) => handleChangeLanguage(index, event)}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    placeholder="Type tour name here"
                    InputProps={{
                      style: {
                        borderRadius: 10,
                      },
                    }}
                  />
                </Grid>

                {/* Tour Decription */}
                <Grid item sm={12} lg={3}>
                  <Typography fontWeight="medium">
                    Decription{" "}
                    <small style={{ color: theme.palette.text.active }}>
                      *
                    </small>
                  </Typography>
                  <Typography>
                    <small>Write a short decription</small>
                  </Typography>
                </Grid>
                <Grid item sm={12} lg={9}>
                  <TextField
                    fullWidth
                    name="description"
                    value={selectLanguage.description}
                    onChange={(event) => handleChangeLanguage(index, event)}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    placeholder="Type description here"
                    InputProps={{
                      style: {
                        borderRadius: 10,
                      },
                    }}
                    multiline={true}
                    rows={7}
                  />
                </Grid>
              </Grid>
              <Divider />
            </Box>
            <Button
              color="error"
              onClick={removeToSelectLanguagesList}
              sx={{ marginLeft: 2 }}
            >
              <Trash3 width={20} />
            </Button>
          </Box>
        ))}
    </Box>
  );
};

export default TourGeneral;
