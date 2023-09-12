import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { faCoins, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const indicators = [
  {
    id: 1,
    icon: <FontAwesomeIcon icon={faRectangleList} />,
    title: "Order Bills",
  },
  {
    id: 2,
    icon: <FontAwesomeIcon icon={faLocationDot} />,
    title: "Places",
  },
  {
    id: 3,
    icon: <FontAwesomeIcon icon={faCoins} />,
    title: "Revenue",
  },
];

export default indicators;
