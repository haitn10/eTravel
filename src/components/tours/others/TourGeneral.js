import {
  Box,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import {
  CloudCheckmark,
  CloudDismiss,
} from "@styled-icons/fluentui-system-filled";
import { CloudArrowUp } from "@styled-icons/fluentui-system-regular";

const TourGeneral = ({ values, setValues, errors, setError, clearErrors }) => {
  const theme = useTheme();
  useEffect(() => {
    let fileTypes = [
      "image/apng",
      "image/avif",
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/webp",
    ];

    if (values.image instanceof File) {
      if (values.image && !fileTypes.includes(values.image.type)) {
        setError("fileType", {
          message: "Please choose image file!",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.image]);

  return (
    <Box padding={5} marginX={10}>
      <Box marginBottom={3}>
        <Typography color="error" fontSize={12}>
          (Data default in English language)
        </Typography>
      </Box>
      <Grid container rowGap={2}>
        {/* Tour Name */}
        <Grid item xs={12} md={4}>
          <Typography fontWeight="medium">
            Tour Name <small style={{ color: theme.palette.text.active }}>*</small>
          </Typography>
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
          <Typography fontWeight="medium">
            Decription <small style={{ color: theme.palette.text.active }}>*</small>
          </Typography>
          <Typography>
            <small>Write a short decription</small>
          </Typography>
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
          <Typography fontWeight="medium">
            Illustration Image <small style={{ color: theme.palette.text.active }}>*</small>
          </Typography>
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
            height={49}
          >
            <label
              htmlFor="image"
              style={{
                display: "flex",
                width: "100%",
                color: theme.palette.text.third,
                cursor: "pointer",
              }}
            >
              {values.image ? (
                <Box display="flex" alignItems="center">
                  {errors.fileType ? (
                    <CloudDismiss
                      height={24}
                      color={theme.palette.text.active}
                      style={{ margin: 10 }}
                    />
                  ) : (
                    <CloudCheckmark
                      height={24}
                      color={theme.palette.text.onStatus}
                      style={{ margin: 10 }}
                    />
                  )}
                  <Typography noWrap>{values.image.name}</Typography>
                </Box>
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  color={alpha(theme.palette.text.secondary, 0.4)}
                >
                  <CloudArrowUp height={24} style={{ margin: 10 }} />
                  <Typography noWrap>Import picture for tour here</Typography>
                </Box>
              )}

              <input
                id="image"
                style={{
                  opacity: 0,
                  position: "absolute",
                }}
                onChange={(e) => {
                  clearErrors("fileType");
                  setValues({ ...values, image: e.target.files[0] });
                }}
                type="file"
                accept="image/*"
              />
            </label>
          </Box>
          <FormHelperText htmlFor="render-select" error>
            {errors.fileType?.message}
          </FormHelperText>
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
