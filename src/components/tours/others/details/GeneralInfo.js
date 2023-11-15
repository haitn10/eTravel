import {
  Box,
  Grid,
  Rating,
  Skeleton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { labels } from "../../../../constants/rating";
import dayjs from "dayjs";
import UploadImage from "../../../common/UploadImage";

const GeneralInfo = ({
  values,
  setValues,
  loading,
  update,
  register,
  errors,
}) => {
  const theme = useTheme();
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} lg={6}>
        {!loading ? (
          <Box marginBottom={2}>
            <Typography fontWeight="medium" marginBottom={1}>
              Place Name{" "}
              <small style={{ color: theme.palette.text.active }}>*</small>
            </Typography>
            <TextField
              fullWidth
              size="small"
              disabled={update}
              InputProps={{
                style: {
                  borderRadius: 10,
                },
              }}
              value={values.name}
              {...register("name", {
                required: "Place Name is required!",
                onChange: (e) => setValues({ ...values, name: e.target.value }),
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
              placeholder={`Type tour name here`}
            />
          </Box>
        ) : (
          <Skeleton width="100%" />
        )}

        {!loading ? (
          <Box display="flex" alignItems="center" marginBottom={2}>
            <Typography fontWeight="medium" width={160}>
              Price:
            </Typography>
            <Typography fontWeight="medium">
              $
              {values.total
                .toFixed(2)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            </Typography>
          </Box>
        ) : (
          <Skeleton width="100%" />
        )}

        {!loading ? (
          <Box display="flex" alignItems="center" marginBottom={2}>
            <Typography fontWeight="medium" width={160}>
              Number of Places:
            </Typography>
            <Typography fontWeight="medium">
              {values.tourDetails.length}
            </Typography>
          </Box>
        ) : (
          <Skeleton width="100%" />
        )}

        {!loading ? (
          <Box display="flex" alignItems="center" marginBottom={2}>
            <Typography fontWeight="medium" width={160}>
              Number of Decription:
            </Typography>
            <Typography fontWeight="medium">
              {values.tourDescriptions.length}
            </Typography>
          </Box>
        ) : (
          <Skeleton width="100%" />
        )}

        {!loading ? (
          <Box marginBottom={2}>
            <Box marginBottom={1}>
              <Typography
                fontSize={14}
                letterSpacing={0.5}
                fontWeight="medium"
                textTransform="uppercase"
                color={theme.palette.text.third}
              >
                Other Information
              </Typography>
            </Box>

            <Grid container marginX={1} spacing={1}>
              <Grid item xs={12} display="flex" alignItems="center">
                <>
                  <Typography
                    fontSize={14}
                    fontWeight="medium"
                    color={theme.palette.text.third}
                  >
                    Status:
                  </Typography>

                  <Typography
                    fontSize={14}
                    fontWeight="bold"
                    marginLeft={1}
                    borderRadius={2.5}
                    color={
                      values.status
                        ? theme.palette.text.onStatus
                        : theme.palette.text.active
                    }
                  >
                    {values.status ? "Active" : "Inactive"}
                  </Typography>
                </>
              </Grid>

              <Grid item xs={12} display="flex" alignItems="center">
                <>
                  <Typography
                    fontSize={14}
                    fontWeight="medium"
                    color={theme.palette.text.third}
                  >
                    Rating:
                  </Typography>
                  <Box display="flex" alignItems="center" marginLeft={1}>
                    <Rating
                      readOnly
                      size="small"
                      value={values.rate || 0}
                      precision={0.5}
                      sx={{
                        ".MuiRating-icon": {
                          borderColor: theme.palette.text.active,
                        },
                        "& .MuiRating-iconFilled": {
                          color: theme.palette.text.active,
                        },
                      }}
                    />
                    <Typography marginLeft={1} fontSize={14}>
                      ({labels[values.rate || 0]})
                    </Typography>
                  </Box>
                </>
              </Grid>

              <Grid item xs={12} display="flex" alignItems="center">
                <>
                  <Typography
                    fontSize={14}
                    fontWeight="medium"
                    color={theme.palette.text.third}
                  >
                    Create Time:
                  </Typography>
                  <Typography
                    fontSize={14}
                    fontWeight="semiBold"
                    marginLeft={1}
                  >
                    {dayjs(values?.createTime).format("MMMM DD, YYYY")}
                  </Typography>
                </>
              </Grid>
              <Grid item xs={12} display="flex" alignItems="center">
                <Typography
                  fontSize={14}
                  fontWeight="medium"
                  color={theme.palette.text.third}
                >
                  Update Time:
                </Typography>
                <Typography fontSize={14} fontWeight="semiBold" marginLeft={1}>
                  {values.updateTime
                    ? dayjs(values?.updateTime).format("MMMM DD, YYYY")
                    : "--/--/--"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Skeleton width="100%" />
        )}
      </Grid>

      {/* Rating */}
      <Grid item xs={12} lg={6}>
        {!loading ? (
          <Typography fontWeight="medium" marginBottom={1}>
            Image <small style={{ color: theme.palette.text.active }}>*</small>
          </Typography>
        ) : (
          <Skeleton width="100%" />
        )}

        {!loading ? (
          <UploadImage
            values={values}
            setValues={setValues}
            errors={errors}
            register={register}
            disabled={update}
          />
        ) : (
          <Skeleton width="100%" />
        )}
      </Grid>
    </Grid>
  );
};

export default GeneralInfo;
