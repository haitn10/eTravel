import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import ReactPlayer from "react-player";

import { Voiceprint } from "@styled-icons/remix-fill";
import { Add } from "@styled-icons/ionicons-outline";
import { Trash3 } from "@styled-icons/bootstrap";
import { CloseOutline } from "@styled-icons/evaicons-outline";

import { checkDuplicateName } from "../../action";

const MultiLanguages = ({
  language,
  loading,
  control,
  register,
  resetField,
  errors,
  getValues,
}) => {
  const theme = useTheme();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "placeDescriptions",
  });

  const hasDuplicate = () => {
    const formData = getValues();
    const languageCodes = new Set();
    for (const data of formData.placeDescriptions) {
      if (languageCodes.has(data.languageCode)) {
        return false;
      }
      languageCodes.add(data.languageCode);
    }

    return true;
  };

  const hasDuplicateVoiceFile = async (nameFile) => {
    console.log(nameFile);

    const data = getValues("placeDescriptions");
    console.log(data);
    const voiceFile = new Set();
    for (const value of data) {
      if (value.voiceFile instanceof File) {
        if (voiceFile.has(value.voiceFile.name)) {
          return false;
        }
        voiceFile.add(value.voiceFile.name);
      }
    }

    if (nameFile !== undefined && nameFile !== "") {
      nameFile = nameFile.slice(0, -4);
      try {
        await checkDuplicateName(nameFile);
        return true;
      } catch (err) {
        return false;
      }
    }
    return true;
  };

  console.log(errors);

  return (
    <>
      {fields.map((description, index) => (
        <Box
          key={description.id}
          display="flex"
          justifyContent="center"
          padding={1}
        >
          <Box>
            <Grid container spacing={2} marginY={2}>
              {/* Language */}
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
                    name={`placeDescriptions[${index}].languageCode`}
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
                          error={!!error}
                        >
                          {language.map((item) => (
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

              {/* Tour Name */}
              <Grid item sm={12} lg={3}>
                {loading ? (
                  <Skeleton width={100} />
                ) : (
                  <Typography fontWeight="medium">
                    Place Name{" "}
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
                    {...register(`placeDescriptions.${index}.name`, {
                      validate: (value) => {
                        return (
                          value.trim() !== "" || "Place name is not empty!"
                        );
                      },
                      required: "Place Name is required!",
                    })}
                    error={!!errors.placeDescriptions?.[index]?.name}
                    helperText={
                      errors.placeDescriptions?.[index]?.name?.message
                    }
                    placeholder="Type place name here"
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
                    {...register(`placeDescriptions.${index}.description`, {
                      validate: (value) => {
                        return (
                          value.trim() !== "" || "Description is not empty!"
                        );
                      },
                      required: "Description is required!",
                    })}
                    error={!!errors.placeDescriptions?.[index]?.description}
                    helperText={
                      errors.placeDescriptions?.[index]?.description?.message
                    }
                    placeholder="Type description here"
                  />
                )}
              </Grid>

              {/* Voice File */}
              <Grid item sm={12} lg={3}>
                <Typography fontWeight="medium">
                  Voice File{" "}
                  <small style={{ color: theme.palette.text.active }}>*</small>
                </Typography>
              </Grid>
              <Grid item sm={12} lg={9}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Button
                    component="label"
                    sx={{ borderRadius: 2.5, width: 180, height: 35, gap: 0.5 }}
                    htmlFor={`placeDescriptions.${index}.voiceFile`}
                    variant="contained"
                  >
                    <Voiceprint width={20} />
                    <Typography fontSize={14}>Change File</Typography>
                  </Button>
                  <Controller
                    name={`placeDescriptions.${index}.voiceFile`}
                    control={control}
                    rules={{
                      required: "Voice file is required!",
                      validate: (value) => {
                        return hasDuplicateVoiceFile(value.name);
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <input
                          id={`placeDescriptions.${index}.voiceFile`}
                          type="file"
                          hidden
                          onChange={(e) => field.onChange(e.target.files[0])}
                          accept="audio/mpeg, audio/mp3"
                        />

                        {field.value instanceof File ? (
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            width="100%"
                          >
                            {field.value.name}
                            <IconButton
                              onClick={(e) =>
                                resetField(
                                  `placeDescriptions.${index}.voiceFile`
                                )
                              }
                            >
                              <CloseOutline width={24} />
                            </IconButton>
                          </Box>
                        ) : (
                          <ReactPlayer
                            url={description.voiceFile}
                            controls={true}
                            height={40}
                            width="100%"
                          />
                        )}
                      </>
                    )}
                  />
                </Box>

                <FormHelperText
                  error
                  htmlFor={`placeDescriptions.${index}.voiceFile`}
                >
                  {errors?.placeDescriptions?.[index]?.voiceFile?.type === "validate"
                    ? "This file name already exists in the system!"
                    : errors?.placeDescriptions?.[index]?.voiceFile?.message}
                </FormHelperText>
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
      ))}
      <Box marginTop={2} display="flex" justifyContent="center">
        {fields.length < language.length ? (
          loading ? (
            <Skeleton width={200} />
          ) : (
            <Button
              onClick={() => {
                if (fields.length < language.length) {
                  append({
                    languageCode: "en-us",
                    name: "",
                    description: "",
                    voiceFile: null,
                  });
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

export default MultiLanguages;
