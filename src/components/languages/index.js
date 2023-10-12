import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Header from "../common/Header";
import UploadFile from "../common/UploadFile";
import ErrorModal from "../common/ErrorModal";
import Action from "../common/Action";

import { getLanguageCode, getLanguages, processLanguage } from "./action";
import languages from "../../constants/tables/languages";

const initialState = {
  name: "",
  icon: "",
  languageCode: "",
};

const ManageLanguages = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [languageId, setLanguageId] = useState(null);
  const [languageCode, setLanguageCode] = useState([]);
  const [values, setValues] = useState(initialState);
  const [file, setFile] = useState();
  const [notification, setNotification] = useState({
    errorState: false,
    errorMessage: "",
    status: "error",
  });
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    totalCount: 0,
  });

  const [pageModelState, setPageModelState] = useState({
    page: 0,
    pageSize: 10,
  });

  const form = useForm({
    defaultValues: initialState,
  });
  const { handleSubmit, setError, clearErrors, formState } = form;
  const { errors } = formState;

  const getData = useCallback(() => {
    async function fetchData() {
      setPageState((old) => ({
        ...old,
        isLoading: true,
      }));
      try {
        const data = await dispatch(
          getLanguages({
            PageNumber: pageModelState.page,
            PageSize: pageModelState.pageSize,
          })
        );
        setPageState((old) => ({
          ...old,
          isLoading: false,
          data: data.languages.data,
          totalCount: data.languages.totalCount,
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
  }, [dispatch, pageModelState.page, pageModelState.pageSize]);

  useEffect(() => {
    if (languageCode.length > 0) {
      return;
    }
    async function fetchData() {
      try {
        const res = await getLanguageCode();
        setLanguageCode(res);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getData]);

  const handleChange = (event) => {
    clearErrors("values");
    setValues({
      ...values,
      name: event?.target.value.languageName,
      icon: event?.target.value.icon,
      languageCode: event?.target.value.nationalCode,
    });
  };

  const onSubmit = async () => {
    if (values.name === "") {
      return setError("values", {
        message: "Choose language!",
      });
    }
    if (!file) {
      return setError("fileType", {
        message: "Must import a JSON file!",
      });
    } else if (file.type !== "application/json") {
      return setError("fileType", {
        message: "Only JSON file are allowed!",
      });
    }
    try {
      await dispatch(processLanguage(values, file));
      setNotification({
        ...notification,
        errorState: true,
        errorMessage: "Created successfully!",
        status: "success",
      });
      setOpen(false);
    } catch (e) {
      const message = e.response.data ? e.response.data.message : e.message;
      setNotification({
        ...notification,
        errorState: true,
        errorMessage: message,
        status: "error",
      });
    }
    getData();
  };

  const handleClose = () => {
    setOpen(false);
    setValues(initialState);
    clearErrors("values");
    setFile();
    setLanguageId(null);
  };

  const onNavigate = async (params) => {
    navigate("/languages/details", {
      state: { languageId: params.row.id, languageCode: languageCode },
    });
  };

  const action = [
    {
      field: "action",
      headerName: "Actions",
      width: 120,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          <Action
            id={params.row.id}
            accountStatus={params.row.status}
            api="languages"
            notification={notification}
            setNotification={setNotification}
            getData={getData}
          />
        );
      },
    },
  ];

  return (
    <Box
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
        title={"Manage Languages"}
        subTitle={"Manage all them existing languages or update status."}
        showBack={false}
        showSearch={true}
        showFilter={false}
        buttonAdd={true}
        setOpen={setOpen}
      />

      {/* Data Table */}
      <Box paddingX={2} flexGrow={1} marginTop={3}>
        <DataGrid
          autoHeight
          disableColumnMenu
          rowHeight={75}
          disableRowSelectionOnClick
          columns={languages.concat(action)}
          rows={pageState.data}
          rowCount={pageState.totalCount}
          loading={pageState.isLoading}
          paginationModel={pageModelState}
          pageSizeOptions={[5, 10, 20]}
          paginationMode="server"
          onPaginationModelChange={setPageModelState}
          onRowClick={(params) => onNavigate(params)}
          sx={{
            border: 0,
            minHeight: "77vh",
            "& .MuiDataGrid-row:hover": {
              cursor: "pointer",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
        />
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        scroll="paper"
      >
        <DialogTitle
          textAlign="center"
          color="error"
          fontWeight="bold"
          fontSize={26}
          borderBottom={1}
          borderColor={theme.palette.background.third}
        >
          {languageId ? "Language Details" : "Add New Languages"}
        </DialogTitle>
        <DialogContent sx={{ paddingX: 20, marginTop: 5 }}>
          <FormControl fullWidth size="small" noValidate>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={3}
            >
              <Typography sx={{ width: 200 }}>Language Name</Typography>
              <Select
                sx={{ borderRadius: 2.5 }}
                name="values"
                fullWidth
                defaultValue=""
                onChange={handleChange}
                error={!!errors?.values}
              >
                {languageCode.map((item, index) => (
                  <MenuItem key={index} value={item || ""}>
                    <img
                      src={item.icon}
                      alt={item.nationalName}
                      style={{ width: 20, marginRight: 10 }}
                    />
                    {item.nationalName}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <FormHelperText
              htmlFor="render-select"
              error
              style={{ marginLeft: 180 }}
            >
              {errors.values?.message}
            </FormHelperText>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={3}
              marginTop={4}
            >
              <Typography sx={{ width: 200 }}>Language Code</Typography>
              <TextField
                fullWidth
                size="small"
                name="nationalCode"
                disabled
                InputProps={{
                  style: {
                    borderRadius: 10,
                  },
                }}
                value={values?.languageCode}
              />
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={3}
              marginTop={4}
            >
              <Typography sx={{ width: 200 }}>File</Typography>
              <UploadFile
                file={file}
                setFile={setFile}
                clearErrors={clearErrors}
              />
            </Box>
            <FormHelperText
              htmlFor="render-select"
              error
              style={{ marginLeft: 180 }}
            >
              {errors.fileType?.message}
            </FormHelperText>
            <Typography color="error" marginTop={4}>
              (Get data template <Link>here</Link>)
            </Typography>
          </FormControl>
        </DialogContent>
        <DialogActions
          sx={{
            paddingBottom: 5,
            "&.MuiDialogActions-root": { justifyContent: "center" },
          }}
        >
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            sx={{
              borderRadius: 2.5,
              height: 40,
            }}
          >
            {languageId ? "Update" : "Add New"}
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            color="error"
            sx={{
              borderRadius: 2.5,
              height: 40,
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageLanguages;
