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
import { useNavigate } from "react-router-dom";

import Header from "../common/Header";
import ErrorModal from "../common/ErrorModal";
import AddCategory from "../common/components/AddCategory";
import Action from "../common/Action";

import categories from "../../constants/tables/categories";
import { getCategories, processCategory } from "./action";
import { getAllLanguages } from "../languages/action";

const initialCategoryLanguage = { languageCode: "zh-cn", nameLanguage: "" };

const ManageCategories = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({ name: "" });
  const [categoryLanguages, setCategoryLanguages] = useState([
    initialCategoryLanguage,
  ]);
  const [languageList, setLanguageList] = useState([]);
  const form = useForm({
    defaultValues: { name: "", categoryLanguages: [initialCategoryLanguage] },
  });

  const { register, handleSubmit, setError, clearErrors, formState } = form;
  const { errors } = formState;

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

  useEffect(() => {
    async function fetchLanguage() {
      const response = await dispatch(getAllLanguages());
      setLanguageList(response.languages);
    }
    fetchLanguage();
  }, [dispatch]);

  const getData = useCallback(() => {
    async function fetchData() {
      try {
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
          data: data.categories.data,
          totalCount: data.categories.totalCount,
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

  const handleClose = () => {
    setOpen(false);
  };

  const isDuplicate = () => {
    const nameOccurrences = {};
    for (const obj of categoryLanguages) {
      if (nameOccurrences[obj.languageCode]) {
        return true;
      }
      nameOccurrences[obj.languageCode] = true;
    }
    return false;
  };

  const onSubmit = async () => {
    if (isDuplicate()) {
      return setError("languageCode", {
        message: "Duplicate language!",
      });
    }

    if (categoryLanguages.some((item) => item.nameLanguage === "")) {
      return setError("nameLanguage", {
        message: "Language Name not empty!",
      });
    }
    const data = { ...values, categoryLanguages: categoryLanguages };
    try {
      await dispatch(processCategory(data));
      setNotification({
        ...notification,
        errorState: true,
        errorMessage: "Created successfully!",
        status: "success",
      });
      setValues({ name: "" });
      setCategoryLanguages([initialCategoryLanguage]);
      setOpen(false);
    } catch (e) {
      const message = e.response.data
        ? e.response.data.title
        : "Something went wrong!";
      setNotification({
        ...notification,
        errorState: true,
        errorMessage: message,
        status: "error",
      });
    }
    getData();
  };

  const onNavigate = async (params) => {
    navigate("/categories/details", {
      state: { categoryId: params.row.id, languageList: languageList },
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
            api="portal/categories/changestatus"
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
        message={notification.errorMessage}
        status={notification.status}
      />
      <Header
        title={"Manage Categories"}
        subTitle={"Manage all them existing catogories or update status."}
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
          columns={categories.concat(action)}
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

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
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
          Add New Category
        </DialogTitle>
        <DialogContent sx={{ paddingX: 20, marginTop: 5 }}>
          <AddCategory
            values={values}
            setValues={setValues}
            categoryLanguages={categoryLanguages}
            setCategoryLanguages={setCategoryLanguages}
            languageList={languageList}
            register={register}
            errors={errors}
            clearErrors={clearErrors}
          />
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
            Add New
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

export default ManageCategories;
