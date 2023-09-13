import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
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
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const theme = useTheme();
  const profile = useSelector((state) => state.auth.profile);
  const [value, setValue] = useState("1");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(!loading);
  };

  return (
    <Box
      margin="1.25em"
      padding={2}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
      minHeight="90vh"
    >
      {/* Title */}
      <Box padding={1} marginLeft={2}>
        <Typography
          color={theme.palette.text.active}
          fontWeight="bold"
          fontSize={36}
        >
          Settings
        </Typography>
        <Typography
          color={theme.palette.text.third}
          fontWeight="regular"
          fontSize={18}
        >
          Manage personal information and update them.
        </Typography>
      </Box>

      {/* Information Settings */}
      <Box paddingX={2} marginTop={3}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="General" value="1" />
              <Tab label="Password" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ paddingX: 5 }}>
            <form
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
              onSubmit={onSubmit}
            >
              <Box flexGrow={1} style={{ display: "flex" }}>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  padding={2}
                  gap={2}
                >
                  <Avatar
                    variant="rounded"
                    sx={{
                      width: 200,
                      height: 200,
                      border: 5,
                      borderColor: theme.palette.background.secondary,
                    }}
                    src={profile.image}
                  />
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="raised-button-file"
                    type="file"
                  />
                  <label htmlFor="raised-button-file">
                    <Button variant="outlined" color="error" component="span">
                      Change Image
                    </Button>
                  </label>
                </Box>
                <Grid flexGrow={2} container paddingX={4} spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      textTransform="uppercase"
                      color={theme.palette.text.third}
                      fontWeight="semiBold"
                    >
                      UserName
                    </Typography>
                    <TextField
                      fullWidth
                      inputProps={{ style: { height: "1em" } }}
                      InputProps={{
                        style: {
                          borderRadius: 10,
                          backgroundColor: theme.palette.background.secondary,
                        },
                      }}
                      value={profile.email.slice(0, profile.email.indexOf("@"))}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      textTransform="uppercase"
                      color={theme.palette.text.third}
                      fontWeight="semiBold"
                    >
                      Email
                    </Typography>
                    <TextField
                      fullWidth
                      inputProps={{ style: { height: "1em" } }}
                      InputProps={{
                        style: {
                          borderRadius: 10,
                          backgroundColor: theme.palette.background.secondary,
                        },
                      }}
                      value={profile.email}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      textTransform="uppercase"
                      color={theme.palette.text.third}
                      fontWeight="semiBold"
                    >
                      First Name
                    </Typography>
                    <TextField
                      fullWidth
                      inputProps={{ style: { height: "1em" } }}
                      InputProps={{
                        style: {
                          borderRadius: 10,
                        },
                      }}
                      value={profile.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      textTransform="uppercase"
                      color={theme.palette.text.third}
                      fontWeight="semiBold"
                    >
                      Last Name
                    </Typography>
                    <TextField
                      fullWidth
                      inputProps={{ style: { height: "1em" } }}
                      InputProps={{
                        style: {
                          borderRadius: 10,
                        },
                      }}
                      value={profile.lastName}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      textTransform="uppercase"
                      color={theme.palette.text.third}
                      fontWeight="semiBold"
                    >
                      National
                    </Typography>
                    <Select value={profile.nationality} fullWidth displayEmpty>
                      <MenuItem value={"Japan"}>
                        <ListItemIcon></ListItemIcon>
                        Japan
                      </MenuItem>
                      <MenuItem value={"VietNam"}>
                        <ListItemIcon></ListItemIcon>VietNam
                      </MenuItem>
                      <MenuItem value={"ThaiLand"}>
                        {" "}
                        <ListItemIcon></ListItemIcon>ThaiLand
                      </MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      textTransform="uppercase"
                      color={theme.palette.text.third}
                      fontWeight="semiBold"
                    >
                      Gender
                    </Typography>
                    <Select value={profile.gender} fullWidth displayEmpty>
                      <MenuItem value={"Male"}> Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Third"}>Third</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      textTransform="uppercase"
                      color={theme.palette.text.third}
                      fontWeight="semiBold"
                      marginBottom={1}
                    >
                      Phone
                    </Typography>
                    <TextField
                      fullWidth
                      inputProps={{ style: { height: "1em" } }}
                      InputProps={{ style: { borderRadius: 10 } }}
                      value={profile.phone}
                      onChange={(e) => {}}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      textTransform="uppercase"
                      color={theme.palette.text.third}
                      fontWeight="semiBold"
                      marginBottom={1}
                    >
                      Address
                    </Typography>
                    <TextField
                      fullWidth
                      inputProps={{ style: { height: "1em" } }}
                      InputProps={{ style: { borderRadius: 10 } }}
                      value={profile.address}
                      onChange={(e) => {}}
                    />
                  </Grid>
                </Grid>
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
            </form>
          </TabPanel>
          <TabPanel value="2">
            <form
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 30,
              }}
              onSubmit={onSubmit}
            >
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
                        {showPassword ? <VisibilityOff /> : <Visibility />}
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
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
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
            </form>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Profile;
