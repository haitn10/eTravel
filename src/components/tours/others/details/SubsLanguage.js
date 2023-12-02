import {
  Box,
  Divider,
  Grid,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import DescriptionItem from "../../../common/DescriptionItem";

const SubsLanguage = ({ values, loading, languages }) => {
  const theme = useTheme();

  const getLanguage = (code) => {
    return languages.filter((language) => language.languageCode === code);
  };

  return (
    <Box>
      {values.tourDescriptions.map((item, index) => (
        <Box key={index}>
          {index === 0 ? null : <Divider />}

          <Grid container spacing={2} paddingY={2}>
            <Grid item xs={12}>
              {loading ? (
                <Skeleton width={200} />
              ) : (
                <Box display="flex" alignItems="center">
                  <img
                    src={getLanguage(item.languageCode)[0]?.icon}
                    alt={getLanguage(item.languageCode)[0]?.name}
                    style={{
                      width: 20,
                      border: "1px solid #ccc",
                      marginRight: 10,
                    }}
                  />
                  <Typography fontWeight="medium" textTransform="uppercase">
                    {getLanguage(item.languageCode)[0]?.name}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={3} lg={2}>
              {loading ? (
                <Skeleton width={100} />
              ) : (
                <Typography
                  fontSize={14}
                  fontWeight="medium"
                  color={theme.palette.text.third}
                >
                  Itinerary Name{" "}
                  <small style={{ color: theme.palette.text.active }}>*</small>
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={9} lg={10}>
              {loading ? (
                <Skeleton width="100%" />
              ) : (
                <Typography>{item.name}</Typography>
              )}
            </Grid>
            <Grid item xs={12} md={3} lg={2}>
              {loading ? (
                <Skeleton width={100} height={30} />
              ) : (
                <>
                  <Typography
                    fontSize={14}
                    fontWeight="medium"
                    color={theme.palette.text.third}
                  >
                    Description{" "}
                    <small style={{ color: theme.palette.text.active }}>
                      *
                    </small>
                  </Typography>
                </>
              )}
            </Grid>
            <Grid item xs={12} md={9} lg={10}>
              {loading ? (
                <Skeleton width="100%" height={30} />
              ) : (
                <DescriptionItem {...item} />
              )}
            </Grid>
            <Grid item xs={12} md={3} lg={2}>
              {loading ? (
                <Skeleton width={100} height={30} />
              ) : (
                <>
                  <Typography
                    fontSize={14}
                    fontWeight="medium"
                    color={theme.palette.text.third}
                  >
                    Create Time
                  </Typography>
                </>
              )}
            </Grid>
            <Grid item xs={12} md={9} lg={10}>
              {loading ? (
                <Skeleton width="100%" height={30} />
              ) : (
                <Typography color={theme.palette.text.third}>
                  {dayjs(item.createTime).format("LL")}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={3} lg={2}>
              {loading ? (
                <Skeleton width={100} height={30} />
              ) : (
                <>
                  <Typography
                    fontSize={14}
                    fontWeight="medium"
                    color={theme.palette.text.third}
                  >
                    Update Time
                  </Typography>
                </>
              )}
            </Grid>
            <Grid item xs={12} md={9} lg={10}>
              {loading ? (
                <Skeleton width="100%" height={30} />
              ) : (
                <Typography color={theme.palette.text.third}>
                  {item.updateTime === null
                    ? "(No update)"
                    : dayjs(item.updateTime).format("LL")}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default SubsLanguage;
