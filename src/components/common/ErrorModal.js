import { Alert, IconButton, Slide } from "@mui/material";
import { CloseOutline } from "@styled-icons/evaicons-outline";
import React from "react";

const ErrorModal = ({ open, setOpen, title, message, status }) => {
  return (
    <Slide
      in={open}
      direction="left"
      mountOnEnter
      unmountOnExit
      sx={{ position: "absolute", width: 400, right: 5, zIndex: 1 }}
    >
      <Alert
        color={status}
        severity={status}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen({ errorState: false });
            }}
          >
            <CloseOutline fontSize="inherit" width={24} />
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
