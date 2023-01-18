import axios from "axios";
import {
  call,
  delay,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
  select,
} from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsServices";
import { USER_SIGNIN_API, USLOGIN } from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import {
  CYBERSOFT_TOKEN,
  TOKEN,
  USER_LOGIN,
} from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";
import { userService } from "../../../services/UserService";

//Quản lý các action saga

function* signinSaga(action) {
  // console.log(action);
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  //Gọi api
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.signinCyberBugs(action.userLogin)
    );
    //Lưu vào local storage
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem("CYBERSOFT_TOKEN", CYBERSOFT_TOKEN);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({
      type: USLOGIN,
      userLogin: data.content,
    });

    // let history = yield select (state=> state.HistoryReducer.history)

    history.push("/home");
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

//----------------------------
function* getUserSaga(action) {
  //action.keyWord
  try {
    const { data, status } = yield call(() =>
      userService.getUser(action.keyWord)
    );
    // console.log("data",data)
    yield put({
      type: "GET_USER_SEARCH",
      lstUserSearch: data.content,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiGetUser() {
  yield takeLatest("GET_USER_API", getUserSaga);
}
