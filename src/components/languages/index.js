import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import Header from "../common/Header";

import action from "../../constants/action";
import { getLanguageCode, getLanguages } from "./action";
import languages from "../../constants/tables/languages";
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const initialState = {
  name: "Tour Operator",
  icon: "",
  fileLink: "",
  languageCode: "",
};

const ManageLanguages = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(initialState);
  const form = useForm({ defaultValues: initialState });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
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
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
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

  // useEffect(() => {
  //   getLanguageCode();
  // }, [open]);

  // useEffect(() => {
  //   getData();
  // }, [getData]);

  const onSubmit = async () => {
    // try {
    //   await dispatch(processStaff(values));
    //   setNotification({
    //     ...notification,
    //     errorState: true,
    //     errorMessage: "Created successfully!",
    //     status: "success",
    //   });
    //   setValues(initialState);
    //   setOpen(false);
    // } catch (e) {
    //   const message = e.response.data ? e.response.data.message : e.message;
    //   setNotification({
    //     ...notification,
    //     errorState: true,
    //     errorMessage: message,
    //     status: "error",
    //   });
    // }
    // getData();
    // //Close error message
    // setTimeout(
    //   () => setNotification({ ...notification, errorState: false }),
    //   3000
    // );
  };
  return (
    <Box
      margin="1.25em"
      padding={2}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
    >
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
          disableRowSelectionOnClick
          columns={languages.concat(action)}
          rows={pageState.data}
          rowCount={pageState.totalCount}
          loading={pageState.isLoading}
          paginationModel={pageModelState}
          pageSizeOptions={[5, 10, 20]}
          paginationMode="server"
          onPaginationModelChange={setPageModelState}
          onRowClick={() => setOpen(true)}
          sx={{
            border: 0,
            minHeight: "75vh",
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
          Add New Languages
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
              <Typography>Language Name</Typography>
              <Select
                value={values.name}
                sx={{ borderRadius: 2.5 }}
                name="name"
                fullWidth
                onChange={handleChange}
              >
                <MenuItem value="Tour Operator" defaultValue>
                  Tour Operator
                </MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>

              <Typography sx={{ width: 100 }}>Language Code</Typography>
              <TextField
                size="small"
                disabled
                InputProps={{
                  style: {
                    borderRadius: 10,
                  },
                }}
                value={"zh"}
              />
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={3}
              marginBottom={4}
            >
              <Typography sx={{ width: 100 }}>File</Typography>
              <TextField
                fullWidth
                InputProps={{
                  style: {
                    borderRadius: 10,
                  },
                }}
                helperText="Data must format correctly!"
                type="file"
                inputProps={{
                  style: { height: "1em" },
                  accept: "image/*",
                  multiple: true,
                }}
              />
            </Box>
            <Typography color="error">
              (Get data template <Link>here</Link> )
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
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            sx={{
              borderRadius: 2.5,
              height: 40,
            }}
          >
            Add New
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageLanguages;
