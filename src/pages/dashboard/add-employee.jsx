import { getJobs } from "@/api/jobsApi";
import {
  Button,
  Input,
  Select,
  Radio,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    gender: "",
    birth_date: null,
    phone: "",
    email: "",
    address: "",
    job_id: "",
    image: null,
  });
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getAllJobs = async () => {
      const result = await getJobs();
      setJobs(result.data);
    };
    getAllJobs();
    return () => {};
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: submit form data to backend
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.full_name]: e.target.value,
    });
  };

  const handleGenderChange = (e) => {
    setFormData({
      ...formData,
      gender: e.target.value,
    });
  };

  const handleJobChange = (e) => {
    setFormData({
      ...formData,
      job_id: e.target.value,
    });
  };

  const handleAddressChange = (e) => {
    setFormData({
      ...formData,
      address: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  return (
    <div className="mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="my-6 w-96">
          <Input
            type="text"
            name="name"
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
        <div
          className="relative mb-3 xl:w-96"
          data-te-datepicker-init
          data-te-input-wrapper-init
        >
          <input
            type="text"
            className="data-[te-input-state-active]:placeholder:opacity-100 dark:text-neutral-200 dark:placeholder:text-neutral-200 peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            placeholder="Select a date"
          />
          <label
            for="floatingInput"
            className="text-neutral-500 peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] dark:text-neutral-200 dark:peer-focus:text-neutral-200 pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] motion-reduce:transition-none"
          >
            Select a date
          </label>
        </div>
        <div className="my-6 w-96">
          <Select
            label="Jabatan"
            name="job_id"
            value={formData.job_id}
            required
          >
            {jobs.map((job) => {
              return (
                <Option onChange={handleJobChange} key={job.id} value={job.id}>
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
            onChange={handleGenderChange}
          />
          <Radio
            id="Perempuan"
            label="Perempuan"
            name="gender"
            value="Perempuan"
            checked={formData.gender === "Perempuan"}
            onChange={handleGenderChange}
          />
        </div>
        <div className="my-6 w-96">
          <Textarea
            label="Alamat"
            name="address"
            onChange={handleAddressChange}
            required
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddEmployee;
