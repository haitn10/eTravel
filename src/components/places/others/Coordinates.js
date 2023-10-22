import React, { useState } from "react";
import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
  useTheme,
} from "@mui/material";

import { Search } from "@styled-icons/evaicons-solid";

const Coordinates = ({ values, setValues }) => {
  const theme = useTheme();
  return (
    <Box padding={4} width="100%">
      <Box marginBottom={3}>
        <Typography color="error">
          (You can select place in map to get data)
        </Typography>
      </Box>

      <Box maxWidth={300} marginBottom={2}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search width={24} />
              </InputAdornment>
            ),
            style: {
              borderRadius: 10,
            },
          }}
          size="small"
          fullWidth
          placeholder="Search..."
        />
      </Box>
      <Box marginBottom={3} display="flex" gap={3}>
        <Box
          padding={2}
          minWidth="50%"
          maxHeight={500}
          flexGrow={2}
          bgcolor={theme.palette.background.secondary}
        >
          Map
        </Box>
        <Box flexGrow={1}>
          <Grid container rowGap={3}>
            {/* Tour Name */}
            <Grid item xs={12} md={4}>
              <Typography>Latitude</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                size="small"
                value={""}
                InputProps={{
                  style: {
                    borderRadius: 10,
                  },
                }}
                placeholder={`Type name here`}
              />
            </Grid>

            {/* Tour Name */}
            <Grid item xs={12} md={4}>
              <Typography>Longitude</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                size="small"
                value={""}
                InputProps={{
                  style: {
                    borderRadius: 10,
                  },
                }}
                placeholder={`Type name here`}
              />
            </Grid>

            {/* Tour Name */}
            <Grid item xs={12} md={4}>
              <Typography>GooglePlaceID</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                size="small"
                value={""}
                InputProps={{
                  style: {
                    borderRadius: 10,
                  },
                }}
                placeholder={`Type name here`}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Coordinates;
