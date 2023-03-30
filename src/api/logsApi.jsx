import api from "./api";

export const logsUrlEndpoint = "/logs";

export const getAllLogs = async () => {
  const response = await api
    .get(logsUrlEndpoint)
    .then((response) => {
      response = response.data.data;
      return response;
    })
    .catch((error) => console.log(error));
  return response;
};
