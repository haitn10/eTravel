import {
  Box,
  Button,
  Typography,
  useTheme,
  alpha,
  LinearProgress,
  Grid,
} from "@mui/material";
import React, { useRef, useState } from "react";

import ErrorModal from "../common/ErrorModal";
import Header from "../common/Header";
import { useForm } from "react-hook-form";
import {
  FileEarmarkArrowUp,
  FiletypeMp3,
  FiletypePng,
  FiletypeExe,
} from "@styled-icons/bootstrap";

import { CloseOutline } from "@styled-icons/evaicons-outline";
import { FileUploader } from "react-drag-drop-files";

const ImportPlaces = () => {
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
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

  const checkExcelFile = (file) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    return fileTypes.includes(file.type);
  };

  const handleChangeFile = (e) => {
    const filesList = Array.from(e.target.files);
    const data = [...files];

    if (filesList) {
      filesList.forEach((file) => {
        data.push(file);
      });
      setFiles(data);
    }
  };

  const onDragEnter = () => {
    fileInputRef.current.classList.add("dragover");
  };
  const onDragLeave = () => {
    fileInputRef.current.classList.remove("dragover");
  };
  const onDrop = () => {
    fileInputRef.current.classList.remove("dragover");
  };

  console.log(files);

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
      />

      <Box paddingX={10} marginTop={5}>
        <Grid container spacing={5}>
          <Grid item md={12} lg={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: `1.5px dashed ${alpha(
                  theme.palette.text.primary,
                  0.28
                )}`,
                borderRadius: 2.5,
                height: 300,
              }}
            >
              <Button
                ref={fileInputRef}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                component="label"
                sx={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <FileEarmarkArrowUp width={30} style={{ marginRight: 5 }} />
                <Typography>Drag & Drop files to upload...</Typography>
                <input
                  hidden
                  multiple
                  onChange={handleChangeFile}
                  type="file"
                  accept=".xlsx, image/*, audio/mpeg, audio/mp3"
                />
              </Button>
            </Box>
          </Grid>

          <Grid item md={12} lg={6} rowGap={2}>
            {/* <Box>
              <Typography
                fontSize={14}
                letterSpacing={0.5}
                fontWeight="medium"
                textTransform="uppercase"
                color={theme.palette.text.third}
              >
                Excel File
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                paddingX={3}
                paddingY={1}
                borderRadius={5}
                marginBottom={1}
                bgcolor={alpha(theme.palette.text.onStatus, 0.2)}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                  maxWidth={250}
                  marginRight={2}
                >
                  <Box color={theme.palette.text.onStatus}>
                    <FiletypeExe width={24} />
                  </Box>
                  <Typography noWrap>File Name</Typography>
                </Box>
                <Box width={"60%"}>
                  <LinearProgress />
                </Box>
                <Box marginLeft={2}>
                  <CloseOutline width={24} />
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography
                fontSize={14}
                letterSpacing={0.5}
                fontWeight="medium"
                textTransform="uppercase"
                color={theme.palette.text.third}
              >
                MP3 Files
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                paddingX={3}
                paddingY={1}
                borderRadius={5}
                marginBottom={1}
                bgcolor={alpha(theme.palette.text.active, 0.2)}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                  maxWidth={250}
                  marginRight={2}
                >
                  <Box color={theme.palette.text.active}>
                    <FiletypeMp3 width={24} />
                  </Box>
                  <Typography noWrap>File Name</Typography>
                </Box>
                <Box width={"60%"}>
                  <LinearProgress />
                </Box>
                <Box marginLeft={2}>
                  <CloseOutline width={24} />
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography
                fontSize={14}
                letterSpacing={0.5}
                fontWeight="medium"
                textTransform="uppercase"
                color={theme.palette.text.third}
              >
                Image Files
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                paddingX={3}
                paddingY={1}
                borderRadius={5}
                marginBottom={1}
                bgcolor={alpha(theme.palette.text.checked, 0.2)}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                  maxWidth={250}
                  marginRight={2}
                >
                  <Box color={theme.palette.text.checked}>
                    <FiletypePng width={24} />
                  </Box>
                  <Typography noWrap>File Name</Typography>
                </Box>
                <Box width={"60%"}>
                  <LinearProgress />
                </Box>
                <Box marginLeft={2}>
                  <CloseOutline width={24} />
                </Box>
              </Box>
            </Box> */}
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="center" marginTop={5}>
          <Button
            color="error"
            variant="contained"
            sx={{ borderRadius: 2.5, width: 200 }}
          >
            Import File
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ImportPlaces;
