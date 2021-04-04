import * as React from "react";

// UI
import { Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

// NAVIGATION
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import {
  Screen,
  screensEnabled,
  // @ts-ignore
  shouldUseActivityState,  // eslint-disable-line
} from 'react-native-screens';

// COMPONENTS
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";

// THEME
import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../redux/themeActions";
import { lightTheme, darkTheme } from "../../Theme";

const options = {
  headerBackTitleVisible: false,
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

const name = "BottomTabs";

const BottomTab = createBottomTabNavigator();

const Stack1 = createSharedElementStackNavigator({
  name,
  debug: true,
});

const Stack2 = createSharedElementStackNavigator({
  name,
  debug: true,
});

const Stack3 = createSharedElementStackNavigator({
  name,
  debug: true,
});

const Home = () => (
  <Stack1.Navigator headerMode="none">
    <Stack1.Screen name={name} component={HomeScreen} />
    <Stack1.Screen
      name="DetailScreen"
      component={DetailScreen}
      options={() => options}
    />
  </Stack1.Navigator>
);

const Search = () => (
  <Stack2.Navigator headerMode="none">
    <Stack2.Screen name={name} component={SearchScreen} />
  </Stack2.Navigator>
);

const Profile = () => (
  <Stack2.Navigator headerMode="none">
    <Stack2.Screen name={name} component={ProfileScreen} />
  </Stack2.Navigator>
);

export default function RootNavigator() {
  // THEME
  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <BottomTab.Navigator
          tabBarOptions={{
            showLabel: false,
            style: {
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              elevation: 0,
              backgroundColor: theme.PRIMARY_BUTTON_COLOR,
              borderTopColor: "transparent",
              height: 90,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            },
          }}
        >
          <BottomTab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <FontAwesome5 name="home" size={24} color={theme.PRIMARY_BUTTON_TEXT_COLOR} />
                </View>
              ),
            }}
          />

          <BottomTab.Screen
            name="Search"
            component={Search}
            options={{
              title: "SEARCH",
              tabBarIcon: () => (
                <FontAwesome5 name="search" size={20} color={theme.PRIMARY_BUTTON_TEXT_COLOR} />
              ),
            }}
          />

          <BottomTab.Screen
            name="Profile"
            component={Profile}
            options={{
              title: "PROFILE",
              tabBarIcon: () => (
                <FontAwesome5 name="user-alt" size={24} color={theme.PRIMARY_BUTTON_TEXT_COLOR} />
              ),
            }}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
