import Action from "../../components/common/Action";

const checkUrl = window.location.pathname.slice(1);

const action = [
  {
    field: "action",
    headerName: "Actions",
    width: 120,
    align: "center",
    headerAlign: "center",
    sortable: false,
    renderCell: (params) => {
      if (checkUrl === "users" || checkUrl === "staffs") {
        return (
          <Action
            id={params.row.id}
            accountStatus={params.row.status}
            api="portal/users"
          />
        );
      } else if (checkUrl === "categories") {
        return (
          <Action
            id={params.row.id}
            accountStatus={params.row.status}
            api="portal/categories/changestatus"
          />
        );
      } else if (checkUrl === "languages") {
        return (
          <Action
            id={params.row.id}
            accountStatus={params.row.status}
            api="languages"
          />
        );
      }
    },
  },
];

export default action;
