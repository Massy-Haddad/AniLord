import "react-native-gesture-handler";
import React from "react";
import RootNavigator from "./app/navigation/RootNavigator";

// Redux Store
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import themeReducer from "./app/redux/themeReducer";

const store = createStore(
  combineReducers({ themeReducer }),
  applyMiddleware(thunk)
);

// disabling the yellow warning box (temporarily)
console.disableYellowBox = true;

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
