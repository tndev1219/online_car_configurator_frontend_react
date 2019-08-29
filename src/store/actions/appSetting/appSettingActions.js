import {
  SHOW_ALERT,
  HIDE_ALERT,
  WAITING
} from "./appSettingTypes";

//show alert box
export const showAlert = (message, alertType) => ({
  type: SHOW_ALERT,
  payload: { message, alertType }
})

//hide alert box
export const hideAlert = () => ({
  type: HIDE_ALERT,
})

export const wait = data => ({
  type: WAITING,
  payload: data
})