import {
  Box,
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment/moment";

import UploadFile from "../common/UploadFile";
import ErrorModal from "../common/ErrorModal";
import Header from "../common/Header";

import { getLanguageDetails, updateLanguage } from "./action";
import { PreviewLink } from "@styled-icons/fluentui-system-filled";
import { useForm } from "react-hook-form";

const LanguageDetails = () => {
  const theme = useTheme();
  const { state } = useLocation();
  const { languageId, languageCode } = state;
  const [file, setFile] = useState();
  const [values, setValues] = useState({
    name: "",
    icon: "",
    languageCode: "",
  });
  const [notification, setNotification] = useState({
    errorState: false,
    errorMessage: "",
    status: "error",
  });

  const form = useForm({
    defaultValues: { name: "", icon: "", languageCode: "" },
  });
  const { handleSubmit, setError, clearErrors, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    async function getInfoDetails() {
      try {
        const data = await getLanguageDetails(languageId);
        setValues(data);
      } catch (error) {
        setNotification({
          ...notification,
          errorState: true,
          errorMessage: "Can't get data details for language!",
          status: "error",
        });
      }
    }
    getInfoDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageId]);

  const handleChange = (event) => {
    const data = languageCode.filter(
      (language) => language.languageName === event.target.value
    );
    setValues({
      ...values,
      name: data[0].languageName,
      icon: data[0].icon,
      languageCode: data[0].nationalCode,
    });
  };

  const onSubmit = async () => {
    // if (!file) {
    //   return setError("fileType", {
    //     message: "Must import a JSON file!",
    //   });
    if (file instanceof File && file.type !== "application/json") {
      return setError("fileType", {
        message: "Only JSON file are allowed!",
      });
    }
    const data = {
      name: values.name,
      icon: values.icon,
      languageCode: values.languageCode,
      fileLink: file || values.fileLink,
    };

    try {
      const res = await updateLanguage(languageId, data);
      if (res) {
        setNotification({
          ...notification,
          errorState: true,
          errorMessage: "Updated successfully!",
          status: "success",
        });
      }
    } catch (e) {
      console.log(e.response.data.errors);
      const message = e.response.data
        ? e.response.data.errors
        : "Something went wrong!";
      setNotification({
        ...notification,
        errorState: true,
        errorMessage: message,
        status: "error",
      });
    }
  };

  return (
    <Box
      margin="1.25em"
      padding={2}
      paddingBottom={10}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
      minHeight="94vh"
    >
      <ErrorModal
        open={notification.errorState}
        setOpen={setNotification}
        message={notification.errorMessage}
        status={notification.status}
      />
      <Header
        title={"Language Details"}
        subTitle={"Manage all information of language  or update them."}
        showBack={true}
        showSearch={false}
        showFilter={false}
        buttonAdd={false}
      />

      <Box marginX={20} marginTop={5} padding={1}>
        <FormGroup noValidate>
          <Grid
            container
            width="80%"
            display="flex"
            alignItems="center"
            rowGap={2}
          >
            <Grid item xs={12} md={4}>
              <Typography fontWeight="medium">Language Name</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <FormControl fullWidth size="small">
                <Select
                  sx={{ borderRadius: 2.5 }}
                  name="name"
                  fullWidth
                  value={values && values.name}
                  onChange={handleChange}
                >
                  {languageCode.map((item, index) => (
                    <MenuItem key={index} value={item.languageName}>
                      <img
                        src={item.icon}
                        alt={item.nationalName}
                        style={{ width: 20, marginRight: 10 }}
                      />
                      {item.nationalName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography fontWeight="medium">Language Code</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                size="small"
                name="languageCode"
                disabled
                InputProps={{
                  style: {
                    borderRadius: 10,
                  },
                }}
                value={values && values.languageCode}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography fontWeight="medium">File Data</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <UploadFile
                file={file}
                setFile={setFile}
                clearErrors={clearErrors}
              />
              <FormHelperText
                htmlFor="render-select"
                error
                style={{ marginLeft: 10 }}
              >
                {errors.fileType?.message}
              </FormHelperText>
              <IconButton href={values.fileLink} target="_blank">
                <Tooltip title="Preview Link">
                  <PreviewLink width={24} />
                </Tooltip>
              </IconButton>
            </Grid>

            {/* Time */}
            <Grid item xs={12} md={4}>
              <Typography fontWeight="medium">Create/Update Time</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography fontWeight="regular">
                {moment(values && values.createTime).format("MMMM DD, YYYY")} /
                {values && values.updateTime
                  ? moment(values && values.updateTime).format("MMMM DD, YYYY")
                  : "(no data)"}
              </Typography>
            </Grid>

            {/* Status */}
            <Grid item xs={4}>
              <Typography fontWeight="medium">Status</Typography>
            </Grid>
            <Grid item xs={8}>
              {values && values.status ? (
                <Typography
                  fontWeight="semiBold"
                  color={theme.palette.text.onStatus}
                >
                  Active
                </Typography>
              ) : (
                <Typography
                  fontWeight="semiBold"
                  color={theme.palette.text.active}
                >
                  Inactice
                </Typography>
              )}
            </Grid>
          </Grid>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            color="error"
            sx={{
              marginTop: 5,
              borderRadius: 2.5,
              height: 40,
              maxWidth: "fit-content",
            }}
          >
            Save Changes
          </Button>
        </FormGroup>
      </Box>
    </Box>
  );
};

export default LanguageDetails;
