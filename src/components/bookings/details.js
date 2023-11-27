import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import Header from "../common/Header";
import { ExpandMore } from "styled-icons/material";
import { useLocation } from "react-router-dom";
import { getBookingDetails } from "./action";
import dayjs from "dayjs";

const BookingDetails = () => {
  const theme = useTheme();
  const { state } = useLocation();
  const { bookingId } = state;
  const [values, setValues] = useState({});

  const [loading, setLoading] = useState(true);

  const [notification, setNotification] = useState({
    errorState: false,
    errorMessage: "",
    status: "error",
  });

  useEffect(() => {
    async function getInfoDetails() {
      setLoading(true);
      try {
        const data = await getBookingDetails(bookingId);
        setValues(data);
        setLoading(false);
      } catch (error) {
        setNotification({
          ...notification,
          errorState: true,
          errorMessage: "Can't get data details for booking!",
          status: "error",
        });
        setLoading(false);
      }
    }
    getInfoDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId]);

  console.log(values);

  return (
    <Box
      minHeight="94vh"
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
        loading={loading}
        showBack={true}
        showSearch={false}
        showFilter={false}
        buttonAdd={false}
      />

      <Box marginX={6} padding={3}>
        <Grid container spacing={8}>
          <Grid item md={12} lg={7}>
            {loading ? (
              <Skeleton width={100} />
            ) : (
              <Box marginBottom={3}>
                <Typography
                  textTransform="uppercase"
                  letterSpacing={1.25}
                  color={theme.palette.text.third}
                  fontWeight="medium"
                >
                  Information Customer
                </Typography>
              </Box>
            )}
            {loading ? (
              <Skeleton width="100%" />
            ) : (
              <Box display="flex" marginY={1} gap={1}>
                <Box>
                  <Typography fontWeight="medium" width={150}>
                    Customer Name:
                  </Typography>
                </Box>
                <Typography noWrap>
                  {values?.customerInfor?.customerName}
                </Typography>
              </Box>
            )}

            {loading ? (
              <Skeleton width="100%" />
            ) : (
              <Box display="flex" marginY={1} gap={1}>
                <Box>
                  <Typography fontWeight="medium" width={150}>
                    Gender:
                  </Typography>
                </Box>
                <Typography noWrap>{values?.customerInfor?.gender}</Typography>
              </Box>
            )}

            {loading ? (
              <Skeleton width="100%" />
            ) : (
              <Box display="flex" marginY={1} gap={1}>
                <Typography fontWeight="medium" width={150}>
                  Nationality:
                </Typography>
                <Typography noWrap>
                  {values?.customerInfor?.nationality}
                </Typography>
              </Box>
            )}
            {loading ? (
              <Skeleton width="100%" />
            ) : (
              <Box display="flex" marginY={1} gap={1}>
                <Typography fontWeight="medium" width={150}>
                  Phone Number:
                </Typography>
                <Typography noWrap>{values?.customerInfor?.phone}</Typography>
              </Box>
            )}
            {loading ? (
              <Skeleton width="100%" />
            ) : (
              <Box display="flex" marginY={1} gap={1}>
                <Typography fontWeight="medium" width={150}>
                  Email Address:
                </Typography>
                <Typography noWrap>{values?.customerInfor?.email}</Typography>
              </Box>
            )}
            {loading ? (
              <Skeleton width="100%" />
            ) : (
              <Box display="flex" marginY={1} gap={1}>
                <Typography fontWeight="medium" width={150}>
                  Address:
                </Typography>
                <Typography noWrap>{values?.customerInfor?.address}</Typography>
              </Box>
            )}

            <Box>
              <Accordion
                sx={{
                  boxShadow: "none",
                  bgcolor: alpha(theme.palette.background.third, 0.1),
                }}
              >
                <AccordionSummary expandIcon={<ExpandMore width={24} />}>
                  <Typography fontWeight="medium">Price Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {values?.placeDetail?.map((place) => (
                    <Box
                      key={place.name}
                      borderBottom={1}
                      borderColor={theme.palette.background.third}
                      marginTop={2}
                    >
                      <Typography fontWeight="medium">{place.name}</Typography>
                      <Grid
                        container
                        color={theme.palette.text.third}
                        padding={1}
                      >
                        <Grid item xs={4} textAlign="left">
                          <Typography noWrap>Price</Typography>
                          <Typography noWrap>$ {place.price}</Typography>
                        </Grid>
                        <Grid item xs={4} textAlign="center">
                          <Typography noWrap>Duration</Typography>
                          <Typography noWrap>{place.hour}</Typography>
                        </Grid>
                        <Grid item xs={4} textAlign="right">
                          <Typography noWrap>Category</Typography>
                          <Typography noWrap>{place.categoryName}</Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
          <Grid item md={12} lg={5}>
            {loading ? (
              <Skeleton width="100%" />
            ) : (
              <Box
                bgcolor={alpha(theme.palette.background.third, 0.2)}
                padding={2}
                paddingX={5}
                borderRadius={2.5}
              >
                <Box
                  marginBottom={3}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    textTransform="uppercase"
                    letterSpacing={1.5}
                    fontSize={22}
                    color={theme.palette.text.third}
                    fontWeight="medium"
                  >
                    Booking Bill
                  </Typography>
                  <Typography
                    textTransform="capitalize"
                    fontWeight="bold"
                    gap={2}
                    letterSpacing={0.5}
                    color={theme.palette.text.onStatus}
                  >
                    {values.statusType}
                  </Typography>
                </Box>

                <Box marginBottom={1}>
                  <Typography textTransform="capitalize" fontWeight="medium">
                    Booking Number
                  </Typography>
                  <Typography
                    textTransform="capitalize"
                    color={theme.palette.text.third}
                  >
                    {values.id}
                  </Typography>
                </Box>
                <Box marginBottom={1}>
                  <Typography textTransform="capitalize" fontWeight="medium">
                    Booking Date
                  </Typography>
                  <Typography
                    textTransform="capitalize"
                    color={theme.palette.text.third}
                  >
                    {dayjs(values.createTime).format("LL")}
                  </Typography>
                </Box>

                <Box marginBottom={1}>
                  <Typography textTransform="capitalize" fontWeight="medium">
                    duration Expected
                  </Typography>
                  <Typography
                    textTransform="capitalize"
                    color={theme.palette.text.third}
                  >
                    {values.durationExpected}
                  </Typography>
                </Box>
                <Box marginBottom={1}>
                  <Typography textTransform="capitalize" fontWeight="medium">
                    Number of Places
                  </Typography>
                  <Typography
                    textTransform="capitalize"
                    color={theme.palette.text.third}
                  >
                    {values.placeDetail.length}
                  </Typography>
                </Box>
                <Box marginBottom={1}>
                  <Typography textTransform="capitalize" fontWeight="medium">
                    Total Prices
                  </Typography>
                  <Typography
                    textTransform="capitalize"
                    color={theme.palette.text.third}
                  >
                    {values.total.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </Typography>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
        <Box marginTop={4}>
          {loading ? (
            <Skeleton width="100%" />
          ) : (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore width={24} />}
                sx={{
                  padding: "4px 20px",
                }}
              >
                <Typography fontWeight="medium">
                  Transactions History
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {values.historyTransactions.length !== 0 ? (
                  <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Transaction ID</TableCell>
                          <TableCell>Payment Method</TableCell>
                          <TableCell>Payment Time</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell align="right">Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {values.historyTransactions.map((trans) => (
                          <TableRow
                            key={trans.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {trans.id}
                            </TableCell>
                            <TableCell>{trans.paymentMethod}</TableCell>
                            <TableCell>
                              {dayjs(trans.createTime).format("LL")}
                            </TableCell>
                            <TableCell>{trans.amount}</TableCell>
                            <TableCell align="right">
                              {trans.statusType}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Box display="flex" justifyContent="center">
                    <Typography>(No data)</Typography>
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BookingDetails;
