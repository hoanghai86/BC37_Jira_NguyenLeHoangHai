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
      },
    });
  },

  //tạo project
  createProjectAuthorization: (newProject) => {
    return axios({
      url: `${DOMAIN_CYBERBUG}/Project/createProjectAuthorize`,
      method: "POST",
      data: newProject,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: localStorage.getItem("CYBERSOFT_TOKEN"),
      },
    });
  },

  //get all project lên table
  getListProject:()=>{
    return axios({
      url:`${DOMAIN_CYBERBUG}/Project/getAllProject`,
      method: "GET",
      headers: {
        //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
        // Authorization: "Bearer " + localStorage.getItem(TOKEN),

        //token trung tâm cấp cho học viên Cybersoft
        TokenCybersoft: localStorage.getItem("CYBERSOFT_TOKEN"),
      },
    })
  },

  //update project lên API
  updateProject:(projectUpdate)=>{
    return axios({
      url:`${DOMAIN_CYBERBUG}/Project/updateProject?projectId=${projectUpdate.id}`,
      method: "PUT",
      data: projectUpdate,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: localStorage.getItem("CYBERSOFT_TOKEN"),
      },
    })
  }

};
