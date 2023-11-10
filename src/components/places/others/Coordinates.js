import React, { useState } from "react";
import { Box, Grid, TextField, Typography, useTheme } from "@mui/material";

import date from "../../../constants/date";
import { NumberFormat } from "../../common/NumberFormat";
import MapGL from "@goongmaps/goong-map-react";

const GOONG_MAPTILES_KEY = "foAIsmKSYDQOdkoRfIj1T1MbkKaIIq5vvwSXb50U";

const Coordinates = ({ values, setValues, errors, register }) => {
  const theme = useTheme();
  const [daysOfWeek, setDaysOfWeek] = useState(date);
  const [viewport, setViewport] = useState({
    latitude: 10.762622,
    longitude: 106.660172,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });

  const handleChangeTime = (index, event) => {
    const dataTime = [...daysOfWeek];
    dataTime[index][event.target.name] = event.target.value;
    setDaysOfWeek(dataTime);
    setValues({ ...values, placeTimes: dataTime });
  };

  return (
    <Box paddingX={4} width="100%">
      <Box marginBottom={3}>
        <Typography color="error">
          (You can select place in map to get item)
        </Typography>
      </Box>

      <Box maxWidth="50%" marginBottom={2}>
        {/* {!isLoaded ? <PlaceAutocomplete setMarker={setMarker} /> : "Loading..."} */}
      </Box>
      <Grid container marginBottom={3} spacing={7}>
        <Grid item xs={12} lg={6}>
          <Box
            margin={1}
            padding={2}
            minHeight={500}
            borderRadius={2.5}
            bgcolor={theme.palette.background.secondary}
            width="100%"
          >
            <MapGL
              {...viewport}
              width="100%"
              height="50vh"
              // mapStyle="https://tiles.goong.io/assets/goong_map_dark.json"
              onViewportChange={setViewport}
              goongApiAccessToken={GOONG_MAPTILES_KEY}
            />
          </Box>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Box>
            <Typography fontWeight={"semiBold"} textTransform={"uppercase"}>
              Location
            </Typography>
            <Grid container rowGap={2} paddingX={3} marginTop={2}>
              {/* Place Address */}
              <Grid item xs={12} md={4}>
                <Typography>
                  Place Address{" "}
                  <small style={{ color: theme.palette.text.active }}>*</small>
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  size="small"
                  InputProps={{
                    style: {
                      borderRadius: 10,
                    },
                  }}
                  value={values.address}
                  {...register("address", {
                    required: "Address is required!",
                    onChange: (e) =>
                      setValues({ ...values, address: e.target.value }),
                  })}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  placeholder={`Type place address here`}
                />
              </Grid>
              {/* Latitude */}
              <Grid item xs={12} md={4}>
                <Typography>
                  Latitude{" "}
                  <small style={{ color: theme.palette.text.active }}>*</small>
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  size="small"
                  name="latitude"
                  value={values.latitude}
                  {...register("latitude", {
                    required: "Latitude is required!",
                    defaultValue: 0,
                    onChange: (e) =>
                      setValues({ ...values, latitude: e.target.value }),
                  })}
                  error={!!errors.latitude}
                  helperText={errors.latitude?.message}
                  InputProps={{
                    style: {
                      borderRadius: 10,
                    },
                    inputComponent: NumberFormat,
                  }}
                  placeholder={`Type latitude here`}
                />
              </Grid>

              {/* Longitude */}
              <Grid item xs={12} md={4}>
                <Typography>
                  Longitude{" "}
                  <small style={{ color: theme.palette.text.active }}>*</small>
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  size="small"
                  value={values.longitude}
                  {...register("longitude", {
                    required: "Longitude is required!",
                    defaultValue: 0,
                    onChange: (e) =>
                      setValues({ ...values, longitude: e.target.value }),
                  })}
                  error={!!errors.longitude}
                  helperText={errors.longitude?.message}
                  InputProps={{
                    style: {
                      borderRadius: 10,
                    },
                    inputComponent: NumberFormat,
                  }}
                  placeholder={`Type longitude here`}
                />
              </Grid>

              {/* GooglePlaceID */}
              <Grid item xs={12} md={4}>
                <Typography>
                  GooglePlaceID{" "}
                  <small style={{ color: theme.palette.text.active }}>*</small>
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  size="small"
                  value={values.googlePlaceId}
                  {...register("googlePlaceId", {
                    required: "Google Place ID is required!",
                    defaultValue: "",
                    onChange: (e) =>
                      setValues({ ...values, googlePlaceId: e.target.value }),
                  })}
                  error={!!errors.googlePlaceId}
                  helperText={errors.googlePlaceId?.message}
                  InputProps={{
                    style: {
                      borderRadius: 10,
                    },
                  }}
                  placeholder={`Type google placeID here`}
                />
              </Grid>
            </Grid>
          </Box>

          <Box marginTop={3}>
            <Typography fontWeight={"semiBold"} textTransform={"uppercase"}>
              Date Of Week
            </Typography>

            {daysOfWeek.map((data, index) => (
              <Grid
                key={index}
                container
                paddingX={3}
                marginTop={1}
                spacing={1}
              >
                <Grid item xs={4}>
                  <Typography width={100}>{data.day}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    required
                    size="small"
                    type="time"
                    name="openTime"
                    value={data.openTime}
                    onChange={(event) => handleChangeTime(index, event)}
                    InputProps={{
                      style: {
                        borderRadius: 10,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    required
                    size="small"
                    type="time"
                    name="endTime"
                    value={data.endTime}
                    onChange={(event) => handleChangeTime(data.id, event)}
                    InputProps={{
                      style: {
                        borderRadius: 10,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Coordinates;
