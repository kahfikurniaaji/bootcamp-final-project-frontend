import api from "./api";

export const attendancesUrlEndpoint = "/attendances";

export const checkInAttendances = async ({
  employee_id,
  status,
  shift,
  notes_check_in,
}) => {
  const response = await api
    .post(attendancesUrlEndpoint, {
      employee_id,
      status,
      shift,
      notes_check_in,
    })
    .then((response) => response.data);
  return response;
};

export const getAttendancesById = async ({ id }) => {
  const response = await api
    .get(`${attendancesUrlEndpoint}/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
  return response.data;
};

export const getAllAttendances = async () => {
  const response = await api
    .get(attendancesUrlEndpoint)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => console.log(error));
  return response;
};

export const checkOutAttendances = async (id) => {
  const response = await api
    .put(attendancesUrlEndpoint + `/${id}`, {
      notes_check_out: "",
    })
    .then((response) => {
      console.log(response);
      response = response?.data?.data;
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
