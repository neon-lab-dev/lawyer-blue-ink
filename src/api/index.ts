const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL + "/api/v1";
const API = {
  login: BASE_URL + "/login",
  me: BASE_URL + "/me",
  logout: BASE_URL + "/logout",
};

export default API;
