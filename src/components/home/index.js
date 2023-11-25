import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  useTheme,
  alpha,
  Avatar,
  Typography,
  Grid,
  Skeleton,
} from "@mui/material";
import dayjs from "dayjs";

import CardTotal from "././others/CardTotal";
import PlaceRank from "./others/PlaceRank";
import NationalRank from "./others/NationalRank";
import PieLanguage from "./others/PieLanguage";
import ChartRevenue from "./others/ChartRevenue";
import CustomersOrder from "./others/CustomersOrder";
import { StyledBadge } from "../common/styled/StyledBadge";

import {
  getLanguagesData,
  getNationalRank,
  getOrdersData,
  getReveneData,
  getTopPlace,
  getTotalData,
  getTotalDataAdmin,
  getUserData,
} from "./action";

import { Calendar } from "@styled-icons/ionicons-outline";
import ChartUserAnalysis from "./others/ChartUserAnalysis";

const HomePage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
  const [loading, setLoading] = useState(true);

  const [option, setOption] = useState(
    profile.roleId === 2 || profile.roleName === "TourOperator" ? 7 : 3
  );
  const [total, setTotal] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [language, setLanguage] = useState([]);
  const [order, setOrder] = useState([]);
  const [topPlace, setTopPlace] = useState([]);

  const [totalAd, setTotalAd] = useState([]);
  const [user, setUser] = useState([]);
  const [nationalAd, setNationalAd] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (profile.roleId === 2 || profile.roleName === "TourOperator") {
        if (
          total.length === 0 &&
          language.length === 0 &&
          order.length === 0 &&
          topPlace.length === 0
        ) {
          setLoading(true);
          try {
            const totalData = await dispatch(getTotalData());
            setTotal(totalData.chart);
            const languageData = await dispatch(getLanguagesData());
            setLanguage(languageData.statictical);
            const orderData = await dispatch(getOrdersData());
            setOrder(orderData.staticticalOrder);
            const topData = await dispatch(getTopPlace());
            setTopPlace(topData.charts);
            setLoading(false);
          } catch (error) {
            setLoading(false);
          }
        }

        try {
          const revenueData = await dispatch(
            getReveneData({ options: option })
          );
          setRevenue(revenueData.charts);
        } catch (error) {}
      } else {
        if (
          totalAd.length === 0 &&
          nationalAd.length === 0 &&
          order.length === 0 &&
          topPlace.length === 0
        ) {
          setLoading(true);
          try {
            const totalDataAdmin = await dispatch(getTotalDataAdmin());
            setTotalAd(totalDataAdmin.chart);
            const nationalData = await dispatch(getNationalRank());
            setNationalAd(nationalData);
            const orderData = await dispatch(getOrdersData());
            setOrder(orderData.staticticalOrder);
            const topData = await dispatch(getTopPlace());
            setTopPlace(topData.charts);
            setLoading(false);
          } catch (error) {
            setLoading(false);
          }
        }

        try {
          const userData = await dispatch(getUserData({ options: option }));
          setUser(userData.charts);
        } catch (error) {}
      }
    }

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option]);

  return (
    <Box
      minHeight="94vh"
      margin="1.25em"
      padding={2}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
    >
      {/* Header HomePage */}
      <Box marginX={2}>
        <Grid container spacing={2.5}>
          <Grid item sm={12} lg={9} xl={9.5}>
            <Box minHeight={100}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h4" fontWeight="semiBold">
                  {loading ? (
                    <Skeleton width={300} />
                  ) : (
                    `Hello, ${profile.firstName + " " + profile.lastName}`
                  )}
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography fontWeight="medium">
                    {loading ? (
                      <Skeleton width={200} />
                    ) : (
                      dayjs(Date.now()).format("LL")
                    )}
                  </Typography>

                  {loading ? (
                    <Skeleton variant="circular">
                      <Avatar />
                    </Skeleton>
                  ) : (
                    <Avatar
                      sx={{ bgcolor: theme.palette.background.secondary }}
                    >
                      <Calendar width={22} color={theme.palette.text.active} />
                    </Avatar>
                  )}
                </Box>
              </Box>
              <Typography color={theme.palette.text.third} fontWeight="medium">
                {loading ? (
                  <Skeleton width={200} />
                ) : (
                  "Try your best every day!!"
                )}
              </Typography>
            </Box>

            <CardTotal
              loading={loading}
              admin={
                profile.roleId === 2 || profile.roleName === "TourOperator"
                  ? false
                  : true
              }
              data={
                profile.roleId === 2 || profile.roleName === "TourOperator"
                  ? total
                  : totalAd
              }
            />
          </Grid>

          <Grid
            item
            sx={{ display: { sm: "none", lg: "flex" } }}
            justifyContent="center"
            lg={3}
            xl={2.5}
          >
            {loading ? (
              <Skeleton variant="rounded" width={222} height={222}>
                <Avatar />
              </Skeleton>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                width="100%"
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
            )}
          </Grid>
        </Grid>
      </Box>

      <Box marginX={2}>
        <Grid container paddingTop={3} spacing={2.5}>
          <Grid item sm={12} lg={8}>
            {profile.roleId === 2 || profile.roleName === "TourOperator" ? (
              <ChartRevenue
                loading={loading}
                data={revenue}
                option={option}
                setOption={setOption}
              />
            ) : (
              <ChartUserAnalysis
                loading={loading}
                data={user}
                option={option}
                setOption={setOption}
              />
            )}
          </Grid>
          <Grid item sm={12} lg={4}>
            {profile.roleId === 2 || profile.roleName === "TourOperator" ? (
              <PlaceRank loading={loading} data={topPlace} />
            ) : (
              <NationalRank
                loading={loading}
                data={nationalAd.statictical}
                total={nationalAd.total}
              />
            )}
          </Grid>
          <Grid item sm={12} lg={6}>
            {profile.roleId === 2 || profile.roleName === "TourOperator" ? (
              <CustomersOrder loading={loading} data={order} />
            ) : null}
          </Grid>
          <Grid item sm={12} lg={6}>
            {profile.roleId === 2 || profile.roleName === "TourOperator" ? (
              <PieLanguage loading={loading} data={language} />
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
