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
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import PlacesList from "./others/PlacesList";
import TourGeneral from "./others/TourGeneral";
import PreviewData from "./others/PreviewData";
import ErrorModal from "../common/ErrorModal";
import Header from "../common/Header";

import { getPlaces } from "../places/action";
import { processTour } from "./action";
import { useForm } from "react-hook-form";

const steps = ["Information General", "Places List", "Confirmation"];

const initialState = {
  name: "",
  image: "",
  total: 0,
  description: "",
  tourDetails: [],
};

const CreateNewTour = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialState);

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    totalCount: 0,
  });

  const [pageModelState, setPageModelState] = useState({
    page: 0,
    pageSize: 10,
  });

  const [notification, setNotification] = useState({
    errorState: false,
    errorMessage: "",
    status: "error",
  });

  const form = useForm({
    defaultValues: initialState,
  });
  const { handleSubmit, setError, clearErrors, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    async function fetchData() {
      try {
        setPageState((old) => ({
          ...old,
          isLoading: true,
        }));
        const data = await dispatch(
          getPlaces({
            PageNumber: pageModelState.page,
            PageSize: pageModelState.pageSize,
          })
        );
        setPageState((old) => ({
          ...old,
          isLoading: false,
          data: data.places.data,
          totalCount: data.places.totalCount,
        }));
      } catch (error) {
        setNotification({
          ...notification,
          errorState: true,
          errorMessage: "There was a problem loading data!",
          status: "error",
        });
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageModelState.page, pageModelState.pageSize]);

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
        return (
          <TourGeneral
            values={values}
            setValues={setValues}
            errors={errors}
            setError={setError}
            clearErrors={clearErrors}
          />
        );
      case 1:
        return (
          <PlacesList
            values={values}
            setValues={setValues}
            pageState={pageState}
            setPageState={setPageState}
            pageModelState={pageModelState}
            setPageModelState={setPageModelState}
            notification={notification}
            setNotification={setNotification}
          />
        );
      case 2:
        return <PreviewData data={values} />;
      default:
        return;
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    let arr = [];
    for (const place of values.tourDetails) {
      arr.push({ id: place.id, price: place.price });
    }
    const data = { ...values, tourDetails: arr };
    try {
      await dispatch(processTour(data));
      setNotification({
        ...notification,
        errorState: true,
        errorMessage: "Created Tour Successfully!",
        status: "success",
      });
      setValues(initialState);
      setLoading(false);
      setActiveStep(0)
    } catch (e) {
      const message = e.response.data ? e.response.data.message : e.message;
      setNotification({
        ...notification,
        errorState: true,
        errorMessage: message,
        status: "error",
      });
      setLoading(false);
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
        title={"Create New Tour"}
        subTitle={"New Tour - New Experiences"}
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
          <form>{getStepContent(activeStep)}</form>

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
              onClick={activeStep === 2 ? handleSubmit(onSubmit) : handleNext}
              disabled={
                loading ||
                values.name === "" ||
                values.image === "" ||
                errors.fileType?.message !== undefined
              }
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

export default CreateNewTour;
