import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import TourGeneral from "../common/newData/TourGeneral";
import PlacesList from "../common/PlacesList";
import PreviewData from "../common/newData/PreviewData";

const steps = ["Information General", "Places List", "Confirmation"];

const CreateNewTour = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = () => {
    setLoading(true);

    setTimeout(() => setLoading(false), 2000);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <TourGeneral />;
      case 1:
        return <PlacesList />;
      case 2:
        return <PreviewData />;
      default:
        return;
    }
  };

  return (
    <Box
      minHeight="95vh"
      margin="1.25em"
      padding={2}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="error" />
      </Backdrop>
      <Box padding={1} marginX={2}>
        <Box>
          <Typography
            color={theme.palette.text.active}
            fontWeight="bold"
            fontSize={36}
          >
            Create New Tour
          </Typography>
          <Typography
            color={theme.palette.text.third}
            fontWeight="regular"
            fontSize={18}
          >
            New Tour - New Experience
          </Typography>
        </Box>

        <Box marginTop={5}>
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
                onClick={activeStep === 2 ? handleSubmit : handleNext}
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
    </Box>
  );
};

export default CreateNewTour;
