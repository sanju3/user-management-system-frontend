import * as actions from "../constants/userConstants";

interface Payload {
  username: string;
  firstname: string;
  lastname: string;
}

interface Action {
  type: string;
  payload: Payload;
}

export const userLoginReducer = (
  state = { data: undefined },
  action: Action
) => {
  switch (action.type) {
    case actions.USER_LOGIN_REQUEST:
      return { loading: true };
    case actions.USER_LOGIN_SUCCESS:
      return { loading: false, data: action.payload };
    case actions.USER_LOGIN_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userSignupReducer = (
  state = { data: undefined },
  action: Action
) => {
  switch (action.type) {
    case actions.USER_REGISTER_REQUEST:
      return { loading: true };
    case actions.USER_REGISTER_SUCCESS:
      return { loading: false, data: action.payload };
    case actions.USER_REGISTER_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userConfirmReducer = (
  state = { data: undefined },
  action: Action
) => {
  switch (action.type) {
    case actions.USER_CONFIRM_REQUEST:
      return { loading: true };
    case actions.USER_CONFIRM_SUCCESS:
      return { loading: false, data: action.payload };
    case actions.USER_CONFIRM_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserReducer = (state = { data: undefined }, action: Action) => {
  switch (action.type) {
    case actions.GET_USER_REQUEST:
      return state;
    case actions.GET_USER_SUCCESS:
      return { dataUser: action.payload };
    case actions.GET_USER_ERROR:
      return { errorUser: action.payload };
    default:
      return state;
  }
};

export const updatePasswordReducer = (
  state = { data: undefined },
  action: Action
) => {
  switch (action.type) {
    case actions.UPDATE_PASSWORD_REQUEST:
      return { loadingPassword: true };
    case actions.UPDATE_PASSWORD_SUCCESS:
      return { dataPassword: action.payload };
    case actions.UPDATE_PASSWORD_ERROR:
      return { errorPassword: action.payload };
    default:
      return state;
  }
};

export const getRandomStringReducer = (
  state = { data: undefined },
  action: Action
) => {
  switch (action.type) {
    case actions.GET_RANDOM_STRING_REQUEST:
      return { loadingRandom: true };
    case actions.GET_RANDOM_STRING_SUCCESS:
      return { dataRandom: action.payload };
    case actions.GET_RANDOM_STRING_ERROR:
      return { errorRandom: action.payload };
    default:
      return state;
  }
};
