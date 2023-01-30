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
  STATUS_CODE,
  TOKEN,
  USER_LOGIN,
} from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";
import { userService } from "../../../services/UserService";
import { GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA } from "../../constants/Cyberbugs/UserConstants";

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

    // history.push("/home");
    history.push("/projectmanagement");
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
    console.log("data", data);
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

//----------------------------
function* addUserProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.assignUserProject(action.userProject)
    );
    // console.log("data",data)
    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });
  } catch (err) {
    console.log(err.response.data);
    alert("Fail! Only project creators can add members!");
  }
}

export function* theoDoiAddUserProject() {
  yield takeLatest("ADD_USER_PROJECT_API", addUserProjectSaga);
}

//----------------------------
function* removeUserProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.deleteUserFromProject(action.userProject)
    );
    // console.log("data",data)
    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiRemoveUserProject() {
  yield takeLatest("REMOVE_USER_PROJECT_API", removeUserProjectSaga);
}

//----------------------------
function* getUserByProjectSaga(action) {
  const { idProject } = action;
  try {
    const { data, status } = yield call(() =>
      userService.getUserByProjectId(idProject)
    );
    console.log("checkdata",data);
    if(status === STATUS_CODE.SUCCESS){
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: data.content,
      })
    }
  } catch (error) {
    // console.log(error);
    if(error.response?.data.statusCode === STATUS_CODE.NOT_FOUND){
      yield put ({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: [],
      })
    }
  }
}

export function* theoDoiGetUserByProjectIdSaga() {
  yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectSaga);
}
