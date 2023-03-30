import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "green",
    icon: ChevronDoubleRightIcon,
    title: "Check In",
    footer: {
      color: "bg-green-500",
      value: "Check In",
      disabled: "false",
    },
  },
  {
    color: "pink",
    icon: ChevronDoubleLeftIcon,
    title: "Check Out",
    footer: {
      color: "bg-red-500",
      value: "Check Out",
      label: "than last month",
    },
  },
  // {
  //   color: "green",
  //   icon: UserPlusIcon,
  //   title: "New Clients",
  //   value: "3,462",
  //   footer: {
  //     color: "text-red-500",
  //     value: "-2%",
  //     label: "than yesterday",
  //   },
  // },
  // {
  //   color: "orange",
  //   icon: ChartBarIcon,
  //   title: "Sales",
  //   value: "$103,430",
  //   footer: {
  //     color: "text-green-500",
  //     value: "+5%",
  //     label: "than yesterday",
  //   },
  // },
];

export default statisticsCardsData;
