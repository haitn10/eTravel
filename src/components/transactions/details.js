import React, { useEffect, useState } from "react";
import { Grid, Skeleton, Typography, alpha, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import Header from "../common/Header";
import { getTransactionDetails } from "./action";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

const TransactionDetails = () => {
  const theme = useTheme();
  const { state } = useLocation();
  const { transactionId } = state;
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
        const data = await getTransactionDetails(transactionId);
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
  }, [transactionId]);

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
        title={"Transactions Details"}
        subTitle={"Show information about transactions of customers."}
        loading={loading}
        showBack={true}
        showSearch={false}
        showFilter={false}
        buttonAdd={false}
      />

      <Box marginX={5} padding={4}>
        <Box
          padding={2}
          paddingLeft={5}
          bgcolor={alpha(theme.palette.background.third, 0.5)}
          borderRadius={5}
        >
          {loading ? (
            <Skeleton />
          ) : (
            <Grid container spacing={2}>
              <Grid item lg={3}>
                <Typography
                  color={theme.palette.text.third}
                  fontWeight="medium"
                >
                  Transaction No
                </Typography>
                <Typography fontSize={14}>{values.id}</Typography>
              </Grid>
              <Grid item lg={3}>
                <Typography
                  color={theme.palette.text.third}
                  fontWeight="medium"
                >
                  Customer ID
                </Typography>
                <Typography fontSize={14}>{values.id}</Typography>
              </Grid>
              <Grid item lg={3}>
                <Typography
                  color={theme.palette.text.third}
                  fontWeight="medium"
                >
                  Booking ID
                </Typography>
                <Typography fontSize={14}>{values.bookingId}</Typography>
              </Grid>
              <Grid item lg={3}>
                <Typography
                  color={theme.palette.text.third}
                  fontWeight="medium"
                >
                  Amount
                </Typography>

                <Typography fontSize={14}>
                  {values.amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </Typography>
              </Grid>
              <Grid item lg={3}>
                <Typography
                  color={theme.palette.text.third}
                  fontWeight="medium"
                >
                  Currency
                </Typography>
                <Typography fontSize={14}>USD</Typography>
              </Grid>
              <Grid item lg={3}>
                <Typography
                  color={theme.palette.text.third}
                  fontWeight="medium"
                >
                  Transaction Date
                </Typography>

                <Typography fontSize={14}>
                  {dayjs(values.createTime).format("lll")}
                </Typography>
              </Grid>
              <Grid item lg={3}>
                <Typography
                  color={theme.palette.text.third}
                  fontWeight="medium"
                >
                  Payment Method
                </Typography>
                <Typography fontSize={14}>{values.paymentMethod}</Typography>
              </Grid>
              <Grid item lg={3}>
                <Typography
                  color={theme.palette.text.third}
                  fontWeight="medium"
                >
                  Status
                </Typography>
                <Typography fontSize={14} color={theme.palette.text.onStatus}>
                  {values.statusType}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TransactionDetails;
