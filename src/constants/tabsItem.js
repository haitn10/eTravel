import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AirlineStopsRoundedIcon from "@mui/icons-material/AirlineStopsRounded";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
const tabItems = [
  {
    id: 1,
    title: "Home",
    icon: <HomeRoundedIcon />,
    url: "/home",
    options: [],
  },
  {
    id: 2,
    title: "Tours",
    icon: <AirlineStopsRoundedIcon />,
    url: "/tours",
    options: [
      {
        subTitle: "List Tours",
        subIcon: <FormatListBulletedRoundedIcon />,
        subUrl: "/",
      },
      {
        subTitle: "Create Tour",
        subIcon: "",
        subUrl: "/create",
      },
    ],
  },
  {
    id: 3,
    title: "Places",
    icon: <PlaceOutlinedIcon />,
    url: "/places",
    options: [
      {
        subTitle: "List Places",
        subIcon: <FormatListBulletedRoundedIcon />,
        subUrl: "/",
      },
      {
        subTitle: "Create Place",
        subIcon: "",
        subUrl: "/add",
      },
      {
        subTitle: "Import File",
        subIcon: "",
        subUrl: "/import",
      },
    ],
  },
  {
    id: 4,
    title: "Transactions",
    icon: <RequestQuoteOutlinedIcon />,
    url: "/transactions",
    options: [],
  },
  {
    id: 5,
    title: "Settings",
    icon: <SettingsOutlinedIcon />,
    url: "/settings",
    options: [],
  },
  {
    id: 6,
    title: "Help & Information",
    icon: <ErrorOutlineOutlinedIcon />,
    url: "",
    options: [],
  },
  {
    id: 7,
    title: "Log out",
    icon: <LogoutRoundedIcon />,
    url: "",
    options: [],
  },
];

export default tabItems;
