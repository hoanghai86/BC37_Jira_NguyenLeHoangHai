import { all } from "redux-saga/effects";
import * as ToDoListSaga from "./ToDoListSaga";
// import { theoDoiActionGetTaskApi } from "./ToDoListSaga";
import * as Cyberbugs from "./Cyberbugs/UserCyberbugsSaga";
import * as ProjectCategorySaga from "./Cyberbugs/ProjectCategorySaga"
import * as ProjectSaga from "./Cyberbugs/ProjectSaga"
import * as TaskTypeSaga from "./Cyberbugs/TaskTypeSaga"
import * as PrioritySaga from "./Cyberbugs/PrioritySaga"
import * as TaskSaga from "./Cyberbugs/TaskSaga"
import * as StatusSaga from "./Cyberbugs/StatusSaga"
import * as CommentTaskSaga from "./Cyberbugs/CommentTaskSaga"

export function* rootSaga() {
  yield all([
    //Nghiệp vụ theo dõi các action saga todolist
    ToDoListSaga.theoDoiActionGetTaskApi(),
    ToDoListSaga.theoDoiActionAddTaskApi(),
    ToDoListSaga.theoDoiActionDeleteTask(),
    ToDoListSaga.theoDoiDoneTask(),
    ToDoListSaga.theoDoiRejectTask(),
 
    //Nghiệp vụ Cyberbug...
    Cyberbugs.theoDoiSignin(),
    Cyberbugs.theoDoiGetUser(),
    Cyberbugs.theoDoiRemoveUserProject(),
    Cyberbugs.theoDoiAddUserProject(),
    Cyberbugs.theoDoiGetUserByProjectIdSaga(),
    
    ProjectCategorySaga.theoDoiGetAllProjectCategory(),

    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoiGetListProjectSaga(),
    ProjectSaga.theoDoiUpdateProjectSaga(),
    ProjectSaga.theoDoiDeleteProject(),
    ProjectSaga.theoDoiGetProjectDetail(),
    ProjectSaga.theoDoiGetAllProjectSaga(),

    StatusSaga.theoDoiGetAllStatusSaga(),

    TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),

    PrioritySaga.theoDoiGetAllPrioritySaga(),

    TaskSaga.theoDoiCreateTaskSaga(),
    TaskSaga.theoDoiDeleteTaskSaga(),
    TaskSaga.theoDoiGetTaskDetailSaga(),
    TaskSaga.theoDoiUpdateTaskStatusSaga(),
    TaskSaga.theoDoiHandleChangePostApi(),

    CommentTaskSaga.theoDoiInsertCommentTaskSaga(),
    CommentTaskSaga.theoDoiDeleteCommentTaskSaga(),
    CommentTaskSaga.theoDoiUpdateCommentTask(),

  ]);
}
