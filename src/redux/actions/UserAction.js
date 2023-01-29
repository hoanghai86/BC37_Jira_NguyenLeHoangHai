import { userService } from "../../services/UserService";
import { notifiFunction } from "../../util/Notification/notificationCyberbugs";
import actionsType from "./types/ActioneType";

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
    // dispatch(getUserAction);
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
