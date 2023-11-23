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
import React, { useState } from "react";
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
  errors,
  getValues,
}) => {
  const theme = useTheme();
  const [isDuplicateName, setIsDuplicateName] = useState(true);
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
    const formData = getValues();
    const languageCodes = new Set();
    for (const data of formData.placeDescriptions) {
      if (languageCodes.has(data.voiceFile?.name)) {
        return setIsDuplicateName(false);
      }
      languageCodes.add(data.voiceFile?.name);
    }

    if (nameFile !== undefined && nameFile !== "") {
      nameFile = nameFile.slice(0, -4);
      try {
        await checkDuplicateName(nameFile);
        return setIsDuplicateName(true);
      } catch (err) {
        return setIsDuplicateName(false);
      }
    }
    return;
  };

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
              <Grid item sm={12} lg={9} alignItems="center">
                <Controller
                  name={`placeDescriptions.${index}.voiceFile`}
                  control={control}
                  rules={{
                    required: "Voice file is required!",
                    validate: (e) => {
                      if (e instanceof File) {
                        hasDuplicateVoiceFile(e.name);
                        return (
                          isDuplicateName ||
                          "This file name already exists in the system!"
                        );
                      } else return;
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Button
                          component="label"
                          variant="contained"
                          sx={{
                            borderRadius: 2.5,
                          }}
                        >
                          <Box display="flex" gap={1}>
                            <Voiceprint width={16} />
                            <Typography fontSize={14} noWrap>
                              Change File
                            </Typography>
                          </Box>
                          <input
                            type="file"
                            hidden
                            onChange={(e) => field.onChange(e.target.files[0])}
                            accept="audio/mpeg, audio/mp3"
                          />
                        </Button>
                        <Box width="100%">
                          {field.value instanceof File ? (
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              {field.value.name}
                              <IconButton
                                onClick={() =>
                                  field.onChange(description.voiceFile)
                                }
                              >
                                <CloseOutline width={20} />
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
                        </Box>
                      </Box>
                      <FormHelperText htmlFor="render-select" error>
                        {error?.message}
                      </FormHelperText>
                    </>
                  )}
                />
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
