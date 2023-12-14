import { theme } from "../../styles/theme";
import dayjs from "dayjs";

const beacons = [
  {
    field: "name",
    headerName: "Position Name",
    sortable: false,
    flex: 1,
  },
  {
    field: "beaconId",
    headerName: "Beacon ID",
    sortable: false,
    flex: 1.5,
  },
  {
    field: "image",
    headerName: "Image",
    flex: 0.5,
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
    field: "createTime",
    headerName: "Create Time",
    sortable: false,
    headerAlign: "right",
    align: "right",
    flex: 0.5,
    renderCell: (params) => dayjs(params.row.createTime).format("ll"),
  },
];
export default beacons;
