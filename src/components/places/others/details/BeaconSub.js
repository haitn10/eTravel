import React from "react";
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Controller, useFieldArray } from "react-hook-form";
import { LocalizationProvider, TimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { imageFileTypes } from "../../../../constants/fileType";

import { Add } from "@styled-icons/ionicons-outline";
import { Trash3 } from "@styled-icons/bootstrap";
import { CloudUpload } from "@styled-icons/material-outlined";
import BeaconLanguage from "../BeaconLanguage";

const BeaconSub = ({
  language,
  loading,
  control,
  register,
  errors,
  getValues,
}) => {
  const theme = useTheme();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "placeItems",
  });
  const addNewBeacon = () => {
    var arrLang = [];

    for (const desc of getValues("placeDescriptions")) {
      arrLang.push({
        languageCode: desc.languageCode,
        nameItem: "",
      });
    }
    append({
      name: "",
      beaconId: "",
      image: "",
      startTime: "00:00",
      endTime: "00:00",
      beaconMajorNumber: 0,
      beaconMinorNumber: 0,
      itemDescriptions: arrLang,
    });
  };

  const previewImage = (image) => {
    if (image instanceof File && imageFileTypes.includes(image.type)) {
      return URL.createObjectURL(image);
    }

    return image;
  };

  return (
    <>
      <Box marginBottom={1} display="flex" justifyContent="space-between">
        <Typography
          fontSize={14}
          letterSpacing={0.5}
          fontWeight="medium"
          textTransform="uppercase"
          color={theme.palette.text.third}
        >
          Beacon Information
        </Typography>
        <Button onClick={addNewBeacon} sx={{ borderRadius: 2.5 }}>
          <Add width={20} />
          <Typography fontWeight="medium" fontSize={14}>
            Add New
          </Typography>
        </Button>
      </Box>
      {fields.map((item, index) => (
        <Box key={item.id} display="flex" justifyContent="center" padding={1}>
          <Box>
            <Grid container spacing={3}>
              <Grid item sm={12} lg={6}>
                <Grid container marginBottom={2} spacing={1}>
                  {loading ? (
                    <Skeleton width="100%" />
                  ) : (
                    <>
                      <Grid item sm={12} lg={4}>
                        <Typography fontWeight="medium">
                          Beacon Name{" "}
                          <small style={{ color: theme.palette.text.active }}>
                            *
                          </small>
                        </Typography>
                      </Grid>

                      <Grid item sm={12} lg={8}>
                        <TextField
                          fullWidth
                          size="small"
                          InputProps={{
                            style: {
                              borderRadius: 10,
                            },
                          }}
                          {...register(`placeItems.${index}.name`, {
                            validate: (value) => {
                              return (
                                value.trim() !== "" ||
                                "Beacon name is not empty!"
                              );
                            },
                            required: "Beacon Name is required!",
                          })}
                          error={!!errors.placeItems?.[index]?.name}
                          helperText={errors.placeItems?.[index]?.name?.message}
                          placeholder="Type beacon name here"
                        />
                      </Grid>
                    </>
                  )}

                  {loading ? (
                    <Skeleton width="100%" />
                  ) : (
                    <>
                      <Grid item sm={12} lg={4}>
                        <Typography fontWeight="medium">
                          Beacon Code{" "}
                          <small style={{ color: theme.palette.text.active }}>
                            *
                          </small>
                        </Typography>
                      </Grid>

                      <Grid item sm={12} lg={8}>
                        <TextField
                          fullWidth
                          size="small"
                          InputProps={{
                            style: {
                              borderRadius: 10,
                            },
                          }}
                          {...register(`placeItems.${index}.beaconId`, {
                            validate: (value) => {
                              return (
                                value.trim() !== "" ||
                                "Beacon Code is not empty!"
                              );
                            },
                            required: "Beacon Code is required!",
                          })}
                          error={!!errors.placeItems?.[index]?.beaconId}
                          helperText={
                            errors.placeItems?.[index]?.beaconId?.message
                          }
                          placeholder="Beacon code"
                        />
                      </Grid>
                    </>
                  )}

                  {loading ? (
                    <Skeleton width="100%" />
                  ) : (
                    <>
                      <Grid item sm={12} lg={4}>
                        <Typography fontWeight="medium">
                          Beacon Major Number{" "}
                          {/* <small style={{ color: theme.palette.text.active }}>
                           *
                         </small> */}
                        </Typography>
                      </Grid>

                      <Grid item sm={12} lg={8}>
                        <Controller
                          control={control}
                          name={`placeItems.${index}.beaconMajorNumber`}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <Select
                                {...field}
                                defaultValue={0}
                                fullWidth
                                size="small"
                                sx={{
                                  borderRadius: 2.5,
                                }}
                                error={!!error}
                              >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                              </Select>
                              <FormHelperText
                                htmlFor="render-select"
                                error
                                sx={{ marginLeft: 2 }}
                              >
                                {error?.message}
                              </FormHelperText>
                            </>
                          )}
                        />
                      </Grid>
                    </>
                  )}

                  {loading ? (
                    <Skeleton width="100%" />
                  ) : (
                    <>
                      <Grid item sm={12} lg={4}>
                        <Typography fontWeight="medium">
                          Beacon Minor Number{" "}
                          {/* <small style={{ color: theme.palette.text.active }}>
                           *
                         </small> */}
                        </Typography>
                      </Grid>

                      <Grid item sm={12} lg={8}>
                        <Controller
                          control={control}
                          name={`placeItems.${index}.beaconMinorNumber`}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <Select
                                {...field}
                                defaultValue={0}
                                fullWidth
                                size="small"
                                sx={{
                                  borderRadius: 2.5,
                                }}
                                error={!!error}
                              >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                              </Select>
                              <FormHelperText
                                htmlFor="render-select"
                                error
                                sx={{ marginLeft: 2 }}
                              >
                                {error?.message}
                              </FormHelperText>
                            </>
                          )}
                        />
                      </Grid>
                    </>
                  )}

                  {loading ? (
                    <Skeleton width="100%" />
                  ) : (
                    <>
                      <Grid item sm={12} lg={4}>
                        <Typography fontWeight="medium">
                          Start Time{" "}
                          {/* <small style={{ color: theme.palette.text.active }}>
                           *
                         </small> */}
                        </Typography>
                      </Grid>

                      <Grid item sm={12} lg={8}>
                        <Controller
                          control={control}
                          name={`placeItems.${index}.startTime`}
                          rules={{
                            validate: (value) => {
                              return (
                                !dayjs(value).isSame(
                                  dayjs("2022-04-17T00:00:00")
                                ) ||
                                "Start time must be different from 00:00:00!"
                              );
                            },
                          }}
                          render={({ field, fieldState: { error } }) => (
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
                                value={
                                  dayjs(field.value).isValid()
                                    ? field.value
                                    : dayjs("2022-04-17T" + field.value)
                                }
                                format="HH:mm:ss"
                                onChange={(newValue) =>
                                  field.onChange(newValue)
                                }
                                error={!!error}
                                helperText={error?.message}
                              />
                            </LocalizationProvider>
                          )}
                        />
                      </Grid>
                    </>
                  )}

                  {loading ? (
                    <Skeleton width="100%" />
                  ) : (
                    <>
                      <Grid item sm={12} lg={4}>
                        <Typography fontWeight="medium">
                          End Time{" "}
                          <small style={{ color: theme.palette.text.active }}>
                            *
                          </small>
                        </Typography>
                      </Grid>

                      <Grid item sm={12} lg={8}>
                        <Controller
                          control={control}
                          name={`placeItems.${index}.endTime`}
                          rules={{
                            validate: (value) => {
                              return (
                                (!dayjs(value).isSame(
                                  dayjs("2022-04-17T00:00:00")
                                ) &&
                                  dayjs(value).isAfter(
                                    dayjs(
                                      getValues(`placeItems.${index}.startTime`)
                                    )
                                  )) ||
                                "End Time must be different from 00:00:00 and must be greater than Start Time!"
                              );
                            },
                          }}
                          render={({ field, fieldState: { error } }) => (
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
                                value={
                                  dayjs(field.value).isValid()
                                    ? field.value
                                    : dayjs("2022-04-17T" + field.value)
                                }
                                format="HH:mm:ss"
                                onChange={(newValue) => {
                                  field.onChange(newValue);
                                }}
                                error={!!error}
                                helperText={error?.message}
                              />
                            </LocalizationProvider>
                          )}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>

              <Grid item sm={12} lg={6}>
                <Grid container marginBottom={2} spacing={1}>
                  <BeaconLanguage
                    languageSelect={getValues("placeDescriptions")}
                    languageList={language}
                    beaconIndex={index}
                    control={control}
                    register={register}
                    errors={errors}
                  />
                  {loading ? (
                    <Skeleton width="100%" />
                  ) : (
                    <Grid item sm={12} display="flex" justifyContent="center">
                      <Button
                        fullWidth
                        color="success"
                        component="label"
                        startIcon={<CloudUpload width={24} />}
                      >
                        <Controller
                          name={`placeItems.${index}.image`}
                          control={control}
                          // rules={{
                          //   required: "Voice file is required!",

                          // }}
                          render={({ field }) => (
                            <>
                              {field.value ? field.value.name : "Upload Image"}
                              <input
                                type="file"
                                hidden
                                accept="image/jpeg, image/png"
                                onChange={(e) =>
                                  field.onChange(e.target.files[0])
                                }
                              />
                            </>
                          )}
                        />
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Divider />
          </Box>
          {loading ? (
            <Skeleton width={100} />
          ) : (
            <Button
              color="error"
              onClick={() => remove(index)}
              sx={{ marginLeft: 2 }}
            >
              <Trash3 width={20} />
            </Button>
          )}
        </Box>
      ))}
    </>
  );
};

export default BeaconSub;
