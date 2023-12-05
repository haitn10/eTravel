import { Box, Typography, alpha } from "@mui/material";
import { theme } from "../../styles/theme";
import dayjs from "dayjs";

const beacons = [
  {
    field: "name",
    headerName: "Beacon Name",
    sortable: false,
    flex: 1.5,
  },
  {
    field: "beaconId",
    headerName: "Beacon ID",
    sortable: false,
    flex: 1,
  },
  {
    field: "image",
    headerName: "Beacon Image",
    flex: 1,
    headerAlign: "center",
    align: "center",
    sortable: false,
    renderCell: (params) => (
      <img
        src={params.row.image}
        alt={`${params.row.name}`}
        style={{
          width: 100,
          height: 70,
          border: `2px solid ${theme.palette.background.third}`,
        }}
      />
    ),
  },

  {
    field: "languages",
    headerName: "Num of Languages",
    sortable: false,
    headerAlign: "center",
    align: "center",
    flex: 1,
    renderCell: (params) => params.row.itemDescriptions.length,
  },

  {
    field: "createTime",
    headerName: "Create Time",
    sortable: false,
    headerAlign: "right",
    align: "right",
    flex: 0.75,
    renderCell: (params) => dayjs(params.row.createTime).format("ll"),
  },
  {
    field: "status",
    headerName: "Status",
    sortable: false,
    headerAlign: "center",
    align: "center",
    width: 100,
    renderCell: (params) => {
      let color = theme.palette.text.active;
      if (params.row.status === 0) {
        color = theme.palette.text.active;
      } else if (params.row.status === 1) {
        color = theme.palette.text.onStatus;
      }

      return (
        <Box
          border={1}
          borderRadius={20}
          paddingX={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderColor={alpha(color, 0.1)}
          bgcolor={alpha(color, 0.1)}
        >
          <Typography
            variant="span"
            fontWeight="medium"
            color={color}
            textTransform="capitalize"
          >
            {params.row.statusType}
          </Typography>
        </Box>
      );
    },
  },
];
export default beacons;
