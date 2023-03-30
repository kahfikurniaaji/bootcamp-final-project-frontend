import api from "./api";

export const authsUrlEndpoint = "/auth";

export const login = async ({ username, password }) => {
  const response = await api
    .post(authsUrlEndpoint + "/login", {
      username,
      password,
    })
    .then((response) => {
      console.log(response);
      localStorage.setItem("accessToken", response.data.access_token);
      api.defaults.headers.common["Authorization"] =
        localStorage.getItem("accessToken");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};

export const logout = async () => {
  const code = await api
    .delete(authsUrlEndpoint + "/logout")
    .then((response) => {
      localStorage.removeItem("accessToken");
      delete api.defaults.headers.common["Authorization"];
      return response.data;
    })
    .catch((error) => console.log(error));
  return code;
};
