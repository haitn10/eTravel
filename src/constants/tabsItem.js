import { Home, Directions, Import } from "@styled-icons/boxicons-regular";
import {
  LocationAdd,
  CollectionsAdd,
} from "@styled-icons/fluentui-system-regular";
import { ListUl, FileEarmarkText } from "@styled-icons/bootstrap";
import { Settings2Outline } from "@styled-icons/evaicons-outline";
import { Location } from "@styled-icons/ionicons-outline";

const tabsItem = [
  {
    id: 1,
    title: "Home",
    icon: <Home width={24} />,
    url: "/home",
    options: [],
  },
  {
    id: 2,
    title: "Tours",
    icon: <Directions width={24} />,
    url: "",
    options: [
      {
        subTitle: "List Tours",
        subIcon: <ListUl width={20} />,
        subUrl: "/tours",
      },
      {
        subTitle: "Create Tour",
        subIcon: <CollectionsAdd width={20} />,
        subUrl: "/tours/create",
      },
    ],
  },
  {
    id: 3,
    title: "Places",
    icon: <Location width={24} />,
    url: "",
    options: [
      {
        subTitle: "List Places",
        subIcon: <ListUl width={20} />,
        subUrl: "/places",
      },
      {
        subTitle: "Create Place",
        subIcon: <LocationAdd width={20} />,
        subUrl: "/places/add",
      },
      {
        subTitle: "Import File",
        subIcon: <Import width={20} />,
        subUrl: "/places/import",
      },
    ],
  },
  {
    id: 4,
    title: "Transactions",
    icon: <FileEarmarkText height={24} />,
    url: "/transactions",
    options: [],
  },
  {
    id: 5,
    title: "Settings",
    icon: <Settings2Outline width={24} />,
    url: "/settings",
    options: [],
  },
];

export default tabsItem;
