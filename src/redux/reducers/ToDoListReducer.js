import { GET_TASK_API } from "../constants/ToDoListConst";

const initialState = {
  taskList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case GET_TASK_API:
      state.taskList = action.taskList;
      return { ...state };

    default:
      return state;
  }
};

export default reducer;
