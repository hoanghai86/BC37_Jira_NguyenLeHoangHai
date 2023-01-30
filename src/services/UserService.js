import { baseService } from "./baseService";

export class UserService extends baseService {
  constructor() {
    super();
  }
  getUser = (keyword) => {
    return this.get(`Users/getUser?keyword=${keyword}`);
  };

  assignUserProject = (userProject) => {
    return this.post(`Project/assignUserProject`, userProject);
  };

  deleteUserFromProject = (userProject) => {
    return this.post(`Project/removeUserFromProject`, userProject);
  };

  getUserByProjectId = (idProject) => {
    return this.get(`Users/getUserByProjectId?idProject=${idProject}`);
  };

  getUserList = () => {
    return this.get(`Users/getUser`);
  };

  deleteUser = (id) => {
    return this.delete(`Users/deleteUser?id=${id}`);
  };

  putUpdateUser = (data) => {
    return this.put(`Users/editUser`, data);
  };

  postSignup = (data) => {
    return this.post(`Users/signup`, data);
  };
}

export const userService = new UserService();
