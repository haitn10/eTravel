import React, { useCallback, useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ErrorModal from "../common/ErrorModal";
import Header from "../common/Header";
import Action from "../common/Action";
import { getTours } from "./action";
import transactions from "../../constants/tables/transactions";

const ManageTransactions = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    totalCount: 0,
  });

  const [pageModelState, setPageModelState] = useState({
    page: 0,
    pageSize: 10,
  });

  const [notification, setNotification] = useState({
    errorState: false,
    errorMessage: "",
    status: "error",
  });

  const getData = useCallback(() => {
    async function fetchData() {
      try {
        setPageState((old) => ({
          ...old,
          isLoading: true,
        }));
        const data = await dispatch(
          getTours({
            PageNumber: pageModelState.page,
            PageSize: pageModelState.pageSize,
          })
        );
        setPageState((old) => ({
          ...old,
          isLoading: false,
          data: data.tours.data,
          totalCount: data.tours.totalCount,
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

  const onNavigate = (params) => {
    navigate("/tours/details", { data: params.row.id });
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
      minHeight="94vh"
      margin="1.25em"
      padding={2}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
    >
      {/* Title */}

      <ErrorModal
        open={notification.errorState}
        setOpen={setNotification}
        message={notification.errorMessage}
        status={notification.status}
      />
      <Header
        title={"Manage Tournaments"}
        subTitle={"Manage all them existing tours or update status."}
        showBack={false}
        showSearch={true}
        showFilter={false}
        buttonAdd={false}
      />

      {/* Data Table */}
      <Box paddingX={2} flexGrow={1} marginTop={3}>
        <DataGrid
          autoHeight
          disableColumnMenu
          disableRowSelectionOnClick
          columns={transactions.concat(action)}
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
            minHeight: "72vh",
            "& .MuiDataGrid-row:hover": {
              cursor: "pointer",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ManageTransactions;
