import axios from "axios";
import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/settingSystem";
// const { default: Axios } = require("axios");

export const cyberbugsService = {
  signinCyberBugs: (userLogin) => {
    return axios({
      url: `${DOMAIN_CYBERBUG}/Users/signin`,
      method: "POST",
      data: userLogin,
    });
  },

  //lấy danh sách project
  getAllProjectCategory: () => {
    return axios({
      url: `${DOMAIN_CYBERBUG}/ProjectCategory`,
      method: "GET",
      headers: {
        TokenCybersoft: localStorage.getItem("CYBERSOFT_TOKEN"),
      }
    });
  },
};
