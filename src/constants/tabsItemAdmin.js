import { Admin, Group } from "@styled-icons/remix-line";
import { Language } from "@styled-icons/ionicons-sharp";
import { CategoryAlt } from "@styled-icons/boxicons-regular";

const tabsItemAdmin = [
  {
    id: 1,
    title: "Dashboard",
    icon: <Group width={24} />,
    url: "/dashboard",
  },
  {
    id: 2,
    title: "Users",
    icon: <Group width={24} />,
    url: "/users",
  },
  {
    id: 3,
    title: "Staffs",
    icon: <Admin width={24} />,
    url: "/staffs",
  },
  {
    id: 4,
    title: "Categories",
    icon: <CategoryAlt width={24} />,
    url: "/categories",
  },
  {
    id: 5,
    title: "Languages",
    icon: <Language width={24} />,
    url: "/languages",
  },
];

export default tabsItemAdmin;
