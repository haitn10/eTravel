import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getCategories } from "./action";

import Header from "../common/Header";

import categories from "../../constants/tables/categories";
import action from "../../constants/action";

const ManageCategories = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const form = useForm({ defaultValues: {} });
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
      setPageState((old) => ({
        ...old,
        isLoading: true,
      }));
      const data = await dispatch(
        getCategories({
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
    }
    fetchData();
  }, [dispatch, pageModelState.page, pageModelState.pageSize]);

  useEffect(() => {
    getData();
  }, [getData]);

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
        title={"Manage Categories"}
        subTitle={"Manage all them existing catogories or update status."}
        showBack={false}
        showSearch={true}
        showFilter={false}
        buttonAdd={true}
      />

      {/* Data Table */}
      <Box paddingX={2} flexGrow={1} marginTop={3}>
        <DataGrid
          autoHeight
          disableColumnMenu
          disableRowSelectionOnClick
          columns={categories.concat(action)}
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
          Add New Staff
        </DialogTitle>
        <DialogContent sx={{ paddingX: 20, marginTop: 5 }}>
          <form noValidate>
            {/* <Box
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
            </Box> */}
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

export default ManageCategories;
