import React, { useState } from "react";
import {
  Box,
  Grid,
  FormControl,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
  alpha,
  useTheme,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { Add, HighlightOff } from "styled-icons/material";

const PlaceGeneral = ({ values, setValues }) => {
  const theme = useTheme();
  const [imagesList, setImagesList] = useState([]);

  const handleChangeImage = (event) => {
    const selectedImageFiles = Array.from(event.target.files);
    const imagesArray = selectedImageFiles.map((file) => {
      return URL.createObjectURL(file);
    });

    setImagesList((prevImages) => prevImages.concat(imagesArray));
  };

  return (
    <Box padding={5} marginX={20}>
      <Box marginBottom={3}>
        <Typography color="error">
          (Data default in English language)
        </Typography>
      </Box>
      <Grid container rowGap={5}>
        {/* Tour Name */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Duration</Typography>
          <Typography>
            <small>Estimated place completion time</small>
          </Typography>
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
          <Typography variant="h6">Price</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <FormControl fullWidth>
            <OutlinedInput
              sx={{
                borderRadius: 2.5,
              }}
              size="small"
              value={values.price}
              onChange
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        </Grid>

        {/* Tour Decription */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6">
            Entry Ticket <small>(if have)</small>
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <FormControl fullWidth>
            <OutlinedInput
              sx={{
                borderRadius: 2.5,
              }}
              size="small"
              value={values.price}
              onChange
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <Typography fontWeight="medium">Category</Typography>
        </Grid>
        <Grid item xs={8}>
          <FormControl fullWidth size="small" noValidate>
            <Select
              sx={{ borderRadius: 2.5 }}
              name="values"
              defaultValue=""
              // onChange={handleChange}
              // error={!!errors?.values}
            >
              <MenuItem value="">Item</MenuItem>
            </Select>
          </FormControl>
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
                    background: alpha(theme.palette.background.hovered, 0.25),
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

                  <Typography fontWeight="medium">Add Images</Typography>
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
                      setImagesList(imagesList.filter((e) => e !== item))
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
              size="small"
              inputProps={{
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
      </Grid>
    </Box>
  );
};

export default PlaceGeneral;
