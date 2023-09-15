import { EyeOutline, EyeOffOutline } from "@styled-icons/evaicons-outline/";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Tab,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

const Profile = () => {
  const theme = useTheme();
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
          <TabPanel value="1">
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
                  disabled
                />
              </Box>
              <Box width={600}>
                <Typography
                  textTransform="uppercase"
                  color={theme.palette.text.third}
                  fontWeight="semiBold"
                  marginBottom={1}
                >
                  Email
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
                  Phone
                </Typography>
                <TextField
                  fullWidth
                  inputProps={{ style: { height: "1em" } }}
                  InputProps={{ style: { borderRadius: 10 } }}
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
                        {showConfirmPassword ? (
                          <EyeOffOutline />
                        ) : (
                          <EyeOutline />
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
