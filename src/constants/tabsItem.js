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
    icon: <Home width={24} />,
    url: "/dashboard",
    options: [],
  },
  {
    id: 2,
    title: "Itinerary",
    icon: <Directions width={24} />,
    url: "/itineraries",
    options: [
      {
        subTitle: "Itinerary List",
        subIcon: <ListUl width={20} />,
        subUrl: "/itineraries",
      },
      {
        subTitle: "Create Itinerary",
        subIcon: <CollectionsAdd width={20} />,
        subUrl: "/itineraries/create",
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
    icon: <FileEarmarkText height={24} />,
    url: "/bookings",
    options: [],
  },
  {
    id: 5,
    title: "Transactions",
    icon: <ExchangeDollar height={24} />,
    url: "/transactions",
    options: [],
  },
  {
    id: 6,
    title: "Feedbacks",
    icon: <ChatLeftText width={22} />,
    url: "/feedbacks",
    options: [],
  },
  {
    id: 7,
    title: "Settings",
    icon: <Settings2Outline width={24} />,
    url: "/settings",
    options: [],
  },
];

export default tabsItem;
