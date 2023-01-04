// import { combineReducers, createStore } from "redux";
// import ToDoListReducer from "./reducers/ToDoListReducer";

// const rootReducer = combineReducers({
//   //reducer khai báo tại đây
//   ToDoListReducer
// });

// const store = createStore(rootReducer);

// export default store;

import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import ToDoListReducer from "./reducers/ToDoListReducer";


const reducer = combineReducers({
  ToDoListReducer: ToDoListReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
