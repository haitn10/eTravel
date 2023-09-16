import { Admin, Group } from "@styled-icons/remix-line";
import { Language } from "@styled-icons/ionicons-sharp";
import { CategoryAlt } from "@styled-icons/boxicons-regular";

const tabsItemAdmin = [
  {
    id: 1,
    title: "Users",
    icon: <Group width={24} />,
    url: "/users",
  },
  {
    id: 1,
    title: "Staffs",
    icon: <Admin width={24} />,
    url: "/staffs",
  },
  {
    id: 1,
    title: "Categories",
    icon: <CategoryAlt width={24} />,
    url: "/categories",
  },
  {
    id: 1,
    title: "Languages",
    icon: <Language width={24} />,
    url: "/languages",
  },
];

export default tabsItemAdmin;
