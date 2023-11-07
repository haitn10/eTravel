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
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllLanguages } from "../../../languages/action";

import { Voiceprint } from "@styled-icons/remix-fill";
import { Trash3 } from "@styled-icons/bootstrap";
import ReactPlayer from "react-player";

const MultiLanguages = ({ values, setValues, errors }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [descriptionsList, setDescriptionsList] = useState(
    values.placeDescriptions
  );
  const [languagesList, setLanguagesList] = useState([]);

  useEffect(() => {
    async function getInfo() {
      try {
        const langsList = await dispatch(getAllLanguages());
        setLanguagesList(langsList.languages);
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
  }, [dispatch]);

  const addToSelectLanguagesList = () => {
    const value = [...descriptionsList];
    if (value.length < descriptionsList.length) {
      setDescriptionsList([
        ...value,
        { languageCode: "en-us", name: "", description: "" },
      ]);
    }
  };

  const removeToSelectLanguagesList = (index) => {
    const value = [...descriptionsList];
    value.splice(index, 1);
    setDescriptionsList(value);
  };

  const handleChangeDescs = (index, event) => {
    const value = [...descriptionsList];
    value[index][event.target.name] = event.target.value;
    setDescriptionsList(value);
  };

  const handleChangeFile = (index, event) => {
    const data = [...values.placeDescriptions];
    if (!event.target.files) {
      data[index][event.target.name] = event.target.value;
    } else {
      data[index][event.target.name] = event.target.files[0];
    }
    setValues({ ...values, placeDescriptions: data });
  };

  return (
    <Box>
      {descriptionsList.map((description, index) => (
        <Box key={index} display="flex" justifyContent="center">
          <Box>
            <Grid container rowGap={2} marginY={5}>
              <Grid item sm={12} lg={3}>
                <Typography fontWeight="medium">
                  Choose Language{" "}
                  <small style={{ color: theme.palette.text.active }}>*</small>
                </Typography>
              </Grid>
              <Grid item sm={12} lg={9}>
                <FormControl fullWidth size="small">
                  <Select
                    sx={{ borderRadius: 2.5 }}
                    value={description.languageCode.trim()}
                    name="languageCode"
                    onChange={(event) => handleChangeDescs(index, event)}
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
                  <small style={{ color: theme.palette.text.active }}>*</small>
                </Typography>
              </Grid>
              <Grid item sm={12} lg={9}>
                <TextField
                  fullWidth
                  size="small"
                  name="name"
                  value={description.name}
                  onChange={(event) => handleChangeDescs(index, event)}
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
                  <small style={{ color: theme.palette.text.active }}>*</small>
                </Typography>
                <Typography>
                  <small>Write a short decription</small>
                </Typography>
              </Grid>
              <Grid item sm={12} lg={9}>
                <TextField
                  fullWidth
                  name="description"
                  value={description.description}
                  onChange={(event) => handleChangeDescs(index, event)}
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

              {/* Voice File */}
              <Grid item sm={12} lg={3}>
                <Typography fontWeight="medium">
                  Voice File{" "}
                  <small style={{ color: theme.palette.text.active }}>*</small>
                </Typography>
              </Grid>
              <Grid item xs={9} md={6}>
                <ReactPlayer
                  url={description.voiceFile}
                  controls={true}
                  height={40}
                  width="100%"
                />
              </Grid>
              <Grid item xs={3} md={3}>
                <Button
                  component="label"
                  variant="contained"
                  sx={{
                    marginLeft: 2,
                    borderRadius: 2.5,
                    width: "85%",
                  }}
                >
                  <Voiceprint width={16} style={{ marginRight: 5 }} />
                  <Typography noWrap>Change Voice File</Typography>
                  <input
                    hidden
                    multiple
                    name="voiceFile"
                    onChange={(event) => handleChangeFile(index, event)}
                    type="file"
                    accept="audio/mpeg, audio/mp3"
                  />
                </Button>

                <FormHelperText
                  htmlFor="render-select"
                  style={{ marginLeft: 14 }}
                  error
                ></FormHelperText>
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

export default MultiLanguages;
