import { Alert, Snackbar } from "@mui/material";
import React from "react";

const ErrorModal = ({ open, setOpen, message, status }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={setOpen} severity={status} sx={{ width: "100%" }}>
        <strong>{message}</strong>
      </Alert>
    </Snackbar>
  );
};

export default ErrorModal;
