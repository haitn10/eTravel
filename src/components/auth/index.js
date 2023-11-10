import { EyeOutline, EyeOffOutline } from "@styled-icons/evaicons-outline/";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  ListItemIcon,
  MenuItem,
  OutlinedInput,
  Select,
  Tab,
  TextField,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../common/Header";
import ErrorModal from "../common/ErrorModal";
import { getLanguageCode } from "../languages/action";
import { useForm } from "react-hook-form";

const Profile = () => {
  const theme = useTheme();
  const profile = useSelector((state) => state.auth.profile);

  const [tab, setTab] = useState("1");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(profile);
  const [languageCode, setLanguageCode] = useState([]);

  const [notification, setNotification] = useState({
    errorState: false,
    errorMessage: "",
    status: "error",
  });

  const form = useForm({
    defaultValues: {
      name: "",
      icon: "",
      languageCode: "",
    },
  });
  const { handleSubmit, setError, clearErrors, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    if (languageCode.length > 0) {
      return;
    }
    async function fetchData() {
      try {
        const res = await getLanguageCode();
        setLanguageCode(res);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [languageCode.length]);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const previewImage = (data) => {
    if (data instanceof File) {
      return URL.createObjectURL(data);
    }
    return data;
  };

  const onSubmit = async () => {
    setLoading(true);
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      nationality: values.nationality,
      address: values.address,
      gender: values.gender,
      image: values.image,
    };
    console.log(data);
    // try {
    //   // await updateProfile(values);
    //   setLoading(false);
    //   setNotification({
    //     ...notification,
    //     errorState: true,
    //     errorMessage: "Created language successfully!",
    //     status: "success",
    //   });
    // } catch (e) {
    //   setLoading(false);
    //   setNotification({
    //     ...notification,
    //     errorState: true,
    //     errorMessage: e.response.data.message || "Created language failed!",
    //     status: "error",
    //   });
    // }
  };

  return (
    <Box
      minHeight="94vh"
      margin="1.25em"
      padding={2}
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
        title={"Settings"}
        subTitle={"Manage personal information and update them."}
      />

      {/* Information Settings */}
      <Box paddingX={2} marginTop={2}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChangeTab}
              aria-label="lab API tabs example"
            >
              <Tab label="General" value={"1"} />
              <Tab label="Password" value={"2"} />
            </TabList>
          </Box>
          <TabPanel value={"1"} sx={{ paddingX: 5 }}>
            <Box flexGrow={1} style={{ display: "flex" }}>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                padding={2}
                gap={2}
              >
                <Avatar
                  sx={{
                    width: 200,
                    height: 200,
                    border: 5,
                    borderRadius: 5,
                    borderColor: theme.palette.background.secondary,
                  }}
                  src={previewImage(values.image)}
                />
                <Button
                  disabled={loading}
                  variant="outlined"
                  color="error"
                  component="label"
                  sx={{ borderRadius: 2.5 }}
                >
                  <input
                    hidden
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) =>
                      setValues({
                        ...values,
                        [e.target.name]: e.target.files[0],
                      })
                    }
                  />
                  Change Image
                </Button>
              </Box>
              <Grid flexGrow={2} container paddingX={4} spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box marginLeft={1}>
                    <Typography
                      color={theme.palette.text.third}
                      fontWeight="medium"
                    >
                      Username
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    size="small"
                    InputProps={{
                      style: {
                        borderRadius: 10,
                        backgroundColor: alpha(
                          theme.palette.background.secondary,
                          0.5
                        ),
                      },
                    }}
                    value={values.email.slice(0, values.email.indexOf("@"))}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box marginLeft={1}>
                    <Typography
                      color={theme.palette.text.third}
                      fontWeight="medium"
                    >
                      Email
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    size="small"
                    InputProps={{
                      style: {
                        borderRadius: 10,
                        backgroundColor: alpha(
                          theme.palette.background.secondary,
                          0.5
                        ),
                      },
                    }}
                    value={values.email}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box marginLeft={1}>
                    <Typography
                      color={theme.palette.text.third}
                      fontWeight="medium"
                    >
                      First Name
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    size="small"
                    name="firstName"
                    disabled={loading}
                    InputProps={{
                      style: {
                        borderRadius: 10,
                      },
                    }}
                    value={values.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box marginLeft={1}>
                    <Typography
                      color={theme.palette.text.third}
                      fontWeight="medium"
                    >
                      Last Name
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    size="small"
                    name="lastName"
                    disabled={loading}
                    InputProps={{
                      style: {
                        borderRadius: 10,
                      },
                    }}
                    value={values.lastName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box marginLeft={1}>
                    <Typography
                      color={theme.palette.text.third}
                      fontWeight="medium"
                    >
                      Nationality
                    </Typography>
                  </Box>
                  <FormControl fullWidth size="small" noValidate>
                    <Select
                      sx={{ borderRadius: 2.5 }}
                      name="nationality"
                      defaultValue=""
                      disabled={loading}
                      onChange={handleChange}
                      error={!!errors?.nationality}
                    >
                      {languageCode.map((item, index) => (
                        <MenuItem key={index} value={item.nationalCode}>
                          <img
                            src={item.icon}
                            alt={item.nationalName}
                            style={{ width: 20, marginRight: 10 }}
                          />
                          {item.nationalName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText htmlFor="render-select" error>
                      {errors.values?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box marginLeft={1}>
                    <Typography
                      color={theme.palette.text.third}
                      fontWeight="medium"
                    >
                      Gender
                    </Typography>
                  </Box>
                  <FormControl fullWidth size="small" noValidate>
                    <Select
                      sx={{ borderRadius: 2.5 }}
                      name="gender"
                      defaultValue=""
                      disabled={loading}
                      onChange={handleChange}
                      value={values.gender}
                    >
                      <MenuItem value={"Male"}> Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Box marginLeft={1}>
                    <Typography
                      color={theme.palette.text.third}
                      fontWeight="medium"
                    >
                      Phone
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    size="small"
                    name="phone"
                    type="tel"
                    disabled={loading}
                    InputProps={{ style: { borderRadius: 10 } }}
                    value={values.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box marginLeft={1}>
                    <Typography
                      color={theme.palette.text.third}
                      fontWeight="medium"
                    >
                      Address
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    size="small"
                    name="address"
                    disabled={loading}
                    InputProps={{ style: { borderRadius: 10 } }}
                    value={values.address}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box display="flex" justifyContent="center" marginTop={5}>
              <Button
                variant="contained"
                disabled={loading}
                color="error"
                sx={{ borderRadius: 2.5 }}
                onClick={handleSubmit(onSubmit)}
              >
                {loading ? (
                  <CircularProgress color="error" size={25} />
                ) : (
                  <Typography fontWeight="medium">Save Change</Typography>
                )}
              </Button>
            </Box>
          </TabPanel>
          <TabPanel value={"2"}>
            <Box width={600} marginTop={2}>
              <Typography
                textTransform="uppercase"
                color={theme.palette.text.third}
                fontWeight="semiBold"
                marginBottom={1}
              >
                Old Password
              </Typography>
              <TextField
                fullWidth
                inputProps={{ style: { height: "1em" } }}
                InputProps={{ style: { borderRadius: 10 } }}
              />
            </Box>
            <Box width={600}>
              <Typography
                textTransform="uppercase"
                color={theme.palette.text.third}
                fontWeight="semiBold"
                marginBottom={1}
              >
                New Password
              </Typography>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <EyeOffOutline /> : <EyeOutline />}
                    </IconButton>
                  </InputAdornment>
                }
                fullWidth
                inputProps={{ style: { height: "1em" } }}
                style={{ borderRadius: 10 }}
              />
            </Box>
            <Box width={600}>
              <Typography
                textTransform="uppercase"
                color={theme.palette.text.third}
                fontWeight="semiBold"
                marginBottom={1}
              >
                Confirm Password
              </Typography>
              <OutlinedInput
                type={showConfirmPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowConfirmPassword((show) => !show)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showConfirmPassword ? <EyeOffOutline /> : <EyeOutline />}
                    </IconButton>
                  </InputAdornment>
                }
                fullWidth
                inputProps={{ style: { height: "1em" } }}
                style={{ borderRadius: 10 }}
              />
            </Box>
            <Button
              variant="contained"
              disabled={loading}
              color="error"
              sx={{
                marginTop: "30px",
                borderRadius: "50px",
                width: "250px",
                height: "45px",
              }}
              type="submit"
            >
              {loading ? (
                <CircularProgress color="error" size={25} />
              ) : (
                <Typography fontWeight="semiBold" fontSize={18}>
                  Save Change
                </Typography>
              )}
            </Button>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Profile;
