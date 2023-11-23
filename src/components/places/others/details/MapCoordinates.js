import { Box, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { NumberFormat } from "../../../common/NumberFormat";

import ReactMapGL from "@goongmaps/goong-map-react";
import GoongGeocoder from "@goongmaps/goong-geocoder";
import goongJs from "@goongmaps/goong-js";
import { GOONG_API_KEY, GOONG_MAPTILES_KEY } from "../../../../api";

const MapCoordinates = ({ values, setValues, register, errors }) => {
  const theme = useTheme();
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState({
    latitude: 10.762622,
    longitude: 106.660172,
    zoom: 11,
    bearing: 0,
    pitch: 0,
  });

  useEffect(() => {
    const geocoder = new GoongGeocoder({
      accessToken: GOONG_API_KEY,
      goongjs: goongJs,
    });

    if (mapRef.current && geocoder) {
      const map = mapRef.current.getMap();
      map.addControl(geocoder);

      geocoder.on("result", function (e) {
        setViewport({
          ...viewport,
          latitude: e.result.result.geometry.location.lat,
          longitude: e.result.result.geometry.location.lng,
        });
        setValues({
          ...values,
          address: e.result.result.formatted_address,
          latitude: e.result.result.geometry.location.lat,
          longitude: e.result.result.geometry.location.lng,
        });
      });
    }

    // return () => {
    //   geocoder.onRemove();
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Box marginBottom={1}>
        <Typography
          fontSize={14}
          letterSpacing={0.5}
          fontWeight="medium"
          textTransform="uppercase"
          color={theme.palette.text.third}
        >
          Location in Maps
        </Typography>
      </Box>
      <Box padding={1}>
        <Box
          border={1}
          borderColor={theme.palette.background.third}
          borderRadius={2.5}
          padding={1}
          height={400}
        >
          <ReactMapGL
            {...viewport}
            width="100%"
            height="100%"
            borderRadius={5}
            onViewportChange={setViewport}
            goongApiAccessToken={GOONG_MAPTILES_KEY}
            ref={mapRef}
          />
        </Box>
      </Box>

      <Box display="flex" alignItems="center" paddingX={2} marginTop={2}>
        <Box>
          <Typography
            fontWeight="medium"
            width={100}
            color={theme.palette.text.third}
          >
            Address{" "}
            <small style={{ color: theme.palette.text.active }}>*</small>
          </Typography>
        </Box>
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
            required: "Place Address is required!",
            onChange: (e) =>
              setValues({
                ...values,
                address: e.target.value,
              }),
          })}
          error={!!errors.address}
          helperText={errors.address?.message}
          placeholder={`Type place name here`}
        />
      </Box>

      <Box display="flex" alignItems="center" paddingX={2} marginTop={2}>
        <Box>
          <Typography
            fontWeight="medium"
            width={100}
            color={theme.palette.text.third}
          >
            Longitude{" "}
            <small style={{ color: theme.palette.text.active }}>*</small>
          </Typography>
        </Box>
        <TextField
          fullWidth
          size="small"
          name="latitude"
          InputProps={{
            style: {
              borderRadius: 10,
            },
            inputComponent: NumberFormat,
          }}
          value={values.longitude}
          {...register("longitude", {
            required: "Longitude is required!",
            onChange: (e) =>
              setValues({
                ...values,
                longitude: Number(e.target.value),
              }),
          })}
          error={!!errors.longitude}
          helperText={errors.longitude?.message}
          placeholder={`Type longitude here`}
        />
      </Box>

      <Box display="flex" alignItems="center" paddingX={2} marginTop={2}>
        <Box>
          <Typography
            fontWeight="medium"
            width={100}
            color={theme.palette.text.third}
          >
            Latitude{" "}
            <small style={{ color: theme.palette.text.active }}>*</small>
          </Typography>
        </Box>
        <TextField
          fullWidth
          size="small"
          InputProps={{
            style: {
              borderRadius: 10,
            },
            inputComponent: NumberFormat,
          }}
          value={values.latitude}
          {...register("latitude", {
            required: "Latitude is required!",
            onChange: (e) =>
              setValues({
                ...values,
                latitude: Number(e.target.value),
              }),
          })}
          error={!!errors.latitude}
          helperText={errors.latitude?.message}
          placeholder={`Type latitude here`}
        />
      </Box>

      <Box display="flex" alignItems="center" paddingX={2} marginTop={2}>
        <Box>
          <Typography
            fontWeight="medium"
            width={100}
            color={theme.palette.text.third}
          >
            Google Place ID
          </Typography>
        </Box>
        <TextField
          fullWidth
          size="small"
          InputProps={{
            style: {
              borderRadius: 10,
            },
          }}
          value={values.googlePlaceId}
          {...register("googlePlaceId", {
            onChange: (e) =>
              setValues({
                ...values,
                googlePlaceId: e.target.value,
              }),
          })}
          placeholder={`Type Google Place ID here`}
        />
      </Box>
    </Box>
  );
};

export default MapCoordinates;
