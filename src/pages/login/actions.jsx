export const CHANGE_THEME = "CHANGE_THEME";
export const changeTheme = (theme) => ({
  type: CHANGE_THEME,
  payload: theme,
});

export const CHANGE_EMAIL = "CHANGE_EMAIL";
export const changeEmail = (email) => ({
  type: CHANGE_EMAIL,
  payload: email,
});
