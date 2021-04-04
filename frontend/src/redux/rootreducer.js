import user_reducer from "./User/user.reducer";
import {combineReducers} from 'redux';
export const rootReducer = combineReducers({
    user_reducer,
  });