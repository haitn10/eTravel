import React, { useEffect, useState } from "react";
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

import { getHomePageData, getLanguagesData, getOrdersData } from "./action";

import ChartCard from "./others/ChartCard";
import CustomersOrder from "./others/CustomersOrder";
import CountryRanking from "./others/CountryRanking";
import ArrowData from "../common/ArrowData";
import { StyledBadge } from "../common/styled/StyledBadge";

import { Calendar } from "@styled-icons/ionicons-outline";
import { FileEarmarkText, ClipboardCheck } from "@styled-icons/bootstrap";
import { Location } from "@styled-icons/ionicons-outline";
import { Directions } from "@styled-icons/boxicons-regular";

const HomePage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width: 1200px)");
  const profile = useSelector((state) => state.auth.profile);
  const [loadings, setLoadings] = useState(true);
  const [languageList, setLanguageList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoadings(false);
      try {
        // await dispatch(getHomePageData());
        const res1 = await dispatch(getOrdersData());
        setOrdersList(res1.staticticalOrder);
        const res2 = await dispatch(getLanguagesData());
        setLanguageList(res2.statictical);
        setLoadings(true);
      } catch (error) {
        setLoadings(true);
      }
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
        <Box flexGrow={2}>
          <Box minHeight={111}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignContent="center"
            >
              <Typography variant="h4" fontWeight="semiBold">
                {loadings ? (
                  `Hello, ${profile.firstName + " " + profile.lastName}`
                ) : (
                  <Skeleton width={300} />
                )}
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
            <Typography color={theme.palette.text.third} fontWeight="medium">
              {loadings ? (
                "Try your best every day!!"
              ) : (
                <Skeleton width={200} />
              )}
            </Typography>
          </Box>

          <Grid
            container={isNonMobile}
            sx={{ flexGrow: 1 }}
            minHeight={111}
            borderBottom={2}
            borderTop={2}
            borderColor={theme.palette.background.secondary}
          >
            <Grid
              item
              xs={3}
              flexDirection="row"
              display="flex"
              alignItems="center"
              columnGap={2}
              paddingX={3}
              marginY={1}
              borderRight={2}
              borderLeft={2}
              borderColor={theme.palette.background.secondary}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.background.secondary,
                  color: theme.palette.text.active,
                }}
              >
                <Location width={24} />
              </Avatar>
              <Box width="100%">
                <Typography
                  sx={{
                    fontWeight: "medium",
                    fontSize: "1em",
                    marginBottom: 1,
                  }}
                >
                  Places
                </Typography>
                <ArrowData totalNum={80} direction={true} numDirection={10} />
              </Box>
            </Grid>
            <Grid
              item
              xs={3}
              flexDirection="row"
              display="flex"
              alignItems="center"
              columnGap={2}
              paddingX={3}
              marginY={1}
              borderRight={2}
              borderLeft={2}
              borderColor={theme.palette.background.secondary}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.background.secondary,
                  color: theme.palette.text.active,
                }}
              >
                <Directions width={24} />
              </Avatar>
              <Box width="100%">
                <Typography
                  sx={{
                    fontWeight: "medium",
                    fontSize: "1em",
                    marginBottom: 1,
                  }}
                >
                  Tours
                </Typography>
                <ArrowData totalNum={80} direction={true} numDirection={10} />
              </Box>
            </Grid>
            <Grid
              item
              xs={3}
              flexDirection="row"
              display="flex"
              alignItems="center"
              columnGap={2}
              paddingX={3}
              marginY={1}
              borderRight={2}
              borderLeft={2}
              borderColor={theme.palette.background.secondary}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.background.secondary,
                  color: theme.palette.text.active,
                }}
              >
                <FileEarmarkText width={24} />
              </Avatar>
              <Box width="100%">
                <Typography
                  sx={{
                    fontWeight: "medium",
                    fontSize: "1em",
                    marginBottom: 1,
                  }}
                >
                  Bookings
                </Typography>
                <ArrowData totalNum={80} direction={true} numDirection={10} />
              </Box>
            </Grid>
            <Grid
              item
              xs={3}
              flexDirection="row"
              display="flex"
              alignItems="center"
              columnGap={2}
              paddingX={3}
              marginY={1}
              borderRight={2}
              borderLeft={2}
              borderColor={theme.palette.background.secondary}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.background.secondary,
                  color: theme.palette.text.active,
                }}
              >
                <ClipboardCheck width={24} />
              </Avatar>
              <Box width="100%">
                <Typography
                  sx={{
                    fontWeight: "medium",
                    fontSize: "0.875em",
                    marginBottom: 1,
                  }}
                >
                  Success Transactions
                </Typography>
                <ArrowData totalNum={80} direction={true} numDirection={10} />
              </Box>
            </Grid>
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
        ) : null}
      </Box>

      <Box marginX={2}>
        <Grid container paddingTop={5} spacing={2.5}>
          <Grid item xs={12}>
            <ChartCard />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomersOrder loadings={loadings} rows={ordersList} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CountryRanking loadings={loadings} rows={languageList} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
