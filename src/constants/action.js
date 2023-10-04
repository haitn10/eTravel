import Action from "../components/common/Action";

const action = [
  {
    field: "action",
    headerName: "Actions",
    width: 120,
    align: "center",
    headerAlign: "center",
    sortable: false,
    renderCell: (params) => {
      return <Action id={params.row.id} accountStatus={params.row.status} />;
    },
  },
];

export default action;
