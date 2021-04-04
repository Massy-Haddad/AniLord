import "react-native-gesture-handler";
import React from "react";
import RootNavigator from "./app/navigation/RootNavigator";

// FONT
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Overpass_900Black,
  Overpass_500Black,
} from "@expo-google-fonts/overpass";

// Redux Store
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import themeReducer from "./app/redux/themeReducer";

const store = createStore(
  combineReducers({ themeReducer }),
  applyMiddleware(thunk)
);

// GraphQL
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { NETWORK_INTERFACE } from "./app/config";

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: NETWORK_INTERFACE }),
  cache: new InMemoryCache(),
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// disabling the yellow warning box (temporarily)
console.disableYellowBox = true;

export default function App() {
  // Font
  const [fontsLoaded] = useFonts({
    Overpass_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <RootNavigator />
        </ApolloProvider>
      </Provider>
    );
  }
}
