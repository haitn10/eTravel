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
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Controller, useFieldArray } from "react-hook-form";

import { getAllLanguages } from "../../../languages/action";

import { Add } from "@styled-icons/ionicons-outline";
import { Trash3 } from "@styled-icons/bootstrap";

const SubsLanguage = ({
  loading,
  control,
  register,
  errors,
  getValues,
  notification,
  setNotification,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [languagesList, setLanguagesList] = useState([]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tourDescriptions",
  });

  useEffect(() => {
    async function fetchLanguage() {
      try {
        const response = await dispatch(getAllLanguages());
        setLanguagesList(response.languages);
      } catch (e) {
        setNotification({
          ...notification,
          errorState: true,
          errorMessage: "Can't loading details mutil-languages for tour!",
          status: "error",
        });
      }
    }
    fetchLanguage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const hasDuplicate = () => {
    const formData = getValues();
    const languageCodes = new Set();
    for (const data of formData.tourDescriptions) {
      if (languageCodes.has(data.languageCode)) {
        return false;
      }
      languageCodes.add(data.languageCode);
    }

    return true;
  };

  return (
    <>
      {fields.map((item, index) => {
        return (
          <Box
            key={item.id}
            display="flex"
            justifyContent="center"
            width="100%"
            padding={1}
          >
            <Box>
              <Grid container spacing={2} marginY={2}>
                <Grid item sm={12} lg={3}>
                  {loading ? (
                    <Skeleton width={100} />
                  ) : (
                    <Typography fontWeight="medium">
                      Choose Language{" "}
                      <small style={{ color: theme.palette.text.active }}>
                        *
                      </small>
                    </Typography>
                  )}
                </Grid>
                <Grid item sm={12} lg={9}>
                  {loading ? (
                    <Skeleton width="100%" />
                  ) : (
                    <Controller
                      control={control}
                      name={`tourDescriptions[${index}].languageCode`}
                      rules={{
                        validate: () => {
                          return (
                            hasDuplicate() ||
                            "There are duplicate language. Please check again!"
                          );
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <Select
                            {...field}
                            defaultValue={""}
                            fullWidth
                            size="small"
                            sx={{
                              borderRadius: 2.5,
                            }}
                            error={error}
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
                  )}
                </Grid>

                <Grid item sm={12} lg={3}>
                  {loading ? (
                    <Skeleton width={100} />
                  ) : (
                    <Typography fontWeight="medium">
                      Tour Name{" "}
                      <small style={{ color: theme.palette.text.active }}>
                        *
                      </small>
                    </Typography>
                  )}
                </Grid>
                <Grid item sm={12} lg={9}>
                  {loading ? (
                    <Skeleton width="100%" />
                  ) : (
                    <TextField
                      fullWidth
                      size="small"
                      InputProps={{
                        style: {
                          borderRadius: 10,
                        },
                      }}
                      {...register(`tourDescriptions.${index}.name`, {
                        validate: (value) => {
                          return (
                            value.trim() !== "" || "Tour name is not empty!"
                          );
                        },
                        required: "Tour Name is required!",
                      })}
                      error={!!errors.tourDescriptions?.[index]?.name}
                      helperText={
                        errors.tourDescriptions?.[index]?.name?.message
                      }
                      placeholder="Type tour name here"
                    />
                  )}
                </Grid>

                {/* Tour Decription */}
                <Grid item sm={12} lg={3}>
                  {loading ? (
                    <Skeleton width={100} height={30} />
                  ) : (
                    <>
                      <Typography fontWeight="medium">
                        Decription{" "}
                        <small style={{ color: theme.palette.text.active }}>
                          *
                        </small>
                      </Typography>
                      <Typography>
                        <small>Write a short decription</small>
                      </Typography>
                    </>
                  )}
                </Grid>
                <Grid item sm={12} lg={9}>
                  {loading ? (
                    <Skeleton width="100%" height={30} />
                  ) : (
                    <TextField
                      fullWidth
                      rows={7}
                      multiline
                      size="small"
                      InputProps={{
                        style: {
                          borderRadius: 10,
                        },
                      }}
                      {...register(`tourDescriptions.${index}.description`, {
                        validate: (value) => {
                          return (
                            value.trim() !== "" || "Description is not empty!"
                          );
                        },
                        required: "Description is required!",
                      })}
                      error={!!errors.tourDescriptions?.[index]?.description}
                      helperText={
                        errors.tourDescriptions?.[index]?.description?.message
                      }
                      placeholder="Type description here"
                    />
                  )}
                </Grid>
              </Grid>
              <Divider />
            </Box>
            {fields.length === 1 ? null : loading ? (
              <Skeleton width={100} height={170} />
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
        );
      })}

      <Box marginTop={2} display="flex" justifyContent="center">
        {fields.length < 4 ? (
          loading ? (
            <Skeleton width={200} />
          ) : (
            <Button
              onClick={() => {
                if (fields.length < languagesList.length) {
                  append({ languageCode: "en-us", name: "", description: "" });
                }
              }}
              sx={{ borderRadius: 2.5 }}
            >
              <Add width={20} />
              <Typography fontWeight="medium" fontSize={14}>
                Add More
              </Typography>
            </Button>
          )
        ) : null}
      </Box>
    </>
  );
};

export default SubsLanguage;
