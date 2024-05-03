const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL + "/api/v1";
const API = {
  login: BASE_URL + "/login",
  me: BASE_URL + "/me",
  logout: BASE_URL + "/logout",

  upload: BASE_URL + "/uploadPdf",
  all: BASE_URL + "/pdfs",
  pdf: BASE_URL + "/pdf",

  send: BASE_URL + "/sendemail",
};

export default API;
