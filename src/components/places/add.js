import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
  useTheme,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import ErrorModal from "../common/ErrorModal";
import Header from "../common/Header";
import PlaceGeneral from "./others/PlaceGeneral";
import MultiLanguages from "./others/MultiLanguages";
import Coordinates from "./others/Coordinates";

const steps = [
  "Information General",
  "Muti-Language",
  "Coordinates",
  "Confirmation",
];

const initialState = {
  name: "",
  longitude: 0,
  latitude: 0,
  googlePlaceId: "",
  entryTicket: 0,
  hour: "",
  price: 0,
  placeCategories: [
    {
      categoryId: 0,
    },
  ],
  placeImages: [
    {
      url: "string",
      isPrimary: true,
    },
  ],
  placeDescriptions: [
    {
      languageCode: "",
      voiceFile: "",
      name: "",
      description: "",
    },
  ],
  placeTimes: [
    {
      daysOfWeek: 0,
      openTime: "",
      endTime: "",
    },
  ],
};

const AddPlace = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialState);

  const [notification, setNotification] = useState({
    errorState: false,
    errorMessage: "",
    status: "error",
  });

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PlaceGeneral values={values} setValues={setValues} />;
      case 1:
        return <MultiLanguages values={values} setValues={setValues} />;
      case 2:
        return <Coordinates values={values} setValues={setValues} />;
      case 3:
        return;
      default:
        return;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
  };
  return (
    <Box
      minHeight="95vh"
      margin="1.25em"
      padding={2}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
    >
      <ErrorModal
        open={notification.errorState}
        setOpen={setNotification}
        title="Info"
        message={notification.errorMessage}
        status={notification.status}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="error" />
      </Backdrop>

      <Header
        title={"Create New Place"}
        subTitle={"New Place - New Discovery - New Insight"}
        showBack={false}
        showSearch={false}
        showFilter={false}
        buttonAdd={false}
      />

      <Box marginTop={5} padding={1} marginX={2}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
              borderColor: theme.palette.background.hovered,
            },
            "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
              borderColor: theme.palette.background.hovered,
            },
          }}
        >
          {steps.map((label, index) => {
            const stepProps = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step
                key={label}
                sx={{
                  "& .MuiStepLabel-root .Mui-completed": {
                    color: theme.palette.background.hovered,
                  },
                  "& .MuiStepLabel-root .Mui-active": {
                    color: theme.palette.background.hovered,
                    bgColor: theme.palette.background.hovered,
                  },
                  "& .MuiStepLabel-label.MuiStepLabel-alternativeLabel": {
                    fontSize: "1rem",
                    fontWeight: "regular",
                  },
                  "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                    {
                      fontWeight: "medium",
                    },
                  "& .MuiSvgIcon-root": {
                    fontSize: 30,
                  },
                }}
              >
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <Fragment>
          <Box>{getStepContent(activeStep)}</Box>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              disabled={activeStep === 0 || loading}
              onClick={handleBack}
              variant="contained"
              color="error"
              sx={{
                marginTop: "30px",
                borderRadius: "50px",
                width: "150px",
                height: "45px",
              }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button
              onClick={activeStep === 3 ? handleSubmit : handleNext}
              disabled={loading}
              variant="contained"
              color="error"
              sx={{
                marginTop: "30px",
                borderRadius: "50px",
                width: "150px",
                height: "45px",
              }}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Fragment>
      </Box>
    </Box>
  );
};

export default AddPlace;