import React, { useEffect, useState } from "react";
import { Avatar, Box, Grid, Typography, alpha, useTheme } from "@mui/material";

import Header from "../common/Header";
import { useLocation } from "react-router-dom";
import { getStaffDetails } from "./action";
import moment from "moment/moment";

const StaffDetails = () => {
  const theme = useTheme();
  const { state } = useLocation();
  const { accountId } = state;
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getInfoDetails() {
      setData(await getStaffDetails(accountId));
    }
    getInfoDetails();
  }, [accountId]);

  return (
    <Box
      margin="1.25em"
      padding={2}
      paddingBottom={10}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
    >
      <Header
        title={"User Details"}
        subTitle={"Show information of customers."}
        showBack={true}
        showTool={false}
      />

      <Box marginX={10} padding={1}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={3}
        >
          <Box display="inherit" alignItems="center">
            <Typography fontWeight="medium">
              Staff ID: <strong>#{data.id}</strong>
            </Typography>
          </Box>
          <Box display="inherit" alignItems="center" gap={1}>
            <Typography fontWeight="medium">Status: </Typography>
            {data.status === 1 ? (
              <Box
                bgcolor={alpha(theme.palette.text.onStatus, 0.1)}
                paddingX={1}
                borderRadius={20}
                border={1}
                borderColor={alpha(theme.palette.text.onStatus, 0.2)}
              >
                <Typography
                  fontWeight="semiBold"
                  color={theme.palette.text.onStatus}
                >
                  Active
                </Typography>
              </Box>
            ) : (
              <Box
                bgcolor={alpha(theme.palette.text.active, 0.1)}
                paddingX={1}
                borderRadius={20}
                border={1}
                borderColor={alpha(theme.palette.text.active, 0.2)}
              >
                <Typography
                  fontWeight="semiBold"
                  color={theme.palette.text.active}
                >
                  Inactice
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        padding={1}
        marginX={2}
      >
        <Box
          bgcolor={theme.palette.background.secondary}
          padding={2}
          borderRadius={2.5}
        >
          <Grid container gap={5} padding={5} marginLeft={10}>
            <Grid item xs={2} md={2}>
              <Avatar
                sx={{
                  width: "100%",
                  height: "auto",
                  bgcolor: theme.palette.background.primary,
                }}
                variant="rounded"
                src={data.image}
              />
            </Grid>
            <Grid item xs={4} md={4}>
              <Box marginBottom={2}>
                <Typography
                  fontWeight="medium"
                  color={theme.palette.text.third}
                  noWrap
                >
                  First Name
                </Typography>
                <Typography fontWeight="medium" noWrap>
                  {data.firstName}
                </Typography>
              </Box>
              <Box marginBottom={2}>
                <Typography
                  fontWeight="medium"
                  color={theme.palette.text.third}
                  noWrap
                >
                  Gender
                </Typography>
                <Typography fontWeight="medium" noWrap>
                  {data.gender}
                </Typography>
              </Box>
              <Box marginBottom={2}>
                <Typography
                  fontWeight="medium"
                  color={theme.palette.text.third}
                  noWrap
                >
                  Phone
                </Typography>
                <Typography fontWeight="medium" noWrap>
                  {data.phone}
                </Typography>
              </Box>
              <Box marginBottom={2}>
                <Typography
                  fontWeight="medium"
                  color={theme.palette.text.third}
                  noWrap
                >
                  Address
                </Typography>
                <Typography fontWeight="medium">{data.address}</Typography>
              </Box>
              <Box marginBottom={2}>
                <Typography
                  fontWeight="medium"
                  color={theme.palette.text.third}
                  noWrap
                >
                  Payment Latest
                </Typography>
                <Typography fontWeight="medium" noWrap>
                  Nguyen Van A
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4} md={4}>
              <Box marginBottom={2}>
                <Typography
                  fontWeight="medium"
                  color={theme.palette.text.third}
                  noWrap
                >
                  Last Name
                </Typography>
                <Typography fontWeight="medium" noWrap>
                  {data.lastName}
                </Typography>
              </Box>
              <Box marginBottom={2}>
                <Typography
                  fontWeight="medium"
                  color={theme.palette.text.third}
                  noWrap
                >
                  Nationality
                </Typography>
                <Typography fontWeight="medium" noWrap>
                  {data.nationality}
                </Typography>
              </Box>
              <Box marginBottom={2}>
                <Typography
                  fontWeight="medium"
                  color={theme.palette.text.third}
                  noWrap
                >
                  Email Address
                </Typography>
                <Typography fontWeight="medium" noWrap>
                  {data.email}
                </Typography>
              </Box>
              <Box marginBottom={2}>
                <Typography
                  fontWeight="medium"
                  color={theme.palette.text.third}
                  noWrap
                >
                  Create Time
                </Typography>
                <Typography fontWeight="medium" noWrap>
                  {moment(data.createTime).format("DD MMMM, YYYY")}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default StaffDetails;
