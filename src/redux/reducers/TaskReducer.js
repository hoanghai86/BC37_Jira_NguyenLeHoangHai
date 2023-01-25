import {
  CHANGE_TASK_MODAL,
  GET_TASK_DETAIL,
} from "../constants/Cyberbugs/TaskConstants";

const initialState = {
  taskDetailModal: {
    priorityTask: {
      priorityId: 2,
      priority: "Medium",
    },
    taskTypeDetail: {
      id: 2,
      taskType: "new task",
    },
    assigness: [
      {
        id: 3887,
        avatar: "https://ui-avatars.com/api/?name=Hải",
        name: "Hải",
        alias: "hai",
      },
    ],
    lstComment: [],
    taskId: 8243,
    taskName: "Task hainlh 1",
    alias: "task-hainlh-1",
    description: "<p>abc</p>",
    statusId: "2",
    originalEstimate: 10,
    timeTrackingSpent: 10,
    timeTrackingRemaining: 10,
    typeId: 2,
    priorityId: 2,
    projectId: 10670,
  },
};

export const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_DETAIL: {
      console.log(action.taskDetailModal);
      return { ...state, taskDetailModal: action.taskDetailModal };
    }

    case CHANGE_TASK_MODAL: {
      const { name, value } = action;
      console.log(state.taskDetailModal); //state trước khi thay đổi
      return {
        ...state,
        taskDetailModal: { ...state.taskDetailModal, [name]: value }, //state mới sau khi thay đổi
      };
    }

    
    default:
      return state;
    }
  };
  
