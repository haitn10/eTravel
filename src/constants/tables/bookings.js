import { Box, Typography, alpha } from "@mui/material";
import moment from "moment";
import { theme } from "../../styles/theme";

import { TimeFive } from "@styled-icons/boxicons-regular";

const bookings = [
  {
    field: "id",
    headerName: "BookingID",
    headerAlign: "center",
    width: 100,
    align: "center",
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    flex: 1,
  },
  {
    field: "totalPlace",
    headerName: "Total Places",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "total",
    headerName: "Total Prices",
    headerAlign: "center",
    align: "center",
    flex: 1,
    renderCell: (params) => {
      return (
        "$" +
        params.row.total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      );
    },
  },
  {
    field: "totalTime",
    headerName: "Total Times",
    headerAlign: "center",
    align: "center",
    flex: 1,
    renderCell: (params) => {
      return (
        <Box display="flex" alignItems="center" gap={1}>
          <TimeFive width={14} /> {params.row.totalTime.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}h
        </Box>
      );
    },
  },
  {
    field: "createTime",
    headerName: "Create Time",
    headerAlign: "right",
    align: "right",
    flex: 1,
    renderCell: (params) => {
      return moment(params.row.createTime).format("DD MMMM, YYYY");
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
        color = theme.palette.text.primary;
      } else if (params.row.status === 1) {
        color = theme.palette.text.pending;
      } else if (params.row.status === 2) {
        color = theme.palette.text.onStatus;
      } else if (params.row.status === 3) {
        color = theme.palette.text.active;
      } else if (params.row.status === 4) {
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
export default bookings;
