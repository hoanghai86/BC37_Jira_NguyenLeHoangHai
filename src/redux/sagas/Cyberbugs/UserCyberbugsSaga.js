import axios from "axios";
import {
  call,
  delay,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsServices";
import { USER_SIGNIN_API } from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { TOKEN, USER_LOGIN } from "../../../util/constants/settingSystem";

//Quản lý các action saga

function* signinSaga(action) {
  console.log(action);
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  //Gọi api
  try {
    const { data, status } = yield cyberbugsService.signinCyberBugs(
      action.userLogin
    );
    //Lưu vào local storage
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
    

    console.log(data);
  } catch (err) {
    console.log(err.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiSignin() {
  yield takeLatest(USER_SIGNIN_API, signinSaga);
}
