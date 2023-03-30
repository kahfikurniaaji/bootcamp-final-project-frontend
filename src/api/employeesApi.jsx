import api from "./api";

export const employeesUrlEndpoint = "/employees";

export const postEmployee = async ({
  full_name,
  gender,
  phone,
  email,
  address,
  username,
  password,
  job_id,
}) => {
  const response = await api
    .post(employeesUrlEndpoint, {
      full_name,
      gender,
      phone,
      email,
      address,
      username,
      password,
      job_id,
      birth_date: "2000-01-01",
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => error);

  return response;
};

export const putEmployee = async ({
  id,
  full_name,
  gender,
  phone,
  email,
  address,
  username,
  job_id,
}) => {
  const response = await api
    .put(employeesUrlEndpoint + `/${id}`, {
      full_name,
      gender,
      phone,
      email,
      address,
      username,
      job_id,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
  return response;
};

export const getEmployeeAttendancesNow = async ({ employeeId }) => {
  const response = await api
    .get(employeesUrlEndpoint + `/${employeeId}/attendances/now`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
  return response;
};

export const deleteEmployee = async (employeeId) => {
  const response = await api
    .delete(employeesUrlEndpoint + `/${employeeId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
  return response;
};

export const getEmployeeById = async (employeeId) => {
  const response = await api
    .get(employeesUrlEndpoint + `/${employeeId}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => console.log(error));
  return response;
};

export const getEmployees = async () => {
  const response = await api
    .get(employeesUrlEndpoint)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => console.log(error));
  return response;
};

export const getAllAttendancesByEmployeeId = async ({ employee_id }) => {
  const response = await api
    .get(`${employeesUrlEndpoint}/${employee_id}/attendances`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
  console.log(response);
  return response;
};
