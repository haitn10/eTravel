import Action from "../components/common/Action";

const action = [
  {
    field: "action",
    headerName: "Actions",
    flex: 1,
    maxWidth: 200,
    align: "center",
    headerAlign: "center",
    sortable: false,
    renderCell: (params) => {
      return <Action id={params.row.id} />;
    },
  },
];

export default action;
