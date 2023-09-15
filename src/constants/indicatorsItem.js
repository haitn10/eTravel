import { CardText, BarChartLine } from "@styled-icons/bootstrap";
import { Location } from "@styled-icons/fluentui-system-regular";

const indicators = [
  {
    id: 1,
    icon: <CardText width={24} />,
    title: "Order Bills",
  },
  {
    id: 2,
    icon: <Location width={24} />,
    title: "Places",
  },
  {
    id: 3,
    icon: <BarChartLine width={24} />,
    title: "Revenue",
  },
];

export default indicators;
