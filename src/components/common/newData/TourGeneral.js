import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Add, HighlightOff } from "@styled-icons/material";

const TourGeneral = () => {
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
    <Box padding={5} marginX={10}>
      <Box marginBottom={3}>
        <Typography color="error">
          (Data default in English language)
        </Typography>
      </Box>
      <Grid container rowGap={5}>
        {/* Tour Name Default */}
        <Grid item xs={12} md={4}>
          <Typography fontWeight="medium">Tour Name</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            inputProps={{ style: { height: "1em" } }}
            InputProps={{
              style: {
                borderRadius: 10,
              },
            }}
            placeholder="Type tour name here"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Decription</Typography>
          <Typography variant="p">Write a short decription</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            InputProps={{
              style: {
                borderRadius: 10,
              },
            }}
            placeholder="Type description here"
            multiline={true}
            rows={5}
          />
        </Grid>

        {/* Images */}
        <Grid item xs={12} md={4}>
          <Typography fontWeight="medium">Images</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
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
      </Grid>
    </Box>
  );
};

export default TourGeneral;
