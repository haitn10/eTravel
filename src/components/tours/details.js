import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Rating,
  Tab,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import { Box } from "@mui/system";
import { Add, HighlightOff } from "@styled-icons/material";

import { createBrowserHistory } from "history";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import moment from "moment/moment";
import { labels } from "../../constants/rating";
import SubsLanguage from "../common/SubsLanguage";
import PlacesList from "../common/PlacesList";

const TourDetails = () => {
  const theme = useTheme();
  const history = createBrowserHistory();
  const [value, setValue] = useState("1");
  const [loading, setLoading] = useState(false);
  const [imagesList, setImagesList] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeImage = (event) => {
    const selectedImageFiles = Array.from(event.target.files);
    const imagesArray = selectedImageFiles.map((file) => {
      return URL.createObjectURL(file);
    });

    setImagesList((prevImages) => prevImages.concat(imagesArray));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(!loading);
  };
  return (
    <Box
      minHeight="95vh"
      margin="1.25em"
      padding={2}
      paddingBottom={10}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
    >
      {/* Title */}
      <Box display="flex" alignItems="center" marginLeft={2} padding={1}>
        <IconButton
          aria-label="back"
          sx={{ border: 1, color: theme.palette.text.buttonText }}
          onClick={() => history.back()}
        >
          <Add width={24} />
        </IconButton>

        <Box marginLeft={2}>
          <Typography
            color={theme.palette.text.active}
            fontWeight="bold"
            fontSize={36}
          >
            Tour Details
          </Typography>
          <Typography
            color={theme.palette.text.third}
            fontWeight="regular"
            fontSize={18}
          >
            Manage all information of tour and update tour.
          </Typography>
        </Box>
      </Box>

      <Box marginTop={3}>
        <TabContext value={value}>
          <Box
            sx={{
              paddingLeft: 4,
              borderBottom: 1,
              borderTop: 1,
              marginBottom: 2,
              borderColor: "divider",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="General" value="1" />
              <Tab label="Languages" value="2" />
              <Tab label="Places List" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <form
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 30,
              }}
              onSubmit={onSubmit}
            >
              <Grid
                container
                width="80%"
                display="flex"
                alignItems="center"
                rowGap={5}
              >
                {/* Tour Name Default */}
                <Grid item xs={4}>
                  <Typography fontWeight="medium">Tour Name</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    inputProps={{ style: { height: "1em" } }}
                    InputProps={{
                      style: {
                        borderRadius: 10,
                        backgroundColor: theme.palette.background.secondary,
                      },
                    }}
                    disabled
                  />
                </Grid>

                {/* Images */}
                <Grid item xs={4}>
                  <Typography fontWeight="medium">Images</Typography>
                </Grid>
                <Grid item xs={8}>
                  {imagesList.length !== 0 ? (
                    <Box
                      sx={{
                        display: "flex",
                        maxHeight: 220,
                        maxWidth: "100%",
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
                            background: alpha(
                              theme.palette.background.hovered,
                              0.25
                            ),
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

                          <Typography fontWeight="medium">
                            Add Images
                          </Typography>
                          <input
                            type="file"
                            hidden
                            multiple
                            accept="image/*"
                            onChange={(event) => handleChangeImage(event)}
                          />
                        </Button>
                      </Box>
                      {imagesList.reverse().map((item, index) => (
                        <Box
                          key={index}
                          position="relative"
                          minWidth={200}
                          border={1}
                          borderRadius={2.5}
                          borderColor={theme.palette.background.third}
                        >
                          <img
                            src={item}
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
                              setImagesList(
                                imagesList.filter((e) => e !== item)
                              )
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
                      inputProps={{
                        style: { height: "1em" },
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
                      onChange={(event) => handleChangeImage(event)}
                    />
                  )}
                </Grid>

                {/* Rating */}
                <Grid item xs={4}>
                  <Typography fontWeight="medium">Rate</Typography>
                </Grid>
                <Grid item xs={8} display="flex" alignItems="center">
                  <Rating
                    name="disabled"
                    value={4.5}
                    precision={0.5}
                    readOnly
                    sx={{
                      ".MuiRating-icon": {
                        borderColor: theme.palette.text.active,
                      },
                      "& .MuiRating-iconFilled": {
                        color: theme.palette.text.active,
                      },
                    }}
                  />
                  <Box sx={{ marginX: 1 }}>{labels[value]}</Box>
                  <Typography>(5 rates)</Typography>
                </Grid>

                {/* Time */}
                <Grid item xs={4}>
                  <Typography fontWeight="medium">
                    Create/Update Time
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography fontWeight="regular">
                    {moment(Date.now()).format("MMMM DD, YYYY")}/
                    {moment(Date.now()).format("MMMM DD, YYYY")}
                  </Typography>
                </Grid>

                {/* Status */}
                <Grid item xs={4}>
                  <Typography fontWeight="medium">Status</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    fontWeight="semiBold"
                    color={theme.palette.text.onStatus}
                  >
                    Active
                  </Typography>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                disabled={loading}
                color="error"
                sx={{
                  marginTop: "30px",
                  borderRadius: "50px",
                  width: "250px",
                  height: "45px",
                }}
                type="submit"
              >
                {loading ? (
                  <CircularProgress color="error" size={25} />
                ) : (
                  <Typography fontWeight="semiBold" fontSize={18}>
                    Save Change
                  </Typography>
                )}
              </Button>
            </form>
          </TabPanel>
          <TabPanel value="2">
            {/* <Box paddingX={3}>
              <Typography color="error" fontWeight="medium">
                (Get{" "}
                <a color="error" href="http://">
                  code
                </a>{" "}
                for Voice File)
              </Typography>
            </Box> */}
            <form
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 30,
              }}
              onSubmit={onSubmit}
            >
              <SubsLanguage languague={"English"} />
              <Button
                variant="contained"
                disabled={loading}
                color="error"
                sx={{
                  marginTop: "30px",
                  borderRadius: "50px",
                  width: "250px",
                  height: "45px",
                }}
                type="submit"
              >
                {loading ? (
                  <CircularProgress color="error" size={25} />
                ) : (
                  <Typography fontWeight="semiBold" fontSize={18}>
                    Save Change
                  </Typography>
                )}
              </Button>
            </form>
          </TabPanel>
          <TabPanel value="3">
            <form
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 30,
              }}
              onSubmit={onSubmit}
            >
              <PlacesList />
              <Button
                variant="contained"
                disabled={loading}
                color="error"
                sx={{
                  marginTop: "30px",
                  borderRadius: "50px",
                  width: "250px",
                  height: "45px",
                }}
                type="submit"
              >
                {loading ? (
                  <CircularProgress color="error" size={25} />
                ) : (
                  <Typography fontWeight="semiBold" fontSize={18}>
                    Save Change
                  </Typography>
                )}
              </Button>
            </form>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default TourDetails;
