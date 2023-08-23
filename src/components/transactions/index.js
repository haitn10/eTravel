import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const columns = [
  { field: "id", headerName: "TransID", width: 90 },
  {
    field: "firstName",
    headerName: "Customer name",
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    width: 200,
  },
  {
    field: "date",
    headerName: "Payment Date",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Payment Method",
    width: 150,
  },
  {
    field: "age",
    headerName: "Amount",
    type: "number",
    width: 110,
  },
  {
    field: "status",
    headerName: "Status",
    description: "This column has a value getter and is not sortable.",
    width: 160,
  },{
    field: "action",
    headerName: "Action",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    showcolumn: true,
    width: 160,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const TransactionsPage = () => {
  const theme = useTheme();
  return (
    <Box
      margin="1.25em"
      padding={2}
      bgcolor={theme.palette.background.primary}
      borderRadius={5}
    >
      {/* Title */}
      <Box padding={1} marginLeft={2}>
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

      {/* Data Table */}
      <Box paddingX={2} marginTop={3}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          style={{ border: 0 }}
          pageSizeOptions={[10]}
        />
      </Box>
    </Box>
  );
};

export default TransactionsPage;
