import {
  SIGNUP_REQUEST,
  LOGIN_REQUEST,
  LOGOUT,
  SEND_EMAIL,
  RESET_PASSWORD_REQUEST
} from "./authTypes";

// signup action creator
export const signup = data => ({
  type: SIGNUP_REQUEST,
  data
});

// login action creator
export const login = data => ({
  type: LOGIN_REQUEST,
  data
});

export const logout = () => ({
  type: LOGOUT
});

export const sendEmail = data => ({
  type: SEND_EMAIL,
  data
})

export const resetPassword = data => ({
  type: RESET_PASSWORD_REQUEST,
  data
})