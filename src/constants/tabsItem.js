import { Home, Directions, Import } from "@styled-icons/boxicons-regular";
import {
  LocationAdd,
  CollectionsAdd,
} from "@styled-icons/fluentui-system-regular";
import { ListUl, FileEarmarkText, ChatLeftText } from "@styled-icons/bootstrap";
import { ExchangeDollar } from "@styled-icons/remix-line";
import { Settings2Outline } from "@styled-icons/evaicons-outline";
import { Location } from "@styled-icons/ionicons-outline";

const tabsItem = [
  {
    id: 1,
    title: "Dashboard",
    icon: <Home width={20} />,
    url: "/dashboard",
    options: [],
  },
  {
    id: 2,
    title: "Tours",
    icon: <Directions width={20} />,
    url: "/tours",
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
    icon: <Location width={20} />,
    url: "/places",
    options: [
      {
        subTitle: "List Places",
        subIcon: <ListUl width={20} />,
        subUrl: "/places",
      },
      {
        subTitle: "Add Place",
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
    title: "Bookings",
    icon: <FileEarmarkText height={20} />,
    url: "/bookings",
    options: [],
  },
  {
    id: 5,
    title: "Transactions",
    icon: <ExchangeDollar height={20} />,
    url: "/transactions",
    options: [],
  },
  {
    id: 6,
    title: "Feedbacks",
    icon: <ChatLeftText width={20} />,
    url: "/feedbacks",
    options: [],
  },
  {
    id: 7,
    title: "Settings",
    icon: <Settings2Outline width={20} />,
    url: "/settings",
    options: [],
  },
];

export default tabsItem;
