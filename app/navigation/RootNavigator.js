import * as React from "react";

// UI
import { Text, View, StatusBar, Platform } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

// NAVIGATION
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import {
  Screen,
  screensEnabled,
  // @ts-ignore
  shouldUseActivityState, // eslint-disable-line
} from "react-native-screens";

// COMPONENTS
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";

// THEME
import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../redux/actions/themeActions";
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
});

const Stack2 = createSharedElementStackNavigator({
  name,
});

const Stack3 = createSharedElementStackNavigator({
  name,
});

function Home({ navigation, route }) {
  if (getFocusedRouteNameFromRoute(route) === "HomeDetailScreen") {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }
  return (
    <Stack1.Navigator headerMode="none">
      <Stack1.Screen name={name} component={HomeScreen} />
      <Stack1.Screen
        name="HomeDetailScreen"
        component={DetailScreen}
        options={() => options}
      />
    </Stack1.Navigator>
  );
}

function Search({ navigation, route }) {
  if (getFocusedRouteNameFromRoute(route) === "SearchDetailScreen") {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }
  return (
    <Stack2.Navigator headerMode="none">
      <Stack2.Screen name={name} component={SearchScreen} />
      <Stack2.Screen
        name="SearchDetailScreen"
        component={DetailScreen}
        options={() => options}
      />
    </Stack2.Navigator>
  );
}

const Profile = () => (
  <Stack3.Navigator headerMode="none">
    <Stack3.Screen name={name} component={ProfileScreen} />
  </Stack3.Navigator>
);

export default function RootNavigator() {
  // THEME
  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={theme}>
      {/* STATUS BAR */}
      <StatusBar
        translucent
        barStyle={theme.STATUS_BAR_STYLE}
        backgroundColor={theme.PRIMARY_BACKGROUND_COLOR}
      />

      <NavigationContainer focused="Search">
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
              height: Platform.OS === "ios" ? 110 : 90,
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
                  <FontAwesome5
                    name="home"
                    size={focused ? 30 : 24}
                    color={
                      focused
                        ? theme.PRIMARY_TEXT_COLOR
                        : theme.SECONDARY_TEXT_COLOR
                    }
                  />
                </View>
              ),
            }}
          />

          <BottomTab.Screen
            name="Search"
            component={Search}
            options={{
              title: "SEARCH",
              tabBarIcon: ({ focused }) => (
                <FontAwesome5
                  name="search"
                  size={focused ? 26 : 20}
                  color={
                    focused
                      ? theme.PRIMARY_TEXT_COLOR
                      : theme.SECONDARY_TEXT_COLOR
                  }
                />
              ),
            }}
          />

          <BottomTab.Screen
            name="Profile"
            component={Profile}
            options={{
              title: "PROFILE",
              tabBarIcon: ({ focused }) => (
                <FontAwesome5
                  name="user-alt"
                  size={focused ? 30 : 24}
                  color={
                    focused
                      ? theme.PRIMARY_TEXT_COLOR
                      : theme.SECONDARY_TEXT_COLOR
                  }
                />
              ),
            }}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
