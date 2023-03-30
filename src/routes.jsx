import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  CogIcon,
} from "@heroicons/react/24/solid";
import {
  Home,
  Profile,
  TableAttendances,
  TableEmployees,
  Tables,
} from "@/pages/dashboard";
import { TableLogs } from "./pages/dashboard/table-logs";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routesSuperadmin = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "riwayat absensi",
        path: "/history-attendance",
        element: <Tables />,
      },
    ],
  },
  {
    title: "admin pages",
    layout: "dashboard",
    pages: [
      {
        icon: <ClipboardDocumentCheckIcon {...icon} />,
        name: "daftar absensi",
        path: "/attendances",
        element: <TableAttendances />,
      },
    ],
  },
  {
    title: "superadmin pages",
    layout: "dashboard",
    pages: [
      {
        icon: <UserGroupIcon {...icon} />,
        name: "daftar pegawai",
        path: "/employees",
        element: <TableEmployees />,
      },
      {
        icon: <CogIcon {...icon} />,
        name: "app log",
        path: "/logs",
        element: <TableLogs />,
      },
    ],
  },
];

export const routesAdmin = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "riwayat absensi",
        path: "/history-attendance",
        element: <Tables />,
      },
    ],
  },
  {
    title: "admin pages",
    layout: "dashboard",
    pages: [
      {
        icon: <ClipboardDocumentCheckIcon {...icon} />,
        name: "daftar absensi",
        path: "/attendances",
        element: <TableAttendances />,
      },
    ],
  },
];

export const routesUser = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "riwayat absensi",
        path: "/history-attendance",
        element: <Tables />,
      },
    ],
  },
];

export default { routesSuperadmin, routesAdmin, routesUser };
