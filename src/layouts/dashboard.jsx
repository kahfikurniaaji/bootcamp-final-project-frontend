import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  useID,
} from "@/context";
import AddEmployee from "@/pages/dashboard/add-employee";
import { useState } from "react";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import route from "@/routes";

export function Dashboard() {
  const token = localStorage.getItem("accessToken");
  const user = jwtDecode(token)?.user;
  const { id, setId, role, setRole } = useID();
  const [userId, setUserId] = useState("");
  const [routes, setRoutes] = useState([]);

  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  useEffect(() => {
    if (!id || id != user.id) {
      setId(user.id);
    }
    if (!role || role != user.role) {
      setRole(user.role);
    }
    if (!routes.length) {
      if (user.role == "superadmin") {
        setRoutes([...route.routesSuperadmin]);
      } else if (user.role == "admin") {
        setRoutes(route.routesAdmin);
      } else {
        setRoutes(route.routesUser);
      }
    }

    return () => {};
  }, [localStorage.getItem("accessToken")]);

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
          <Route exact path={"/add-employee"} element={<AddEmployee />} />
        </Routes>
        {/* <div className="text-blue-gray-600">
          <Footer />
        </div> */}
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
