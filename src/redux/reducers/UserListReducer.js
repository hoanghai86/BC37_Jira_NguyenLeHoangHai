import produce from "immer";
import actionsType from "../actions/types/ActioneType";

const initialState = {
  userList: [],
};

const userListReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case actionsType.SET_USER_LIST:
        draft.userList = payload;
        break;

      default:
        break;
    }
  });
};

export default userListReducer;
