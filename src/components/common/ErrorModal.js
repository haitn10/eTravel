import { Alert, IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const ErrorModal = ({ open, setOpen, title, message }) => {
  return (
    <Slide
      in={open}
      direction="left"
      mountOnEnter
      unmountOnExit
      sx={{ position: "absolute", width: 400, right: 5 }}
    >
      <Alert
        color="error"
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {title} — <strong>{message}</strong>
      </Alert>
    </Slide>
  );
};

export default ErrorModal;
