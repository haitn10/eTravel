import { Box, Typography, alpha } from "@mui/material";
import moment from "moment";
import { theme } from "../../styles/theme";

const transactions = [
  {
    field: "id",
    headerName: "TransID",
    headerAlign: "center",
    align: "center",
    width: 100,
  },
  {
    field: "bookingId",
    headerName: "BookingID",
    headerAlign: "center",
    align: "center",
    width: 100,
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    flex: 1,
  },
  {
    field: "paymentMethod",
    headerName: "Payment Method",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "amount",
    headerName: "Amount",
    headerAlign: "center",
    align: "center",
    flex: 1,
    renderCell: (params) => {
      return (
        "$" +
        params.row.amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      );
    },
  },

  {
    field: "createTime",
    headerName: "Payment Time",
    headerAlign: "right",
    align: "right",
    flex: 1,
    renderCell: (params) => {
      return moment(params.row.createTime).format("lll");
    },
  },
  {
    field: "status",
    headerName: "Status",
    headerAlign: "center",
    align: "center",
    width: 150,
    renderCell: (params) => {
      let color = theme.palette.text.primary;
      if (params.row.status === 0) {
        color = theme.palette.text.active;
      } else if (params.row.status === 1) {
        color = theme.palette.text.onStatus;
      } else if (params.row.status === 2) {
        color = theme.palette.text.checked;
      }

      return (
        <Box
          border={1}
          borderRadius={20}
          minWidth={100}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderColor={alpha(color, 0.1)}
          bgcolor={alpha(color, 0.1)}
        >
          <Typography variant="span" fontWeight="medium" color={color}>
            {params.row.statusType}
          </Typography>
        </Box>
      );
    },
  },
];
export default transactions;
