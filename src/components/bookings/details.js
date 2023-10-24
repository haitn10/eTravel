import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import Header from "../common/Header";
import { ExpandMore } from "styled-icons/material";

const BookingDetails = () => {
  const theme = useTheme();
  return (
    <Box
      minHeight="95vh"
      margin="1.25em"
      padding={2}
      paddingBottom={10}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
    >
      {/* Title */}
      <Header
        title={"Booking Details"}
        subTitle={"Show information about booking of customers."}
        showBack={true}
        showSearch={false}
        showFilter={false}
        buttonAdd={false}
      />

      <Box marginX={5} padding={1}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={3}
        >
          <Box display="inherit" alignItems="center">
            <Typography fontWeight="medium" fontSize={18}>
              TransactionID:{" "}
            </Typography>
            <Typography fontWeight="bold"> # 123</Typography>
          </Box>
          <Box display="inherit" alignItems="center" gap={1}>
            <Typography fontWeight="medium" fontSize={18}>
              Status:{" "}
            </Typography>
            <Box
              bgcolor={alpha(theme.palette.text.onStatus, 0.1)}
              paddingX={1}
              borderRadius={20}
              border={1}
              borderColor={alpha(theme.palette.text.onStatus, 0.2)}
            >
              <Typography fontWeight="bold" color={theme.palette.text.onStatus}>
                Success
              </Typography>
            </Box>
          </Box>
        </Box>

        <Grid container rowGap={{ xs: 1, sm: 2 }}>
          <Grid
            item
            xs={6}
            bgcolor={theme.palette.background.secondary}
            padding={3}
            borderRadius={2}
          >
            <Box marginBottom={2}>
              <Typography
                fontWeight="medium"
                color={theme.palette.text.third}
                noWrap
              >
                Customer Name
              </Typography>
              <Typography fontWeight="medium" noWrap>
                Nguyen Van A
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
                Male
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
                Japan
              </Typography>
            </Box>
            <Box marginBottom={2}>
              <Typography
                fontWeight="medium"
                color={theme.palette.text.third}
                noWrap
              >
                Phone Number
              </Typography>
              <Typography fontWeight="medium" noWrap>
                (+84) 12*-*****8
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
                c********@gmail.com
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
              <Typography fontWeight="medium" noWrap>
                (No data)
              </Typography>
            </Box>
          </Grid>

          <Grid item xs />
          <Grid item xs={5} rowGap={2} display="flex" flexDirection="column">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgcolor={theme.palette.background.hovered}
              padding={2}
              color={theme.palette.text.second}
              borderRadius={2}
            >
              <Typography fontWeight="medium" fontSize={22} noWrap>
                Total Bill:
              </Typography>
              <Typography fontWeight="bold" fontSize={22} noWrap>
                $ 20.00
              </Typography>
            </Box>
            <Box>
              <Typography fontWeight="medium">Price Details</Typography>
            </Box>
            <Box
              bgcolor={theme.palette.background.secondary}
              paddingX={2}
              paddingBottom={2}
              borderRadius={2}
            >
              <Box
                borderBottom={1}
                borderColor={theme.palette.text.third}
                marginTop={2}
              >
                <Typography fontWeight="semiBold">Place Number</Typography>
                <Grid container color={theme.palette.text.third} padding={1}>
                  <Grid item xs={4} textAlign="left">
                    <Typography noWrap>Price</Typography>
                    <Typography noWrap>$ 10.00</Typography>
                  </Grid>
                  <Grid item xs={4} textAlign="center">
                    <Typography noWrap>Duration</Typography>
                    <Typography noWrap>1/2 hour</Typography>
                  </Grid>
                  <Grid item xs={4} textAlign="right">
                    <Typography noWrap>Category</Typography>
                    <Typography noWrap>Food</Typography>
                  </Grid>
                </Grid>
              </Box>

              <Box
                borderBottom={1}
                borderColor={theme.palette.text.third}
                marginTop={2}
              >
                <Typography fontWeight="semiBold">Place Number</Typography>
                <Grid
                  container
                  color={theme.palette.text.third}
                  padding={1}
                  spacing={2}
                >
                  <Grid item xs={4} textAlign="left">
                    <Typography noWrap>Price</Typography>
                    <Typography noWrap>$ 10.00</Typography>
                  </Grid>
                  <Grid item xs={4} textAlign="center">
                    <Typography noWrap>Duration</Typography>
                    <Typography noWrap>1/2 hour</Typography>
                  </Grid>
                  <Grid item xs={4} textAlign="right">
                    <Typography noWrap>Category</Typography>
                    <Typography noWrap>Food</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4} display="flex" gap={1}>
            <Typography fontWeight="semiBold" style={{ width: 150 }}>
              Total expected completion time:
            </Typography>
            <Typography>1.5 hours</Typography>
          </Grid>
          <Grid item xs={12} md={4} display="flex" gap={1}>
            <Typography fontWeight="semiBold">Tour Creator:</Typography>
            <Typography>Customer</Typography>
          </Grid>
          <Grid item xs={12} md={4} display="flex" gap={1}>
            <Typography fontWeight="semiBold">Create Time:</Typography>
            <Typography>Jul 7, 2023</Typography>
          </Grid>
        </Grid>

        <Box marginTop={10}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore width={24} />}
              sx={{
                bgcolor: theme.palette.background.secondary,
                padding: "4px 20px",
              }}
            >
              <Typography fontWeight="medium">Transactions History</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Transactions History List</Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingDetails;