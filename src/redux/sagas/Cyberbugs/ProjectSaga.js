import { call, delay, put, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsServices";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { history } from "../../../util/history";
import { projectService } from "../../../services/ProjectService";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
import { GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA } from "../../constants/Cyberbugs/ProjectCyberBugsConstants";
import { GET_USER_BY_PROJECT_ID_SAGA } from "../../constants/Cyberbugs/UserConstants";

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
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
      notifiFunction("success","Create project successfuly !");
      //chuyển hướng trang
      history.push("/projectmanagement");
    }
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

//update project
function* updateProjectSaga(action) {
  //hiển thị loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  //gọi api lấy dữ liệu về
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.updateProject(action.projectUpdate)
    );

    //Gọi api thành công thì dispath lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      // console.log(data);

      yield put({
        type: "GET_LIST_PROJECT_SAGA",
      });
      yield put({
        type: "CLOSE_DRAWER",
      });
    }
  } catch (error) {
    console.log(error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiUpdateProjectSaga() {
  yield takeLatest("UPDATE_PROJECT_SAGA", updateProjectSaga);
}







//DELETE PROJECT
function* deleteProjectSaga(action) {
  //hiển thị loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  //gọi api lấy dữ liệu về
  try {
    const { data, status } = yield call(() =>
      projectService.deleteProject(action.idProject)
    );

    //Gọi api thành công thì dispath lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);

      notifiFunction("success","Delete project successfuly !");

      yield put({
        type: "GET_LIST_PROJECT_SAGA",
      });
      yield put({
        type: "CLOSE_DRAWER",
      });
    }else{
      notifiFunction("success","Delete project fail !");
    }

  } catch (error) {
    notifiFunction("success","Delete project fail !");
    console.log(error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiDeleteProject() {
  yield takeLatest("DELETE_PROJECT_SAGA", deleteProjectSaga);
}





//GET PROJECT DETAIL
function* getProjectDetailSaga(action) {
  //hiển thị loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  //gọi api lấy dữ liệu về
  try {
    const { data, status } = yield call(() => projectService.getProjectDetail(action.projectId));

    console.log("data",data);
    //Lấy dữ liệu thành công thì đưa dữ liệu lên redux
    yield put({
      type:"PUT_PROJECT_DETAIL",
      projectDetail:data.content,
    })


  } catch (error) {
    console.log("404 not found !");
    history.push('/projectmanagement');
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiGetProjectDetail() {
  yield takeLatest("GET_PROJECT_DETAIL", getProjectDetailSaga);
}


//GET ALL PROJECT SAGA
function* getProjectAllSaga(action) {
  //hiển thị loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  //gọi api lấy dữ liệu về
  try {
    const { data, status } = yield call(() => projectService.getAllProject());

    // console.log("data",data);
    //Lấy dữ liệu thành công thì đưa dữ liệu lên redux
    yield put({
      type: GET_ALL_PROJECT,
      arrProject:data.content,
    })

    yield put({
      type: GET_USER_BY_PROJECT_ID_SAGA,
      idProject: data.content[0].id,
    })


  } catch (error) {
    console.log("404 not found !");
    history.push('/projectmanagement');
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiGetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getProjectAllSaga);
}
