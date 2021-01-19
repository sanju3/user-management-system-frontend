import axios from "axios";
import * as actions from "../constants/userConstants";

interface Credentials {
  username: string;
  password: string;
}

interface User {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  passwordre: string;
}

export const login = (credentials: Credentials) => async (dispatch: any) => {
  try {
    dispatch({ type: actions.USER_LOGIN_REQUEST, payload: credentials });
    const user = await axios.post(
      "http://localhost:5000/user/login",
      credentials
    );
    dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: user.data });
  } catch (error) {
    dispatch({ type: actions.USER_LOGIN_ERROR, payload: error.message });
  }
};

export const signup = (userDetails: User) => async (dispatch: any) => {
  try {
    dispatch({ type: actions.USER_REGISTER_REQUEST, payload: userDetails });
    const user = await axios.post(
      "http://localhost:5000/user/register",
      userDetails
    );
    dispatch({ type: actions.USER_REGISTER_SUCCESS, payload: user.data });
  } catch (error) {
    dispatch({ type: actions.USER_REGISTER_ERROR, payload: error.message });
  }
};

export const confirmUser = (username?: string, random?: string) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: actions.USER_CONFIRM_REQUEST });
    const user = await axios.get(
      `http://localhost:5000/user/verify/${username}/${random}`
    );
    dispatch({ type: actions.USER_CONFIRM_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: actions.USER_CONFIRM_ERROR, payload: error });
  }
};

export const getUserSingle = (username: string) => async (dispatch: any) => {
  try {
    dispatch({ type: actions.GET_USER_REQUEST, payload: username });
    const user = await axios.post("http://localhost:5000/user/getsingle", {
      username,
    });
    dispatch({ type: actions.GET_USER_SUCCESS, payload: user.data });
  } catch (error) {
    dispatch({ type: actions.GET_USER_ERROR, payload: error });
  }
};

export const updatePassword = (username: string, password: string) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: actions.UPDATE_PASSWORD_REQUEST });
    const user = await axios.post("http://localhost:5000/user/setpassword", {
      username,
      password,
    });
    dispatch({ type: actions.UPDATE_PASSWORD_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: actions.UPDATE_PASSWORD_ERROR, payload: error });
  }
};

export const getRandomString = (username: string) => async (dispatch: any) => {
  try {
    dispatch({ type: actions.GET_RANDOM_STRING_REQUEST });
    const random = await axios.post("http://localhost:5000/user/getrandom", {
      username,
    });
    dispatch({ type: actions.GET_RANDOM_STRING_SUCCESS, payload: random });
  } catch (error) {
    dispatch({ type: actions.GET_RANDOM_STRING_ERROR, payload: error });
  }
};
