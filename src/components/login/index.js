import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

import logo from "../../assets/etravel-logo.png";
import ErrorModal from "../common/ErrorModal";

const Login = () => {
  const theme = useTheme();
  const [errorState, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();

    //ANIMATION_LOADING
    setLoading(!loading);
    setTimeout(() => setLoading(false), 2000);

    //Error message
    setErrorState(true);
    setErrorMessage("Invalid login");
  };
  return (
    <Box
      component="main"
      paddingTop={10}
      onKeyPress={(e) => (e.key === "Enter" ? onLogin : {})}
      height="100%"
    >
      <ErrorModal
        open={errorState}
        setOpen={setErrorState}
        title="Info"
        message={errorMessage}
      />
      <form onSubmit={onLogin}>
        <Box
          display="flex"
          flexDirection="column"
          maxWidth={400}
          alignItems="center"
          justifyContent="center"
          margin="auto"
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          backgroundColor={theme.palette.background.primary}
        >
          <img src={logo} width="180px" height="180px" alt="logo" />

          <TextField
            fullWidth
            label="User Name"
            margin="normal"
            variant="outlined"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="e.g admin123"
            required
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            variant="outlined"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password"
            required
          />
          <Button
            variant="contained"
            disabled={loading}
            color="error"
            sx={{
              marginTop: "30px",
              borderRadius: "5px",
              width: "150px",
              height: "40px",
            }}
            type="submit"
          >
            {loading ? (
              <CircularProgress color="error" size={25} />
            ) : (
              <Typography fontWeight={700} fontSize={20}>
                Log In
              </Typography>
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
