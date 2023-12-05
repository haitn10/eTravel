import { Box, TextField, Typography, Skeleton, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { NumberFormat } from "../../../common/NumberFormat";

import ReactMapGL from "@goongmaps/goong-map-react";
import GoongGeocoder from "@goongmaps/goong-geocoder";
import goongJs from "@goongmaps/goong-js";
import { GOONG_API_KEY, GOONG_MAPTILES_KEY } from "../../../../api";

const MapCoordinates = ({ loading }) => {
  const theme = useTheme();
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState({
    latitude: 10.762622,
    longitude: 106.660172,
    zoom: 11,
    bearing: 0,
    pitch: 0,
  });

  // useEffect(() => {
  //   const geocoder = new GoongGeocoder({
  //     accessToken: GOONG_API_KEY,
  //     goongjs: goongJs,
  //   });

  //   if (mapRef.current && geocoder) {
  //     const map = mapRef.current.getMap();
  //     map.addControl(geocoder);

  //     geocoder.on("result", function (e) {
  //       setViewport({
  //         ...viewport,
  //         latitude: e.result.result.geometry.location.lat,
  //         longitude: e.result.result.geometry.location.lng,
  //       });
  //       setValues({
  //         ...values,
  //         address: e.result.result.formatted_address,
  //         latitude: e.result.result.geometry.location.lat,
  //         longitude: e.result.result.geometry.location.lng,
  //       });
  //     });
  //   }
  // }, []);

  return (
    <Box>
      {loading ? (
        <Skeleton width={150} />
      ) : (
        <Typography
          fontSize={14}
          letterSpacing={0.5}
          fontWeight="medium"
          textTransform="uppercase"
          color={theme.palette.text.third}
        >
          Place in Map
        </Typography>
      )}
      <Box padding={2}>
        {loading ? (
          <Skeleton variant="rounded" width="100%" height={400} />
        ) : (
          <Box
            border={1}
            borderColor={theme.palette.background.third}
            borderRadius={2.5}
            padding={1}
            height={400}
          >
            {/* <ReactMapGL
            {...viewport}
            width="100%"
            height="100%"
            borderRadius={5}
            onViewportChange={setViewport}
            goongApiAccessToken={GOONG_MAPTILES_KEY}
            ref={mapRef}
          /> */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MapCoordinates;
