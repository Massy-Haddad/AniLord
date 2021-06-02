import { darkTheme, lightTheme } from "../../../Theme";
import { SWITCH_THEME } from "../actions/themeActions";

const initialState = {
  theme: darkTheme,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_THEME:
      return { theme: action.theme };
    default:
      return state;
  }
};

export default themeReducer;
