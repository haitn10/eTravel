import { Home, Directions, Import } from "@styled-icons/boxicons-regular";
import {
  Location,
  LocationAdd,
  CollectionsAdd,
} from "@styled-icons/fluentui-system-regular";
import { ListUl, FileEarmarkText } from "@styled-icons/bootstrap";
import { SignOut } from "@styled-icons/octicons";
import { Settings2Outline } from "@styled-icons/evaicons-outline";
import { ErrorOutline } from "@styled-icons/material";

const tabItems = [
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
    url: "/tours",
    options: [
      {
        subTitle: "List Tours",
        subIcon: <ListUl width={24} />,
        subUrl: "/",
      },
      {
        subTitle: "Create Tour",
        subIcon: <CollectionsAdd width={24} />,
        subUrl: "/create",
      },
    ],
  },
  {
    id: 3,
    title: "Places",
    icon: <Location width={24} />,
    url: "/places",
    options: [
      {
        subTitle: "List Places",
        subIcon: <ListUl width={24} />,
        subUrl: "/",
      },
      {
        subTitle: "Create Place",
        subIcon: <LocationAdd width={24} />,
        subUrl: "/add",
      },
      {
        subTitle: "Import File",
        subIcon: <Import width={24} />,
        subUrl: "/import",
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
  // {
  //   id: 6,
  //   title: "Help & Information",
  //   icon: <ErrorOutline width={24} />,
  //   url: "",
  //   options: [],
  // },
  // {
  //   id: 7,
  //   title: "Log out",
  //   icon: <SignOut height={24} />,
  //   url: "",
  //   options: [],
  // },
];

export default tabItems;
