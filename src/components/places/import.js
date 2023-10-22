import {
  Box,
  Button,
  Grid,
  Typography,
  FormHelperText,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

import ErrorModal from "../common/ErrorModal";
import Header from "../common/Header";
import UploadFile from "../common/UploadFile";
import { useForm } from "react-hook-form";

const ImportPlaces = () => {
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const [showFile, setShowFile] = useState(null);
  const [notification, setNotification] = useState({
    errorState: false,
    errorMessage: "",
    status: "error",
  });

  const form = useForm({
    defaultValues: {},
  });
  const { handleSubmit, setError, clearErrors, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];

    if (file instanceof File) {
      if (file && fileTypes.includes(file.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = (e) => {
          setShowFile(e.target.result);
        };
      } else {
        setError("fileType", {
          message: "Please select only excel file types!",
        });
        setShowFile(null);
      }
    } else {
      setError("fileType", { message: "Please select your file!" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const onShow = () => {
    if (showFile !== null) {
      const workbook = XLSX.read(showFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setShowFile(data.slice());
    }
  };

  console.log(showFile);

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
      <Header
        title={"Import Places List"}
        subTitle={"More Places - More Experiences - More Amenity"}
        showBack={false}
        showSearch={false}
        showFilter={false}
        buttonAdd={false}
      />

      <Box paddingX={20} flexGrow={1} marginTop={5}>
        <Grid container gap={1}>
          <Grid item md={12} lg={3} display="flex" justifyContent="center">
            <Typography fontWeight="medium">Import places list</Typography>
          </Grid>

          <Grid item md={12} lg={6}>
            <UploadFile
              file={file}
              setFile={setFile}
              clearErrors={clearErrors}
            />
            <FormHelperText htmlFor="render-select" error>
              {errors.fileType?.message}
            </FormHelperText>
          </Grid>

          <Grid item md={12} lg={2} display="flex" justifyContent="center">
            <Button
              disabled={!showFile}
              onClick={onShow}
              variant="contained"
              color="error"
              sx={{
                borderRadius: "50px",
                width: "120px",
                height: "40px",
              }}
            >
              Show data
            </Button>
          </Grid>
        </Grid>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding={3}
          marginTop={5}
          bgcolor={theme.palette.background.secondary}
        >
          {showFile ? (
            <></>
          ) : (
            <Box>
              <Typography>No File is uploaded yet!</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ImportPlaces;
