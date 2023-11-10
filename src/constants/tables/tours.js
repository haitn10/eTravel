import { Box, Typography, alpha } from "@mui/material";
import moment from "moment";
import { theme } from "../../styles/theme";

const tours = [
  {
    field: "id",
    headerName: "TourID",
    headerAlign: "center",
    width: 100,
    align: "center",
  },
  {
    field: "name",
    headerName: "Tour Name",
    width: 300,
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
    field: "createTime",
    headerName: "Create Time",
    headerAlign: "right",
    align: "right",
    width: 200,
    renderCell: (params) => {
      return moment(params.row.createTime).format("DD MMMM, YYYY");
    },
  },
  {
    field: "status",
    headerName: "Status",
    headerAlign: "center",
    align: "center",
    width: 120,
    renderCell: (params) => {
      if (params.row.status === 1) {
        return (
          <Box
            border={1}
            borderRadius={20}
            width={80}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderColor={alpha(theme.palette.text.onStatus, 0.1)}
            bgcolor={alpha(theme.palette.text.onStatus, 0.1)}
          >
            <Typography
              variant="span"
              fontWeight="medium"
              color={theme.palette.text.onStatus}
            >
              Active
            </Typography>
          </Box>
        );
      } else {
        return (
          <Box
            border={1}
            borderRadius={20}
            width={80}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderColor={alpha(theme.palette.text.active, 0.1)}
            bgcolor={alpha(theme.palette.text.active, 0.1)}
          >
            <Typography
              variant="span"
              fontWeight="medium"
              color={theme.palette.text.active}
            >
              Inactive
            </Typography>
          </Box>
        );
      }
    },
  },
];
export default tours;
