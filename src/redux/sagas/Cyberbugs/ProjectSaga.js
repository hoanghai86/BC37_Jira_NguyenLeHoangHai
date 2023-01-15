import { call, delay, put, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsServices";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { history } from "../../../util/history";

function* createProjectSaga(action) {
  console.log("create project action", action);

  //hiển thị loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  //gọi api lấy dữ liệu về
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.createProjectAuthorization(action.newProject)
    );

    //Gọi api thành công thì dispath lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS)
      console.log(data);

      //chuyển hướng trang
      history.push('/projectmanagement');



  } catch (error) {
    console.log(error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateProjectSaga() {
  yield takeLatest("CREATE_PROJECT_SAGA", createProjectSaga);
}

//Saga dùng để get all project từ API
//Hải - code ngày 15/01/2023
function* getListProjectSaga(action) {
  try {
    const { data, status } = yield call(() => {
      return cyberbugsService.getListProject();
    });

    //sau khi lấy dữ liệu từ api về thành công
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_LIST_PROJECT",
        projectList: data.content,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* theoDoiGetListProjectSaga() {
  yield takeLatest("GET_LIST_PROJECT_SAGA", getListProjectSaga);
}
