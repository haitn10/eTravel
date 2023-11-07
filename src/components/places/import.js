import {
  Box,
  Button,
  Typography,
  useTheme,
  alpha,
  LinearProgress,
  Grid,
  FormHelperText,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
import {
  CloudArrowUp,
  CloudCheckmark,
  CloudDismiss,
} from "styled-icons/fluentui-system-regular";
import {
  excelFileTypes,
  imageFileTypes,
  mp3FileTypes,
} from "../../constants/fileType";
import { importPlaceByFile } from "./action";
import { ExpandMore } from "styled-icons/material";

const ImportPlaces = () => {
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const [excelFile, setExcelFile] = useState(null);
  const [imageFileList, setImageFileList] = useState([]);
  const [mp3FileList, setMp3FileList] = useState([]);
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

  const handleChangeExcelFile = (e) => {
    clearErrors("excelFile");
    const file = e.target.files[0];
    if (excelFileTypes.includes(file.type)) {
      setExcelFile(file);
    } else setError("excelFile", { message: "Please select a excel file!" });
  };

  const handleChangeFile = (e) => {
    const filesList = Array.from(e.target.files);
    filesList.forEach((file) => {
      if (imageFileTypes.includes(file.type)) {
        setImageFileList((preImageList) => preImageList.concat(file));
      } else if (mp3FileTypes.includes(file.type)) {
        setMp3FileList((preMp3List) => preMp3List.concat(file));
      } else setError("errorFile", { message: "Please select file correct!" });
    });
  };

  const onSubmit = async () => {
    const data = imageFileList.concat(mp3FileList).concat(excelFile);
    try {
      const res = await importPlaceByFile(data);
      if (res) {
        setExcelFile(null);
        setImageFileList([]);
        setMp3FileList([]);
        setNotification({
          ...notification,
          errorState: true,
          errorMessage: "Import Place By File Successfully!",
          status: "success",
        });
      }
    } catch (e) {
      setNotification({
        ...notification,
        errorState: true,
        errorMessage: "Import Failed!",
        status: "error",
      });
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
          <Grid item xs={12}>
            <Box marginBottom={1}>
              <Typography
                fontSize={14}
                letterSpacing={0.5}
                fontWeight="medium"
                textTransform="capitalize"
                color={theme.palette.text.third}
              >
                Import ecxel file here
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item md={12} lg={excelFile ? 6 : 12}>
                <Box
                  display="flex"
                  alignItems="center"
                  border={1}
                  borderRadius={2.5}
                  borderColor={
                    errors.excelFile
                      ? theme.palette.text.active
                      : alpha(theme.palette.text.primary, 0.28)
                  }
                  height={40}
                >
                  <label
                    htmlFor="excelFile"
                    style={{
                      display: "flex",
                      width: "100%",
                      color: theme.palette.text.third,
                      cursor: "pointer",
                    }}
                  >
                    {excelFile ? (
                      <Box display="flex" alignItems="center">
                        {errors.excelFile ? (
                          <CloudDismiss
                            height={24}
                            color={theme.palette.text.active}
                            style={{ margin: 10 }}
                          />
                        ) : (
                          <CloudCheckmark
                            height={24}
                            color={theme.palette.text.onStatus}
                            style={{ margin: 10 }}
                          />
                        )}
                        <Typography noWrap>{excelFile?.name}</Typography>
                      </Box>
                    ) : (
                      <Box
                        display="flex"
                        alignItems="center"
                        color={alpha(theme.palette.text.secondary, 0.4)}
                      >
                        <CloudArrowUp height={24} style={{ margin: 10 }} />
                        <Typography noWrap>
                          Click to import excel file
                        </Typography>
                      </Box>
                    )}

                    <input
                      id="excelFile"
                      type="file"
                      style={{
                        opacity: 0,
                        position: "absolute",
                      }}
                      onChange={handleChangeExcelFile}
                      accept=".xlsx"
                    />
                  </label>
                </Box>
              </Grid>

              {excelFile ? (
                <Grid item md={12} lg={6}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={1}
                    borderRadius={5}
                    paddingLeft={2}
                    marginBottom={1}
                    bgcolor={alpha(theme.palette.text.onStatus, 0.2)}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1.5}
                      maxWidth={250}
                      marginRight={2}
                    >
                      <Box color={theme.palette.text.onStatus}>
                        <FiletypeExe width={20} />
                      </Box>
                      <Typography noWrap fontSize={14}>
                        {excelFile.name}
                      </Typography>
                    </Box>

                    <Box width={"60%"}>{/* <LinearProgress /> */}</Box>

                    <Box>
                      <IconButton
                        onClick={(e) => setExcelFile(null)}
                        sx={{ padding: 1 }}
                      >
                        <CloseOutline width={24} />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              ) : null}
            </Grid>
            <FormHelperText
              htmlFor="render-select"
              error
              sx={{ marginLeft: 2 }}
            >
              {errors.excelFile?.message}
            </FormHelperText>
          </Grid>

          <Grid item xs={12}>
            <Box marginBottom={1}>
              <Typography
                fontSize={14}
                letterSpacing={0.5}
                fontWeight="medium"
                textTransform="capitalize"
                color={theme.palette.text.third}
              >
                Import others files here
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid
                item
                md={12}
                lg={
                  imageFileList.length === 0 && mp3FileList.length === 0
                    ? 12
                    : 6
                }
              >
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
                      accept="image/jpeg, image/png, audio/mpeg, audio/mp3"
                    />
                  </Button>
                </Box>
              </Grid>

              {imageFileList.length === 0 && mp3FileList.length === 0 ? null : (
                <Grid item md={12} lg={6}>
                  <Accordion sx={{ marginTop: 1, boxShadow: "none" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMore width={24} />}
                      sx={{
                        alignItems: "center",
                        bgcolor: theme.palette.background.primary,
                      }}
                    >
                      <Typography
                        fontSize={14}
                        letterSpacing={0.5}
                        fontWeight="medium"
                        textTransform="uppercase"
                        color={theme.palette.text.third}
                      >
                        Image Files List ({imageFileList.length})
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {imageFileList.map((file, index) => (
                        <Box
                          key={index}
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          gap={1}
                          paddingLeft={2}
                          borderRadius={5}
                          marginBottom={1}
                          bgcolor={alpha(theme.palette.text.checked, 0.2)}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={1.5}
                            maxWidth={250}
                            marginRight={2}
                          >
                            <Box color={theme.palette.text.checked}>
                              <FiletypePng width={20} />
                            </Box>
                            <Typography noWrap fontSize={14}>
                              {file.name}
                            </Typography>
                          </Box>
                          <Box width={"60%"}>{/* <LinearProgress /> */}</Box>
                          <Box>
                            <IconButton
                              onClick={(e) =>
                                setImageFileList(
                                  imageFileList.filter(
                                    (img, id) => id !== index
                                  )
                                )
                              }
                              sx={{ padding: 1 }}
                            >
                              <CloseOutline width={24} />
                            </IconButton>
                          </Box>
                        </Box>
                      ))}
                    </AccordionDetails>
                  </Accordion>

                  <Accordion sx={{ marginTop: 1, boxShadow: "none" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMore width={24} />}
                      sx={{
                        alignItems: "center",
                        bgcolor: theme.palette.background.primary,
                      }}
                    >
                      <Typography
                        fontSize={14}
                        letterSpacing={0.5}
                        fontWeight="medium"
                        textTransform="uppercase"
                        color={theme.palette.text.third}
                      >
                        MP3 Files List ({mp3FileList.length})
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {mp3FileList.map((file, index) => (
                        <Box
                          key={index}
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          gap={1}
                          paddingLeft={2}
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
                              <FiletypeMp3 width={22} />
                            </Box>
                            <Typography noWrap fontSize={14}>
                              {file.name}
                            </Typography>
                          </Box>
                          <Box width={"60%"}>{/* <LinearProgress /> */}</Box>
                          <Box>
                            <IconButton
                              onClick={(e) =>
                                setMp3FileList(
                                  mp3FileList.filter((mp3, id) => id !== index)
                                )
                              }
                              sx={{ padding: 1 }}
                            >
                              <CloseOutline width={24} />
                            </IconButton>
                          </Box>
                        </Box>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              )}
            </Grid>

            <FormHelperText
              htmlFor="render-select"
              error
              sx={{ marginLeft: 2 }}
            >
              {errors.errorFile?.message}
            </FormHelperText>
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="center" marginTop={5}>
          <Button
            color="error"
            variant="contained"
            sx={{ borderRadius: 2.5, width: 200 }}
            onClick={onSubmit}
          >
            Import File
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ImportPlaces;
