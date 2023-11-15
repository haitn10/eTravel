import { Box, Typography, alpha } from "@mui/material";
import moment from "moment";
import { theme } from "../../styles/theme";

import { TimeFive } from "@styled-icons/boxicons-regular";

const places = [
  {
    field: "id",
    headerName: "PlaceID",
    headerAlign: "center",
    width: 100,
    align: "center",
  },
  {
    field: "name",
    headerName: "Place Name",
    width: 300,
  },
  {
    field: "languageList",
    headerName: "Number of Languages",
    headerAlign: "center",
    align: "center",
    flex: 1,
    renderCell: (params) => params.row.languageList?.length,
  },
  {
    field: "price",
    headerName: "Price",
    headerAlign: "center",
    align: "center",
    flex: 1,
    renderCell: (params) => {
      return (
        "$" +
        params.row.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      );
    },
  },
  {
    field: "duration",
    headerName: "Duration",
    headerAlign: "center",
    align: "center",
    flex: 1,
    renderCell: (params) => {
      return (
        <Box display="flex" alignItems="center" gap={1}>
          <TimeFive width={14} />
          {params.row.duration
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          h
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
      let color = "";
      if (params.row.status === 0) {
        color = theme.palette.text.active;
      } else if (params.row.status === 1) {
        color = theme.palette.text.onStatus;
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
            {params.row.status === 1 ? "Active" : "Inactive"}
          </Typography>
        </Box>
      );
    },
  },
];
export default places;
