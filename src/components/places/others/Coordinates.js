import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { LocalizationProvider, TimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Add, Remove } from "styled-icons/material";
import date from "../../../constants/date";
import { NumberFormat } from "../../common/NumberFormat";
import dayjs from "dayjs";

const Coordinates = ({ values, setValues, errors, register }) => {
  const theme = useTheme();
  const center = useMemo(() => ({ lat: 10.8231, lng: 106.6297 }), []);
  const [marker, setMarker] = useState(null);

  const GOOGLE_MAPS_API_KEY = "AIzaSyBjPGn7vYkFkFXgJpNNwl0xfguUw2kOcgo";

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    // libraries: ["places"],
  });
  const handleChangeDay = (index, event) => {
    const dataTime = [...values.placeTimes];
    dataTime[index][event.target.name] = event.target.value;
    setValues({ ...values, placeTimes: dataTime });
  };

  const handleChangeTime = (index, name, value) => {
    const dataTime = [...values.placeTimes];
    dataTime[index][name] = dayjs(value).format("HH:mm:ss");
    setValues({ ...values, placeTimes: dataTime });
  };

  const handleNewTime = () => {
    const dataTime = [...values.placeTimes];
    if (dataTime.length < date.length) {
      dataTime.push({
        daysOfWeek: 1,
        openTime: "01:00:00",
        endTime: "01:00:00",
      });
      setValues({ ...values, placeTimes: dataTime });
    }
  };

  const handleRemoveTime = (index) => {
    const value = [...values.placeTimes];
    value.splice(index, 1);
    setValues({ ...values, placeTimes: value });
  };

  const onMapClick = async (e) => {
    try {
      const result = await getGeocode({ placeId: e.placeId });
      const { lat, lng } = await getLatLng(result[0]);
      setMarker({
        lat: lat,
        lng: lng,
      });
      setValues({
        ...values,
        latitude: lat,
        longitude: lng,
        googlePlaceId: e.placeId,
      });
    } catch (err) {}
  };
  console.log(values);

  if (!isLoaded) return <></>;

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
      <Box marginBottom={3} display="flex" gap={3}>
        <Box
          padding={2}
          minWidth="50%"
          flexGrow={1}
          minHeight={500}
          borderRadius={2.5}
          bgcolor={theme.palette.background.secondary}
        >
          <GoogleMap
            zoom={11}
            center={center}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            onClick={onMapClick}
          >
            {marker && <Marker position={marker} />}
          </GoogleMap>
        </Box>

        <Box flexGrow={2} maxWidth="50%">
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
            <Grid item md={12} lg={4}>
              <Typography>
                Latitude{" "}
                <small style={{ color: theme.palette.text.active }}>*</small>
              </Typography>
            </Grid>
            <Grid item md={12} lg={8}>
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
            <Grid item md={12} lg={4}>
              <Typography>
                Longitude{" "}
                <small style={{ color: theme.palette.text.active }}>*</small>
              </Typography>
            </Grid>
            <Grid item md={12} lg={8}>
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
            <Grid item md={12} lg={4}>
              <Typography>
                GooglePlaceID{" "}
                <small style={{ color: theme.palette.text.active }}>*</small>
              </Typography>
            </Grid>
            <Grid item md={12} lg={8}>
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

          <Box marginTop={3}>
            <Typography fontWeight={"semiBold"} textTransform={"uppercase"}>
              Date Of Week
            </Typography>

            <Box marginTop={2} paddingX={3}>
              {values.placeTimes.map((data, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="center"
                  gap={3}
                  marginY={1}
                >
                  <FormControl fullWidth size="small">
                    <Select
                      sx={{ borderRadius: 2.5 }}
                      value={data.daysOfWeek}
                      name="daysOfWeek"
                      onChange={(event) => handleChangeDay(index, event)}
                    >
                      {date.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.time}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimeField
                      fullWidth
                      size="small"
                      name="openTime"
                      value={dayjs(data.openTime, {
                        format: "HH:mm:ss",
                      }).format("hh:mm A")}
                      InputProps={{
                        style: {
                          borderRadius: 10,
                        },
                      }}
                      onChange={(newValue) =>
                        handleChangeTime(index, "openTime", newValue)
                      }
                      format="hh:mm a"
                    />
                    <TimeField
                      fullWidth
                      size="small"
                      name="endTime"
                      value={dayjs(data.endTime, { format: "HH:mm:ss" }).format(
                        "hh:mm A"
                      )}
                      InputProps={{
                        style: {
                          borderRadius: 10,
                        },
                      }}
                      onChange={(newValue, name) =>
                        handleChangeTime(index, "endTime", newValue)
                      }
                      format="hh:mm a"
                    />
                  </LocalizationProvider>

                  <IconButton onClick={() => handleRemoveTime(index)}>
                    <Remove width={24} />
                  </IconButton>
                </Box>
              ))}

              {values.placeTimes.length === date.length ? null : (
                <Button onClick={handleNewTime} color="error">
                  <Add width={24} />
                  Add date times
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Coordinates;
