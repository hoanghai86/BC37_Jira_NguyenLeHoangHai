import { userService } from "../../services/UserService";
import { notifiFunction } from "../../util/Notification/notificationCyberbugs";
import actionsType from "./types/ActioneType";
import { history } from "../../util/history";

export const getUserAction = async (dispatch) => {
  try {
    const res = await userService.getUserList();
    dispatch({
      type: actionsType.SET_USER_LIST,
      payload: res.data.content,
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

export const deleteUserAction = (id) => {
  return async (dispatch) => {
    try {
      const res = await userService.deleteUser(id);
      if (res.data.statusCode === 200) {
        notifiFunction("success", "Delete user successfuly !");
      }
    } catch (error) {
      console.log("error: ", error);
      notifiFunction("error", "Delete user fail !");
    }
    dispatch(getUserAction);
  };
};

export const updateUserAction = (data) => {
  return async (dispatch) => {
    try {
      const res = await userService.putUpdateUser(data);
      console.log("res: ", res);
      if (res.data.statusCode === 200) {
        notifiFunction("success", "Update user successfuly !");
      }
    } catch (error) {
      console.log("error: ", error);
      notifiFunction("error", "Update user fail !");
    }

    dispatch(getUserAction);
  };
};

export const postUserRegisterAction = async (user) => {
  try {
    const res = await userService.postSignup(user);
    console.log("res: ", res);
    if (window.confirm("Đăng kí thành công, mở trang đăng nhập?")) {
      history.push("/");
    }
  } catch (error) {
    console.log("error: ", error?.response.data.message);
    alert(`${error?.response.data.message}`);
  }
};
