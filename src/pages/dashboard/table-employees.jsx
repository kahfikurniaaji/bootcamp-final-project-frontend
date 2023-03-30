import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  DialogHeader,
  DialogBody,
  Option,
  DialogFooter,
} from "@material-tailwind/react";
import { useID } from "@/context";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Button } from "@material-tailwind/react";
import _ from "lodash";
import {
  employeesUrlEndpoint as cacheKey,
  getEmployees,
  putEmployee,
  postEmployee,
  deleteEmployee,
} from "@/api/employeesApi";

import { getJobs } from "@/api/jobsApi";
import { Dialog } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { Select } from "@material-tailwind/react";
import { Radio } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";

export function TableEmployees() {
  const { id: userId } = useID();
  const initFormData = {
    id: "",
    full_name: "",
    role: "",
    job_id: "",
    job_name: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    username: "",
    password: "",
    confirm_password: "",
  };
  const [employees, setEmployees] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState(initFormData);
  const [detailProfile, setDetailProfile] = useState({});
  const [passwordError, setPasswordError] = useState(false);

  const [open, setOpen] = useState({
    add: false,
    detail: false,
    edit: false,
    delete: false,
  });

  const { data: responseEmployees } = useSWR(cacheKey, getEmployees);
  const { data: responseJobs } = useSWR("/jobs", getJobs);

  if (responseEmployees) {
    console.log("=====response====");
    console.log(responseEmployees);
    console.log(employees);
    console.log("=====response====");
    if (!_.isEqual(responseEmployees, employees)) {
      setEmployees([...responseEmployees]);
    }
    // if (responseEmployees && !employees.length) {
    //   setEmployees([...responseEmployees]);
    // }
  }

  if (responseJobs && !jobs.length) {
    setJobs([...responseJobs.data]);
  }

  const handleOpen = (action) => {
    if (action == "add") {
      setOpen({ ...open, add: !open.add });
    }
    if (action == "detail") {
      setOpen({ ...open, detail: !open.detail });
    }
    if (action == "edit") {
      setOpen({ ...open, edit: !open.edit });
    }
    if (action == "delete") {
      setOpen({ ...open, delete: !open.delete });
    }
  };

  const handleButton = (action, employeeId = undefined) => {
    if (action == "add") {
      handleOpen("add");
    }
    if (action == "detail") {
      const employee = employees.find((e) => e.id === employeeId);
      setDetailProfile(employee);
      handleOpen("detail");
    }
    if (action == "edit") {
      const employee = employees.find((e) => e.id === employeeId);
      const foundJob = jobs.find((job) => job.job_name === employee.job_name);
      const jobId = foundJob ? foundJob.id : null;
      setFormData({ ...employee, job_id: jobId });
      handleOpen("edit");
    }
    if (action == "delete") {
      const employee = employees.find((e) => e.id === employeeId);
      setFormData({ ...employee });
      handleOpen("delete");
    }
  };

  const handleSubmit = async (e, action) => {
    e.preventDefault();
    if (action == "add") {
      if (formData.password !== formData.confirm_password) {
        setPasswordError(true);
        return;
      }
      await postEmployee({ ...formData }).then((response) => {
        const updatedData = employees.map((employee) => {
          if (response.data.id == employee.id) {
            return response.data;
          }
          return employee;
        });
        mutate(cacheKey, updatedData);
      });
      setFormData(initFormData);
      handleOpen("add");
    }
    if (action == "edit") {
      await putEmployee({ ...formData }).then((response) => {
        const updatedData = employees.map((employee) => {
          if (response.data.id == employee.id) {
            return response.data;
          }
          return employee;
        });
        mutate(cacheKey, updatedData);
      });
      setFormData(initFormData);
      handleOpen("edit");
    }
    if (action == "delete") {
      console.log("click delete");
      await deleteEmployee(formData.id).then((response) => {
        const updatedData = employees.filter(
          (value) => value.id !== response.data.id
        );
        mutate(cacheKey, updatedData);
      });
      setFormData(initFormData);
      handleOpen("delete");
    }
  };

  const handleChange = (e) => {
    if (e.target.name == "password" || e.target.name == "confirm_password") {
      setPasswordError(false);
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <div className="flex">
            <Typography className="flex-auto" variant="h6" color="white">
              Daftar Pegawai
            </Typography>
            <Button
              onClick={() => handleButton("add")}
              className="block rounded-lg bg-green-500 px-4 py-2 hover:bg-green-700"
            >
              <Typography className="text-xs font-semibold text-gray-100">
                Tambah Pegawai
              </Typography>
            </Button>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["no", "nama", "jabatan", "action"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="flex justify-center text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.map(({ id, full_name, job_name }, key) => {
                const className = `py-3 px-5 hover:bg-blue;gray-500 ${
                  key === employees.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={key}>
                    <td className={className}>
                      <Typography className="mx-auto text-center text-xs font-semibold text-blue-gray-600">
                        {key + 1 || "-"}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {full_name}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {job_name}
                      </Typography>
                    </td>
                    <td className={className}>
                      <div className="flex justify-center gap-x-4">
                        <div className="gap-x-4">
                          <Button onClick={() => handleButton("detail", id)}>
                            Detail
                          </Button>
                        </div>
                        <div>
                          <Button
                            onClick={() => handleButton("edit", id)}
                            className="bg-yellow-600 text-gray-100"
                          >
                            Edit
                          </Button>
                        </div>
                        <div>
                          <Button
                            className="bg-red-600"
                            onClick={() => handleButton("delete", id)}
                            disabled={id == userId ? true : false}
                          >
                            <Typography className="text-xs font-semibold text-gray-100">
                              Delete
                            </Typography>
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Dialog
        open={open.detail}
        handler={() => handleOpen("detail")}
        size={"xl"}
      >
        <DialogHeader>Profile Pegawai</DialogHeader>
        <DialogBody divider>
          <table className="table-auto">
            <tbody>
              <tr>
                <td>Nama Lengkap</td>
                <td> : </td>
                <td>{detailProfile.full_name}</td>
              </tr>
              <tr>
                <td>Role</td>
                <td> : </td>
                <td>{detailProfile.role}</td>
              </tr>
              <tr>
                <td>Jabatan</td>
                <td> : </td>
                <td>{detailProfile.job_name}</td>
              </tr>
              <tr>
                <td>Jenis Kelamin</td>
                <td> : </td>
                <td>{detailProfile.gender}</td>
              </tr>
              <tr>
                <td>Tanggal Lahir</td>
                <td> : </td>
                <td>{detailProfile.birth_date}</td>
              </tr>
              <tr>
                <td>Alamat</td>
                <td> : </td>
                <td>{detailProfile.address}</td>
              </tr>
            </tbody>
          </table>
        </DialogBody>
      </Dialog>
      <Dialog
        className="max-h-screen overflow-auto"
        open={open.edit}
        handler={() => handleOpen("edit")}
        on
        size={"xl"}
      >
        <DialogHeader>Edit Profile Pegawai</DialogHeader>
        <DialogBody divider>
          <div className="mx-auto">
            <form onSubmit={(e) => handleSubmit(e, "edit")}>
              <div className="my-6 w-96">
                <Input
                  type="text"
                  name="full_name"
                  label="Name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="my-6 w-96">
                <Input
                  type="text"
                  name="username"
                  label="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="my-6 w-96">
                <Input
                  type="email"
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="my-6 w-96">
                <Input
                  type="tel"
                  name="phone"
                  label="Nomor Hp"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="my-6 w-96">
                <Select
                  label="Jabatan"
                  name="job_id"
                  onChange={(e) => setFormData({ ...formData, job_id: e })}
                  value={formData.job_id}
                  required
                >
                  {jobs.map((job) => {
                    return (
                      <Option key={job.id} value={job.id}>
                        {job.job_name}
                      </Option>
                    );
                  })}
                </Select>
              </div>
              <div className="my-6 flex gap-10">
                <Radio
                  id="Laki-laki"
                  label="Laki-laki"
                  name="gender"
                  value="Laki-laki"
                  checked={formData.gender === "Laki-laki"}
                  onChange={handleChange}
                />
                <Radio
                  id="Perempuan"
                  label="Perempuan"
                  name="gender"
                  value="Perempuan"
                  checked={formData.gender === "Perempuan"}
                  onChange={handleChange}
                />
              </div>
              <div className="my-6 w-96">
                <Textarea
                  label="Alamat"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </DialogBody>
      </Dialog>

      {/* ========== ADD ========== */}
      <Dialog
        className="max-h-screen overflow-auto"
        open={open.add}
        handler={() => handleOpen("add")}
        size={"xl"}
      >
        <DialogHeader>Tambah Profile Pegawai</DialogHeader>
        <DialogBody divider>
          <div className="mx-auto">
            <form onSubmit={(e) => handleSubmit(e, "add")}>
              <div className="my-6 w-96">
                <Input
                  type="text"
                  name="full_name"
                  label="Name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="my-6 w-96">
                <Input
                  type="text"
                  name="username"
                  label="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="my-6 w-96">
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="my-6 w-96">
                <Input
                  type="password"
                  name="confirm_password"
                  label="Confirm Password"
                  error={passwordError}
                  value={formData.confirm_password}
                  onChange={handleChange}
                  required
                />
              </div>
              {passwordError && (
                <span className="text-red-500">Passwords do not match</span>
              )}
              <div className="my-6 w-96">
                <Input
                  type="email"
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="my-6 w-96">
                <Input
                  type="tel"
                  name="phone"
                  label="Nomor Hp"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="my-6 w-96">
                <Select
                  label="Jabatan"
                  name="job_id"
                  value={formData.job_id}
                  onChange={(e) => setFormData({ ...formData, job_id: e })}
                  required
                >
                  {jobs.map((job) => {
                    return (
                      <Option key={job.id} value={job.id}>
                        {job.job_name}
                      </Option>
                    );
                  })}
                </Select>
              </div>
              <div className="my-6 flex gap-10">
                <Radio
                  id="Laki-laki"
                  label="Laki-laki"
                  name="gender"
                  value="Laki-laki"
                  checked={formData.gender === "Laki-laki"}
                  onChange={handleChange}
                />
                <Radio
                  id="Perempuan"
                  label="Perempuan"
                  name="gender"
                  value="Perempuan"
                  checked={formData.gender === "Perempuan"}
                  onChange={handleChange}
                />
              </div>
              <div className="my-6 w-96">
                <Textarea
                  label="Alamat"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </DialogBody>
      </Dialog>

      {/* ========== DELETE ========== */}
      <Dialog
        open={open.delete}
        size={"md"}
        handler={() => handleOpen("delete")}
      >
        <DialogHeader className="justify-center text-center">
          <span className="block text-4xl">Warning</span>
        </DialogHeader>
        <form onSubmit={(e) => handleSubmit(e, "delete")}>
          <DialogBody divider className="justify-center text-center text-4xl">
            <input type="text" name="id" value={formData.id} hidden />
            <span className="block">Yakin ingin menghapus nama ?</span>
          </DialogBody>
          <DialogFooter className="justify-evenly">
            <Button
              variant="gradient"
              color="red"
              onClick={() => handleOpen("delete")}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button type="submit" variant="gradient" color="green">
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}

export default TableEmployees;
