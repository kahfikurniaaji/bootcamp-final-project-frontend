import { Card, CardBody, Avatar, Typography } from "@material-tailwind/react";
import { ProfileInfoCard } from "@/widgets/cards";
import {
  getEmployeeById,
  employeesUrlEndpoint as cacheKey,
} from "@/api/employeesApi";
import { useID } from "@/context";
import useSWR from "swr";

export function Profile() {
  const { id: userId } = useID();
  const { data: profile, isLoading } = useSWR(cacheKey + `/${userId}`, () =>
    getEmployeeById(userId)
  );

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (profile) {
    return (
      <>
        <Card className="mx-3 mb-6 lg:mx-4">
          <CardBody className="p-4">
            <div className="mb-10 flex items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <Avatar
                  src="/img/bruce-mars.jpeg"
                  alt="bruce-mars"
                  size="xl"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {profile.full_name}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    {profile.job_name}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2">
              <ProfileInfoCard
                className="mx-auto"
                title="Profile Information"
                details={{
                  nama: profile.full_name,
                  jabatan: profile.job_name,
                  "jenis kelamin": profile.gender,
                  "tanggal mulai bekerja": profile.hire_date,
                  alamat: profile.address,
                }}
              />
            </div>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default Profile;
