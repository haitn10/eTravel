import React, { useCallback, useEffect, useState } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPlaces } from "./action";

import ErrorModal from "../common/ErrorModal";
import Header from "../common/Header";
import Action from "../common/Action";

import places from "../../constants/tables/places";

const ManagePlaces = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
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
          getPlaces({
            PageNumber: pageModelState.page,
            PageSize: pageModelState.pageSize,
            SearchBy: "name",
            Search: search,
          })
        );
        setPageState((old) => ({
          ...old,
          isLoading: false,
          data: data.places?.data,
          totalCount: data.places.totalCount,
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
  }, [search, pageModelState.page, pageModelState.pageSize]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onNavigate = (params) => {
    navigate("/places/details", { state: { placeId: params.row.id } });
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
            titleAc={"Are you sure you want to activate?"}
            titleDe={"Are you sure you want to deactivate?"}
            messageAc={
              "This action of yours will make this place active again and users can operate directly with this place."
            }
            messageDe={
              "Your action will cause this place to no longer be used in the system."
            }
            id={params.row.id}
            api="portal/places/changestatus"
            status={params.row.status}
            getData={getData}
            notification={notification}
            setNotification={setNotification}
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
        title={"Manage Places"}
        subTitle={"Manage all them existing places or update status."}
        showSearch={true}
        search={search}
        setSearch={setSearch}
      />

      {/* Data Table */}
      <Grid container paddingX={2} marginTop={3} width="99%">
        <Grid item xs={12}>
          <DataGrid
            autoHeight
            disableColumnMenu
            disableRowSelectionOnClick
            columns={places.concat(action)}
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManagePlaces;
