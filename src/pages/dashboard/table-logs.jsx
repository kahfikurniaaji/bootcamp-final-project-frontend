import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import useSWR, { mutate } from "swr";
import { getAllLogs, logsUrlEndpoint as cacheKey } from "@/api/logsApi";

export function TableLogs() {
  const { data: logs, isLoading } = useSWR(cacheKey, getAllLogs);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (logs) {
    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              App Log
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {[
                    "no",
                    "username",
                    "method",
                    "path",
                    "status code",
                    "waktu",
                  ].map((el) => (
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
                {logs.map(({ username, method, path, status, date }, key) => {
                  const className = `py-3 px-5 ${
                    key === logs.length - 1
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
                          {username}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {method}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {path}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {status}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {date.split("T")[0] +
                            ", " +
                            date.split("+")[0].split("T")[1]}
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
}

export default TableLogs;
