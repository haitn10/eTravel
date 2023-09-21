import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import Header from "../common/Header";
import { getUsers } from "./action";

import users from "../../constants/tables/users";
import action from "../../constants/action";

const ManageUsers = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    async function fetchData() {
      setPageState((old) => ({
        ...old,
        isLoading: true,
      }));
      const data = await dispatch(
        getUsers({
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
  }, [dispatch, pageModelState]);

  const handleRowClick = (params) => {
    navigate("/users/details", { state: { userId: params.row.id } });
  };
  return (
    <Box
      margin="1.25em"
      padding={2}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
    >
      <Header
        title={"Manage Users"}
        subTitle={"Manage all them existing users or update status."}
        showBack={false}
        showTool={true}
      />

      {/* Data Table */}
      <Box display="flex" paddingX={2} flexGrow={1} marginTop={3}>
        <DataGrid
          autoHeight
          disableColumnMenu
          columns={users.concat(action)}
          rows={pageState.data}
          rowCount={pageState.totalCount}
          loading={pageState.isLoading}
          paginationModel={pageModelState}
          pageSizeOptions={[5, 10, 20]}
          paginationMode="server"
          onPaginationModelChange={setPageModelState}
          onRowClick={handleRowClick}
          sx={{
            border: 0,
            "& .MuiDataGrid-row:hover": {
              cursor: "pointer",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
              maxWidth: 150,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ManageUsers;
