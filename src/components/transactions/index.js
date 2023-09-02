import { Box, Typography, alpha, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SearchInput from "../common/toolsupports/SearchInput";
import FilterData from "../common/toolsupports/FilterData";
import moment from "moment";
import { createFakeServer } from "@mui/x-data-grid-generator";

const columns = [
  {
    field: "id",
    headerName: "TransID",
    align: "center",
    headerAlign: "center",
    sortable: false,
    width: 100,
  },
  {
    field: "name",
    headerName: "Customer name",
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    flex: 1,
    sortable: false,
  },
  {
    field: "paymentDate",
    headerName: "Payment Date",
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <Typography variant="p" fontWeight="medium">
        {moment(params.row.paymentDate).format("MMMM D, YYYY")}
      </Typography>
    ),
  },
  {
    field: "lastName",
    headerName: "Payment Method",
    width: 200,
    sortable: false,
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    width: 150,
    sortable: false,
  },
  {
    field: "status",
    headerName: "Status",
    description: "This column has a value getter and is not sortable.",
    width: 150,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Box
        height={30}
        width={100}
        justifyContent="center"
        alignItems="center"
        display="flex"
        borderRadius={20}
        color={params.row.status === true ? "#4F7942" : "#C40234"}
        bgcolor={alpha(params.row.status === true ? "#4F7942" : "#C40234", 0.1)}
      >
        <Typography variant="p" fontWeight="medium">
          {params.row.status === true ? "Success" : " Failed"}
        </Typography>
      </Box>
    ),
    sortable: false,
  },
];

const SERVER_OPTIONS = {
  useCursorPagination: false,
};

const { useQuery, ...data } = createFakeServer({}, SERVER_OPTIONS);

const TransactionsPage = () => {
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
    navigate("/transactions/details", { data: params.row });
  };

  return (
    <Box
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
            Manage Transactions
          </Typography>
          <Typography
            color={theme.palette.text.third}
            fontWeight="regular"
            fontSize={18}
          >
            Manage all them completed transactions.
          </Typography>
        </Box>

        {/* Search Box*/}
        <Box display="flex" alignItems="center" gap={1}>
          <SearchInput />
          <FilterData />
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

export default TransactionsPage;
