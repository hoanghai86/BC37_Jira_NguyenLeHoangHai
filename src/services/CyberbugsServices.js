import axios from "axios";
import { CYBERSOFT_TOKEN, DOMAIN_CYBERBUG, TOKEN } from "../util/constants/settingSystem";
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
    const TokenCybersoft = localStorage.getItem(TOKEN);
    return axios({
      url: `${DOMAIN_CYBERBUG}/ProjectCategory`,
      method: "GET",
      headers: {
        // TokenCybersoft: TokenCybersoft,
        TokenCybersoft: CYBERSOFT_TOKEN,
      }
    });
  },
};
