import {
  Box,
  Grid,
  TextField,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import React from "react";
import { CloudCheckFill } from "styled-icons/bootstrap";
import { CloudUploadOutline } from "styled-icons/evaicons-outline";

const TourGeneral = ({ values, setValues }) => {
  const theme = useTheme();

  return (
    <Box padding={5} marginX={10}>
      <Box marginBottom={3}>
        <Typography color="error">
          (Data default in English language)
        </Typography>
      </Box>
      <Grid container rowGap={5}>
        {/* Tour Name */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Tour Name</Typography>
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
            value={values.name}
            onChange={(e) =>
              setValues({
                ...values,
                name: e.target.value,
              })
            }
            placeholder="Type tour name here"
          />
        </Grid>

        {/* Tour Decription */}
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
            value={values.description}
            onChange={(e) =>
              setValues({
                ...values,

                description: e.target.value,
              })
            }
            placeholder="Type description here"
            multiline={true}
            rows={5}
          />
        </Grid>

        {/* Tour Image */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Symbolic Picture</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            display="flex"
            alignItems="center"
            position="relative"
            overflow="hidden"
            border={1}
            borderRadius={2.5}
            borderColor={alpha(theme.palette.text.primary, 0.28)}
            height={40}
          >
            <label
              htmlFor="image"
              style={{
                display: "flex",
                color: theme.palette.text.third,
                cursor: "pointer",
              }}
            >
              {values.image ? (
                <Box display="flex" alignItems="center">
                  <CloudCheckFill
                    height={24}
                    color={theme.palette.text.onStatus}
                    style={{ margin: 10 }}
                  />
                  <Typography noWrap>{values.image.name}</Typography>
                </Box>
              ) : (
                <Box display="flex" alignItems="center">
                  <CloudUploadOutline height={24} style={{ margin: 10 }} />
                  <Typography noWrap>Import picture for tour here</Typography>
                </Box>
              )}

              <input
                id="image"
                style={{
                  opacity: 0,
                  position: "absolute",
                }}
                onChange={(e) =>
                  setValues({ ...values, image: e.target.files[0] })
                }
                type="file"
                accept="image/*"
              />
            </label>
          </Box>
          <Box marginTop={2}>
            <img
              src={values.image && URL.createObjectURL(values.image)}
              style={{
                maxWidth: "100%",
                maxHeight: 300,
              }}
              alt=""
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TourGeneral;
