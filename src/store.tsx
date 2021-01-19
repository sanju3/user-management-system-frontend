import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
  getRandomStringReducer,
  getUserReducer,
  updatePasswordReducer,
  userConfirmReducer,
  userLoginReducer,
  userSignupReducer,
} from "./reducers/userReducers";

const initialState = {};
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userConfirm: userConfirmReducer,
  getUser: getUserReducer,
  updateUserPassword: updatePasswordReducer,
  randomString: getRandomStringReducer,
});
const composeEnhancer =
  (window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
