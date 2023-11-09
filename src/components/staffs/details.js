import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  Skeleton,
  Typography,
  alpha,
  useTheme,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

import { getStaffDetails, updateStaff } from "./action";

import Header from "../common/Header";
import ErrorModal from "../common/ErrorModal";
import { getLanguageCode } from "../languages/action";

const StaffDetails = () => {
  const theme = useTheme();
  const { state } = useLocation();
  const { accountId } = state;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [national, setNational] = useState([]);

  const [notification, setNotification] = useState({
    errorState: false,
    errorMessage: "",
    status: "error",
  });

  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    async function getInfoDetails() {
      setLoading(true);
      try {
        setData(await getStaffDetails(accountId));
        setNational(await getLanguageCode());
        setLoading(false);
      } catch (err) {
        setNotification({
          ...notification,
          errorState: true,
          errorMessage: "Can't loading data of this account!",
          status: "error",
        });
        setLoading(false);
      }
    }
    getInfoDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const showImg = (img) => {
    if (img instanceof File) {
      return URL.createObjectURL(img);
    }
    return img;
  };
  const onSubmit = async () => {
    console.log(data);
    // try {
    //   const response = await updateStaff(accountId, data);

    //   setNotification({
    //     ...notification,
    //     errorState: true,
    //     errorMessage: "Update account successfully!",
    //     status: "success",
    //   });
    // } catch (e) {
    //   setNotification({
    //     ...notification,
    //     errorState: true,
    //     errorMessage: "Update account failed!",
    //     status: "error",
    //   });
    // }
  };

  return (
    <Box
      minWidth="94vh"
      margin="1.25em"
      padding={2}
      paddingBottom={10}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
    >
      <ErrorModal
        open={notification.errorState}
        setOpen={setNotification}
        message={notification.errorMessage}
        status={notification.status}
      />

      <Header
        title={"User Details"}
        subTitle={"Show information of customers."}
        loading={loading}
        showBack={true}
      />

      <Box marginX={6} padding={3}>
        {/* ID and Status */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={1}
        >
          <Box display="inherit" alignItems="center" gap={1}>
            {loading ? (
              <Skeleton width={100} />
            ) : (
              <>
                <Typography color={theme.palette.text.third}>
                  Staff ID:
                </Typography>
                <Typography fontWeight="medium">#{data.id}</Typography>
              </>
            )}
          </Box>
          <Box display="inherit" alignItems="center" gap={1}>
            {loading ? (
              <Skeleton width={100} />
            ) : (
              <>
                <Typography color={theme.palette.text.third}>
                  Status:{" "}
                </Typography>
                {data.status ? (
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
              </>
            )}
          </Box>
        </Box>

        {/* Information Details */}
        <Box
          bgcolor={theme.palette.background.secondary}
          padding={2}
          borderRadius={5}
        >
          {loading ? (
            <Skeleton width={100} />
          ) : (
            <Grid container spacing={7} padding={2}>
              <Grid
                item
                sm={12}
                md={4}
                gap={1}
                flexDirection="column"
                display="flex"
                justifyContent="center"
              >
                <Avatar
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 5,
                    bgcolor: theme.palette.background.primary,
                  }}
                  src={showImg(data.image)}
                />
                <Button component="label">
                  <input
                    hidden
                    type="file"
                    accept="image/png, image/jpg"
                    name="image"
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.files[0] })
                    }
                  />
                  Change Avatar
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box marginBottom={2}>
                  <Typography color={theme.palette.text.third}>
                    First Name
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    InputProps={{
                      style: {
                        borderRadius: 10,
                      },
                    }}
                    name="firstName"
                    value={data.firstName}
                    {...register("firstName", {
                      required: "First Name is required!",
                    })}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                </Box>
                <Box marginBottom={2}>
                  <Typography color={theme.palette.text.third}>
                    Gender
                  </Typography>
                  <FormControl
                    sx={{
                      minWidth: 120,
                    }}
                    fullWidth
                    size="small"
                  >
                    <Select
                      value={data.gender}
                      sx={{ borderRadius: 2.5 }}
                      name="gender"
                      onChange={handleChange}
                    >
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box marginBottom={2}>
                  <Typography color={theme.palette.text.third}>
                    Phone
                  </Typography>
                  <Typography noWrap>{data.phone}</Typography>
                </Box>
                <Box marginBottom={2}>
                  <Typography color={theme.palette.text.third}>
                    Address
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    InputProps={{
                      style: {
                        borderRadius: 10,
                      },
                    }}
                    name="address"
                    value={data.address}
                    {...register("address", {
                      required: "Address is required!",
                    })}
                    onChange={handleChange}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box marginBottom={2}>
                  <Typography color={theme.palette.text.third}>
                    Last Name
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    InputProps={{
                      style: {
                        borderRadius: 10,
                      },
                    }}
                    name="lastName"
                    value={data.lastName}
                    {...register("lastName", {
                      required: "Last Name is required!",
                    })}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                </Box>
                <Box marginBottom={2}>
                  <Typography color={theme.palette.text.third}>
                    Nationality
                  </Typography>
                  <FormControl
                    sx={{
                      minWidth: 120,
                    }}
                    fullWidth
                    size="small"
                  >
                    <Select
                      value={data.nationality}
                      sx={{ borderRadius: 2.5 }}
                      name="nationality"
                      onChange={handleChange}
                    >
                      {national.map((national) => (
                        <MenuItem
                          key={national.nationalCode}
                          value={national.nationalCode}
                        >
                          {national.nationalName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box marginBottom={2}>
                  <Typography color={theme.palette.text.third}>
                    Email Address
                  </Typography>
                  <Typography noWrap>{data.email}</Typography>
                </Box>
                <Box marginBottom={2}>
                  <Typography color={theme.palette.text.third}>
                    Create Time
                  </Typography>
                  <Typography noWrap>
                    {dayjs(data.createTime).format("LL")}
                  </Typography>
                </Box>
                <Box marginBottom={2}>
                  <Typography color={theme.palette.text.third}>
                    Update Time
                  </Typography>
                  <Typography noWrap>
                    {data.updateTime
                      ? dayjs(data.updateTime).format("LL")
                      : "(No data)"}
                  </Typography>
                </Box>
              </Grid>

              <Grid item md={12} display="flex" justifyContent="center">
                <Button
                  onClick={handleSubmit(onSubmit)}
                  variant="contained"
                  color="error"
                  sx={{ borderRadius: 2.5 }}
                >
                  Save Change
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default StaffDetails;
