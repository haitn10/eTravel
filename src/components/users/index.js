import { Box, useTheme } from "@mui/material";
import React from "react";
import Header from "../common/Header";
import { DataGrid } from "@mui/x-data-grid";
import { createFakeServer } from "@mui/x-data-grid-generator";
import { useNavigate } from "react-router";

const SERVER_OPTIONS = {
  useCursorPagination: false,
};

const { useQuery, ...data } = createFakeServer({}, SERVER_OPTIONS);

const ManageUsers = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  const { isLoading, rows, pageInfo } = useQuery(paginationModel);
  const [rowCountState, setRowCountState] = React.useState(
    pageInfo?.totalRowCount || 0
  );
  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      pageInfo?.totalRowCount !== undefined
        ? pageInfo?.totalRowCount
        : prevRowCountState
    );
  }, [pageInfo?.totalRowCount, setRowCountState]);

  const handleRowClick = (params) => {
    navigate("/users/details", { data: params.row });
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
        showTool={false}
      />

      {/* Data Table */}
      <Box height={rows ? "" : 400} paddingX={2} marginTop={3} width="100%">
        <DataGrid
          rows={rows}
          {...data}
          rowCount={rowCountState}
          loading={isLoading}
          pageSizeOptions={[5]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          disableColumnMenu
          onRowClick={handleRowClick}
          sx={{
            border: 0,
            "& .MuiDataGrid-row:hover": {
              cursor: "pointer",
            },
            ".MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ManageUsers;
