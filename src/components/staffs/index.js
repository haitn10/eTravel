import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import Header from "../common/Header";
import ErrorModal from "../common/ErrorModal";
import Action from "../common/Action";

import staffs from "../../constants/tables/staffs";
import { getStaffs, processStaff } from "./action";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  roleId: 2,
};

const ManageStaffs = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState({
    errorState: false,
    errorMessage: "",
    status: "error",
  });
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

  const getData = useCallback(() => {
    async function fetchData() {
      try {
        setPageState((old) => ({
          ...old,
          isLoading: true,
        }));
        const data = await dispatch(
          getStaffs({
            PageNumber: pageModelState.page,
            PageSize: pageModelState.pageSize,
          })
        );
        setPageState((old) => ({
          ...old,
          isLoading: false,
          data: data.accounts.data,
          totalCount: data.accounts.totalCount,
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
    getData();
  }, [getData]);

  const onNavigate = async (params) => {
    navigate("/staffs/details", { state: { accountId: params.row.id } });
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = async () => {
    try {
      await dispatch(processStaff(values));
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
            api="portal/users"
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
        title={"Manage Staffs"}
        subTitle={"Manage all them existing staffs or update status."}
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
          columns={staffs.concat(action)}
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

      {/* Modal New Staff */}
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
          Add New Staff
        </DialogTitle>
        <DialogContent sx={{ paddingX: 20, marginTop: 5 }}>
          <form noValidate>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={3}
              marginBottom={4}
            >
              <Typography sx={{ width: 100 }}>First Name</Typography>
              <TextField
                fullWidth
                autoFocus
                name="firstName"
                size="small"
                InputProps={{
                  style: {
                    borderRadius: 10,
                  },
                }}
                value={values.firstName}
                error={!!errors.firstName}
                {...register("firstName", {
                  onChange: handleChange,
                  required: "First Name is required!",
                })}
                helperText={errors.firstName?.message}
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={3}
              marginBottom={4}
            >
              <Typography sx={{ width: 100 }}>Last Name</Typography>
              <TextField
                fullWidth
                name="lastName"
                size="small"
                InputProps={{
                  style: {
                    borderRadius: 10,
                  },
                }}
                value={values.lastName}
                error={!!errors.lastName}
                {...register("lastName", {
                  onChange: handleChange,
                  required: "Last Name is required!",
                })}
                helperText={errors.lastName?.message}
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={3}
              marginBottom={4}
            >
              <Typography sx={{ width: 100 }}>Phone</Typography>
              <TextField
                fullWidth
                name="phone"
                type="tel"
                size="small"
                InputProps={{
                  style: {
                    borderRadius: 10,
                  },
                }}
                value={values.phone}
                error={!!errors.phone}
                {...register("phone", {
                  onChange: handleChange,
                  required: "Phone Number is required!",
                })}
                helperText={errors.phone?.message}
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={3}
              marginBottom={4}
            >
              <Typography sx={{ width: 100 }}>Email</Typography>
              <TextField
                fullWidth
                name="email"
                type="email"
                size="small"
                required
                InputProps={{
                  style: {
                    borderRadius: 10,
                  },
                }}
                value={values.email}
                error={!!errors.email}
                {...register("email", {
                  onChange: handleChange,
                  required: "Email is required!",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email is wrong format!",
                  },
                })}
                helperText={
                  !errors.email
                    ? '"Login with the character before @"'
                    : errors.email?.message
                }
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={3}
              marginBottom={4}
            >
              <Typography sx={{ width: 100 }}>Password</Typography>
              <TextField
                fullWidth
                name="password"
                type="password"
                size="small"
                InputProps={{
                  style: {
                    borderRadius: 10,
                  },
                }}
                value={values.password}
                error={!!errors.password}
                {...register("password", {
                  onChange: handleChange,
                  required: "Password is required!",
                })}
                helperText={errors.password?.message}
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={3}
              marginBottom={4}
            >
              <Typography sx={{ width: 100 }}>Role</Typography>
              <FormControl
                sx={{
                  minWidth: 120,
                }}
                fullWidth
                size="small"
              >
                <Select
                  value={values.roleId}
                  sx={{ borderRadius: 2.5 }}
                  name="roleId"
                  onChange={handleChange}
                >
                  <MenuItem value={2} defaultValue>
                    Tour Operator
                  </MenuItem>
                  <MenuItem value={1}>Admin</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </form>
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

export default ManageStaffs;
