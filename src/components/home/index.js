import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  useTheme,
  alpha,
  Avatar,
  Typography,
  Grid,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import moment from "moment/moment";

import { getHomePageData } from "./action";

import ChartCard from "./others/ChartCard";
import CustomersOrder from "./others/CustomersOrder";
import CountryRanking from "./others/CountryRanking";
import ArrowData from "../common/ArrowData";
import { StyledBadge } from "../common/styled/StyledBadge";

import indicators from "../../constants/indicatorsItem";

import { Calendar } from "@styled-icons/ionicons-outline";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, "process", 4.0),
  createData("Ice cream sandwich", 237, 9.0, "done", 4.3),
  createData("Eclair", 262, 16.0, "done", 6.0),
  createData("Cupcake", 305, 3.7, "done", 4.3),
  createData("Gingerbread", 356, 16.0, "done", 3.9),
];

const HomePage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width: 1200px)");
  const profile = useSelector((state) => state.auth.profile);
  const [loadings, setLoadings] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // await dispatch(getHomePageData());
      // await dispatch(getOrdersData());
      // await dispatch(getLanguagesData());
    }
    fetchData();
  }, [dispatch]);

  return (
    <Box
      minHeight="94vh"
      margin="1.25em"
      padding={2}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
    >
      {/* Header HomePage */}
      <Box display="flex" gap={2} paddingX={1.5}>
        <Box flexGrow={2} flexDirection="column">
          <Box minHeight={111}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignContent="center"
            >
              <Typography variant="h4" fontWeight="semiBold">
                {loadings ? "Hello, Staff Name" : <Skeleton width={300} />}
              </Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography fontWeight="medium">
                  {loadings ? (
                    moment(Date.now()).format("DD MMMM, YYYY")
                  ) : (
                    <Skeleton width={200} />
                  )}
                </Typography>

                {loadings ? (
                  <Avatar sx={{ bgcolor: theme.palette.background.third }}>
                    <Calendar width={22} color={theme.palette.text.active} />
                  </Avatar>
                ) : (
                  <Skeleton variant="circular">
                    <Avatar />
                  </Skeleton>
                )}
              </Box>
            </Box>
            <Typography color={theme.palette.text.third} fontWeight="regular">
              {loadings ? "Try to best everyday!" : <Skeleton width={200} />}
            </Typography>
          </Box>

          <Grid
            container={isNonMobile}
            minHeight={111}
            borderBottom={2}
            borderTop={2}
            borderColor={theme.palette.background.third}
          >
            {indicators.map((indicator) => (
              <Grid
                item
                xs={12 / indicators.length}
                key={indicator.id}
                flexDirection="row"
                display="flex"
                alignItems="center"
                paddingX={4}
                marginY={1}
                sx={
                  isNonMobile
                    ? indicator.id / 2 === 1
                      ? {
                          borderRight: 2,
                          borderLeft: 2,
                          borderColor: theme.palette.background.third,
                        }
                      : null
                    : indicator.id / 2 === 1
                    ? {
                        borderTop: 2,
                        borderBottom: 2,
                        borderColor: theme.palette.background.third,
                      }
                    : null
                }
                gap={2}
              >
                <Avatar
                  sx={{
                    bgcolor: theme.palette.background.third,
                    color: theme.palette.text.active,
                  }}
                >
                  {indicator.icon}
                </Avatar>
                <Box width="100%">
                  <Typography
                    sx={{ fontWeight: "regular", fontSize: "1.375em" }}
                  >
                    {indicator.title}
                  </Typography>
                  <ArrowData totalNum={80} direction={true} numDirection={10} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {isNonMobile && loadings ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            minWidth={222}
            minHeight={222}
            bgcolor={alpha(theme.palette.background.hovered, 0.1)}
            borderRadius={8}
            gap={2}
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt={profile.firstName + " " + profile.lastName}
                src={profile.image}
                sx={{
                  width: 111,
                  height: 111,
                  border: 2,
                  borderColor: theme.palette.background.secondary,
                }}
              />
            </StyledBadge>

            <Box alignItems="center" flexDirection="column" display="flex">
              <Typography fontWeight="medium" noWrap>
                {profile.firstName + " " + profile.lastName}
              </Typography>
              <Typography
                variant="caption"
                fontWeight="light"
                color={theme.palette.text.third}
              >
                #
                {(
                  profile.id +
                  "" +
                  profile.roleId +
                  "" +
                  profile.languageCode
                ).toUpperCase()}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box>
            <Skeleton
              variant="rounded"
              width={222}
              height={222}
              sx={{ ".MuiSkeleton-rounded": { borderRadius: 10 } }}
            />
          </Box>
        )}
      </Box>

      <Box marginX={2}>
        <Grid container paddingTop={5} spacing={2.5}>
          <Grid item xs={12}>
            <ChartCard />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomersOrder loadings={loadings} rows={rows} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CountryRanking loadings={loadings} rows={rows} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
