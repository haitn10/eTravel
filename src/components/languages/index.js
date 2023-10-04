import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Header from "../common/Header";
import UploadFile from "../common/UploadFile";
import ErrorModal from "../common/ErrorModal";

import action from "../../constants/action";
import { getLanguageCode, getLanguages, processLanguage } from "./action";
import languages from "../../constants/tables/languages";

const initialState = {
  name: "Afar",
  icon: "",
  fileLink: "",
  languageCode: "aa",
};

const ManageLanguages = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [languageId, setLanguageId] = useState(null);
  const [languageCode, setLanguageCode] = useState([]);
  const [values, setValues] = useState(initialState);
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

  const handleClose = () => {
    setOpen(false);
    setValues(initialState);
    setLanguageId(null);
  };

  const handleChange = (event) => {
    const data = languageCode.filter(
      (item) => item.langEnglishName === event.target.value
    );
    setValues({
      ...values,
      name: event.target.value,
      languageCode: data[0] ? data[0].langCode : "",
    });
  };

  const getData = useCallback(() => {
    async function fetchData() {
      setPageState((old) => ({
        ...old,
        isLoading: true,
      }));
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
    }
    fetchData();
  }, [dispatch, pageModelState.page, pageModelState.pageSize]);

  const getLangCode = useCallback(() => {
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
  }, [languageCode.length]);

  useEffect(() => {
    getData();
    getLangCode();
  }, [getData, getLangCode]);

  const onSubmit = async () => {
    try {
      await dispatch(processLanguage(values));
      setNotification({
        ...notification,
        errorState: true,
        errorMessage: "Created successfully!",
        status: "success",
      });
      setValues(initialState);
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
    //Close error message
    setTimeout(
      () => setNotification({ ...notification, errorState: false }),
      3000
    );
  };
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
          onRowClick={(params) => {
            setOpen(true);
            setLanguageId(params.row.id);
          }}
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
              marginBottom={4}
            >
              <Typography sx={{ width: 200 }}>Language Name</Typography>
              <Select
                value={languageId ? "" : values.name}
                sx={{ borderRadius: 2.5 }}
                name="name"
                fullWidth
                onChange={handleChange}
              >
                {languageCode.map((item, index) => (
                  <MenuItem key={index} value={item.langEnglishName}>
                    <img
                      src={""}
                      alt={item.langEnglishName}
                      style={{ width: 20, marginRight: 10 }}
                    />
                    {item.langEnglishName}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={3}
              marginBottom={4}
            >
              <Typography sx={{ width: 200 }}>Language Code</Typography>
              <TextField
                fullWidth
                size="small"
                disabled
                InputProps={{
                  style: {
                    borderRadius: 10,
                  },
                }}
                value={values.languageCode}
              />
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={3}
              marginBottom={4}
            >
              <Typography sx={{ width: 200 }}>File</Typography>
              <UploadFile />
            </Box>
            <Typography color="error">
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
            onClick={onSubmit}
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
