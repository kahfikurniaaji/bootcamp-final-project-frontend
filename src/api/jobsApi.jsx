import api from "./api";

export const jobsUrlEndpoint = "/jobs";

export const getJobs = async () => {
  const response = await api
    .get(jobsUrlEndpoint)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
  return response;
};
