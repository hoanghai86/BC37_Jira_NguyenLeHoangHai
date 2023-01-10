import { USER_SIGNIN_API } from "../constants/Cyberbugs/Cyberbugs";

export const signinCyberbugAction = (email, password) => {
  return {
    type: USER_SIGNIN_API,
    userLogin: {
      email: email,
      password: password,
    },
  };
};
