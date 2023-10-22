import { Box } from "@mui/material";

import { TimeFive } from "@styled-icons/boxicons-regular";

const subPlaces = [
  {
    field: "id",
    headerName: "PlaceID",
    headerAlign: "center",
    width: 80,
    align: "center",
    sortable: false,
  },
  {
    field: "name",
    headerName: "Place Name",
    flex: 1,
    sortable: false,
  },
  {
    field: "price",
    headerName: "Price",
    headerAlign: "center",
    align: "center",
    flex: 1,
    sortable: false,
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
    sortable: false,
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
];
export default subPlaces;
