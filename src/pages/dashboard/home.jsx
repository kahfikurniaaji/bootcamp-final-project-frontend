import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { StatisticsCard } from "@/widgets/cards";
import { Button } from "@material-tailwind/react";
import {
  checkInAttendances,
  checkOutAttendances,
  getAttendancesById,
} from "@/api/attendancesApi";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import useSWR from "swr";
import { useID } from "@/context";
import { Alert } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import {
  getEmployeeAttendancesNow,
  employeesUrlEndpoint,
} from "@/api/employeesApi";

export function Home() {
  const { id, role } = useID();

  const { data, error, isLoading } = useSWR(
    employeesUrlEndpoint + `/${id}/attendances/now`,
    () => getEmployeeAttendancesNow({ employeeId: id })
  );

  const [attendance, setAttendance] = useState({});

  const [timeCheckIn, setTimeCheckIn] = useState("");

  const [timeCheckOut, setTimeCheckOut] = useState("");

  if (data) {
    if (Object.keys(attendance).length === 0) {
      setAttendance({
        ...data.data,
        check_in: data.data.check_in.slice(0, 5) || "-",
        check_out: data.data.check_out?.slice(0, 5) || "-",
      });
    }
  }

  const [showAlert, setShowAlert] = useState(false);

  const handleCheckIn = async () => {
    const data = {
      status: "Hadir",
      shift: "Pagi",
      notes_check_in: "",
    };
    const response = await checkInAttendances({
      employee_id: id,
      status: data.status,
      shift: data.shift,
      notes_check_in: data.notes_check_in,
    });
    setShowAlert(true);
    setInterval(() => {
      setShowAlert(false);
    }, 5000);
    setTimeCheckIn(response.data.check_in.slice(0, 5));
  };

  const handleCheckOut = async () => {
    await checkOutAttendances(attendance.id).then((result) => {
      setTimeCheckOut(result?.check_out?.slice(0, 5));
    });
  };

  useEffect(() => {
    setTimeCheckIn(attendance.check_in);
    setTimeCheckOut(attendance.check_out);
  }, [attendance]);

  return (
    <div className="mt-12">
      <Alert
        show={showAlert}
        color="green"
        className="max-w-screen-md"
        icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
      >
        <Typography variant="h5" color="white">
          Success
        </Typography>
        <Typography color="white" className="mt-2 font-normal">
          Berhasil melakukan absensi
        </Typography>
      </Alert>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:mx-auto xl:max-w-2xl">
        <StatisticsCard
          color="green"
          value={timeCheckIn || "-"}
          title={"Check In"}
          icon={React.createElement(ArrowRightOnRectangleIcon, {
            className: "w-6 h-6 text-white",
          })}
          footer={
            <Button
              disabled={!timeCheckIn ? false : true}
              className="font-bold text-white"
              onClick={handleCheckIn}
            >
              Check In
            </Button>
          }
        />
        <StatisticsCard
          color="pink"
          value={timeCheckOut || "-"}
          title={"Check Out"}
          icon={React.createElement(ArrowLeftOnRectangleIcon, {
            className: "w-6 h-6 text-white",
          })}
          footer={
            <Button
              disabled={!timeCheckOut && timeCheckIn ? false : true}
              className="font-bold text-white"
              onClick={handleCheckOut}
            >
              Check Out
            </Button>
          }
        />
      </div>
      {/* <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3"></div> */}
    </div>
  );
}

export default Home;
