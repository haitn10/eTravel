import { theme } from "../../styles/theme";
import dayjs from "dayjs";

const beacons = [
  {
    field: "name",
    headerName: "Location Name",
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
    headerName: "Image",
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
];
export default beacons;
