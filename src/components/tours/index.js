import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import SearchInput from "../common/toolsupports/SearchInput";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { createFakeServer } from "@mui/x-data-grid-generator";

const SERVER_OPTIONS = {
  useCursorPagination: false,
};

const { useQuery, ...data } = createFakeServer({}, SERVER_OPTIONS);

const ManageTours = () => {
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
    navigate("/tours/details", { data: params.row });
  };
  return (
    <Box
      minHeight="95vh"
      margin="1.25em"
      padding={2}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
    >
      {/* Title */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={1}
        marginX={2}
      >
        <Box>
          <Typography
            color={theme.palette.text.active}
            fontWeight="bold"
            fontSize={36}
          >
            Manage Tours
          </Typography>
          <Typography
            color={theme.palette.text.third}
            fontWeight="regular"
            fontSize={18}
          >
            Manage all them existing tours or update tours.
          </Typography>
        </Box>

        {/* Search Box*/}
        <Box display="flex" alignItems="center" gap={1}>
          <SearchInput />
        </Box>
      </Box>

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

export default ManageTours;
