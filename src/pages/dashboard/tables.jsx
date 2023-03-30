import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { useID } from "@/context";
import { useState } from "react";
import { useEffect } from "react";
import { getAllAttendancesByEmployeeId } from "@/api/employeesApi";

export function Tables() {
  const { id } = useID();
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    const getAttendances = async () => {
      const result = await getAllAttendancesByEmployeeId({ employee_id: id });
      setAttendances(result.data);
    };
    getAttendances();
  }, []);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Daftar Absensi
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["no", "tanggal", "time in", "time out"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attendances.map(({ date, check_in, check_out }, key) => {
                const className = `py-3 px-5 ${
                  key === attendances.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={key}>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {key + 1 || "-"}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {date}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-light-green-700">
                        {check_in ? check_in.slice(0, 5) : "-"}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-red-700">
                        {check_out ? check_out.slice(0, 5) : "-"}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;
