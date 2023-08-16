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
    options: [],
  },
  {
    id: 2,
    title: "Tours",
    icon: <AirlineStopsRoundedIcon />,
    options: [
      {
        subTitle: "List Tours",
        subIcon: <FormatListBulletedRoundedIcon />,
      },
      {
        subTitle: "Create Tour",
        subIcon: "",
      },
      {
        subTitle: "Import File",
        subIcon: "",
      },
    ],
  },
  {
    id: 3,
    title: "Places",
    icon: <PlaceOutlinedIcon />,
    options: [
      {
        subTitle: "List Places",
        subIcon: <FormatListBulletedRoundedIcon />,
      },
      {
        subTitle: "Create Place",
        subIcon: "",
      },
      {
        subTitle: "Import File",
        subIcon: "",
      },
    ],
  },
  {
    id: 4,
    title: "Transactions",
    icon: <RequestQuoteOutlinedIcon />,
    options: [],
  },
  {
    id: 5,
    title: "Settings",
    icon: <SettingsOutlinedIcon />,
    options: [],
  },
  {
    id: 6,
    title: "Help & Information",
    icon: <ErrorOutlineOutlinedIcon />,
    options: [],
  },
  {
    id: 7,
    title: "Log out",
    icon: <LogoutRoundedIcon />,
    options: [],
  },
];

export default tabItems;
